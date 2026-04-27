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
    const db = client.db(dbName);
    const jobsCollection = db.collection("jobs");
    const acceptedTasksCollection = db.collection("acceptedTasks");

    console.log("MongoDB connected ✅");

    // --- সব রাউট অবশ্যই এর ভেতরে থাকতে হবে ---

    // 1. Job Add Route
    app.post("/jobs", async (req, res) => {
      const newJob = req.body;
      const result = await jobsCollection.insertOne(newJob);
      res.send(result);
    });

    // 2. All Jobs Route
    app.get("/jobs", async (req, res) => {
      const sort = req.query.sort; // query parameter ধরছি
      const query = {};
      const cursor = jobsCollection.find(query);
      const jobs = await cursor.toArray();
      res.send(jobs);
    });

    // 3. Single Job Details
    app.get("/jobs/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await jobsCollection.findOne(query);
      res.send(result);
    });

    // 4. Delete Job
    app.delete("/jobs/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await jobsCollection.deleteOne(query);
      res.send(result);
    });

    // 5. Accepted Tasks (Post)
    app.post("/accepted-tasks", async (req, res) => {
        const task = req.body;
        const result = await acceptedTasksCollection.insertOne(task);
        res.send(result);
    });

    // 6. Get Accepted Tasks
    app.get("/accepted-tasks", async (req, res) => {
        const email = req.query.email;
        const query = { accepterEmail: email };
        const result = await acceptedTasksCollection.find(query).toArray();
        res.send(result);
    });

    // --- রাউট শেষ ---

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });

  } catch (error) {
    console.error("MongoDB connection failed ❌", error);
  }
}

run();


run();