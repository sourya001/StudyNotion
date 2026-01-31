/**
 * One-time script to build studynotion-embeddings.json from knowledge chunks.
 * Run from Server/: node scripts/build-embeddings.js
 * Requires GEMINI_API_KEY in .env
 */

require("dotenv").config();
const path = require("path");
const fs = require("fs");
const knowledgeChunks = require("../data/studynotion-knowledge.js");
const { embedText } = require("../utils/embedding.js");

const API_KEY = process.env.GEMINI_API_KEY;
const OUT_PATH = path.join(__dirname, "../data/studynotion-embeddings.json");

async function main() {
  if (!API_KEY) {
    console.error("Missing GEMINI_API_KEY in .env");
    process.exit(1);
  }

  const chunks = [];
  for (let i = 0; i < knowledgeChunks.length; i++) {
    const text = knowledgeChunks[i];
    process.stdout.write(`Embedding ${i + 1}/${knowledgeChunks.length}... `);
    try {
      const embedding = await embedText(API_KEY, text);
      chunks.push({ text, embedding });
      console.log("ok");
    } catch (err) {
      console.error("failed:", err.message);
    }
  }

  fs.writeFileSync(OUT_PATH, JSON.stringify({ chunks }, null, 0), "utf8");
  console.log(`Wrote ${chunks.length} chunks to ${OUT_PATH}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
