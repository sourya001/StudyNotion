/**
 * File-based RAG: load embeddings, embed query, return top-k chunks.
 */

const path = require("path");
const fs = require("fs");
const { embedQuery, cosineSimilarity } = require("./embedding.js");

const EMBEDDINGS_PATH = path.join(__dirname, "../data/studynotion-embeddings.json");
const TOP_K = 5;

let cachedChunks = null;

function loadEmbeddings() {
  if (cachedChunks) return cachedChunks;
  if (!fs.existsSync(EMBEDDINGS_PATH)) {
    return [];
  }
  const raw = fs.readFileSync(EMBEDDINGS_PATH, "utf8");
  const data = JSON.parse(raw);
  cachedChunks = data.chunks || [];
  return cachedChunks;
}

/**
 * Get top-k most relevant chunks for a query.
 * @param {string} apiKey - GEMINI_API_KEY
 * @param {string} query - User message
 * @param {number} k - Number of chunks to return (default TOP_K)
 * @returns {Promise<string[]>} Array of chunk texts
 */
async function getRelevantChunks(apiKey, query, k = TOP_K) {
  const chunks = loadEmbeddings();
  if (chunks.length === 0) return [];

  const queryEmbedding = await embedQuery(apiKey, query);
  const scored = chunks.map(({ text, embedding }) => ({
    text,
    score: cosineSimilarity(queryEmbedding, embedding),
  }));
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, k).map((s) => s.text);
}

module.exports = {
  loadEmbeddings,
  getRelevantChunks,
};
