const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const dns = require("node:dns");
const { MongoClient, ObjectId } = require("mongodb");

dotenv.config();

const app = express();
const port = Number(process.env.PORT) || 8080;

// ✅ DNS fix (VERY IMPORTANT for your earlier error)
dns.setServers(['1.1.1.1', '8.8.8.8']);

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

// ✅ FIXED
const uri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME || "brandCraft";

if (!uri) {
  throw new Error("MONGODB_URI is required in .env");
}

const client = new MongoClient(uri);

const parseId = (value) => {
  if (!ObjectId.isValid(value)) return null;
  return new ObjectId(value);
};

const cleanText = (value) => String(value || "").trim();

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });

    console.log("MongoDB connected ✅");

    const db = client.db(dbName);

    const jobsCollection = db.collection("jobs");
    const acceptedTasksCollection = db.collection("acceptedTasks");

    app.get("/", (req, res) => {
      res.send({ ok: true, message: "Freelance Marketplace API is running." });
    });

    // 🔥 TEST ROUTE (IMPORTANT)
    app.get("/test", async (req, res) => {
      const data = await jobsCollection.find().toArray();
      res.send(data);
    });

    // 👉 rest of your routes same থাকবে...

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });

  } catch (error) {
    console.error("MongoDB connection failed ❌", error);
  }
}

run();