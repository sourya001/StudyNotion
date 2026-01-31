/**
 * Gemini embedding API (REST) and cosine similarity for RAG.
 * Uses gemini-embedding-001 via REST so we don't depend on SDK embedding model support.
 */

const https = require("https");

const EMBED_HOST = "generativelanguage.googleapis.com";
const EMBED_PATH = "/v1beta/models/gemini-embedding-001:embedContent";

function doEmbedRequest(apiKey, body) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify(body);
    const req = https.request(
      {
        hostname: EMBED_HOST,
        path: `${EMBED_PATH}?key=${apiKey}`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(postData),
        },
      },
      (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => {
          try {
            const parsed = JSON.parse(data);
            if (res.statusCode !== 200) {
              reject(new Error(parsed.error?.message || data || `Embed API error: ${res.statusCode}`));
              return;
            }
            resolve(parsed.embedding?.values || []);
          } catch (e) {
            reject(new Error(data || e.message));
          }
        });
      }
    );
    req.on("error", reject);
    req.write(postData);
    req.end();
  });
}

/**
 * Get embedding for a single text using Gemini REST API (for documents).
 * @param {string} apiKey - GEMINI_API_KEY
 * @param {string} text - Text to embed
 * @returns {Promise<number[]>} Embedding vector
 */
async function embedText(apiKey, text) {
  return doEmbedRequest(apiKey, {
    content: { parts: [{ text }] },
    taskType: "RETRIEVAL_DOCUMENT",
  });
}

/**
 * Cosine similarity between two vectors.
 * @param {number[]} a
 * @param {number[]} b
 * @returns {number}
 */
function cosineSimilarity(a, b) {
  if (a.length !== b.length) return 0;
  let dot = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  const denom = Math.sqrt(normA) * Math.sqrt(normB);
  return denom === 0 ? 0 : dot / denom;
}

/**
 * Embed a query (use RETRIEVAL_QUERY for best results).
 * @param {string} apiKey
 * @param {string} text - Query text
 * @returns {Promise<number[]>}
 */
async function embedQuery(apiKey, text) {
  return doEmbedRequest(apiKey, {
    content: { parts: [{ text }] },
    taskType: "RETRIEVAL_QUERY",
  });
}

module.exports = {
  embedText,
  embedQuery,
  cosineSimilarity,
};
