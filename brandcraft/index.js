const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { MongoClient, ObjectId } = require("mongodb");

dotenv.config();
const app = express();
const port = process.env.PORT || 8080;

app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173", credentials: true }));
app.use(express.json());

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

async function run() {
  try {
    const db = client.db(process.env.DB_NAME || "brandCraft");
    const jobsCollection = db.collection("jobs");
    const acceptedTasksCollection = db.collection("acceptedTasks");

    console.log("MongoDB connected ✅");

    app.get("/jobs", async (req, res) => {
      const result = await jobsCollection.find().sort({ createdAt: -1 }).toArray();
      res.send(result);
    });

    app.post("/jobs", async (req, res) => {
      res.send(await jobsCollection.insertOne(req.body));
    });

    app.get("/my-jobs", async (req, res) => {
      res.send(await jobsCollection.find({ userEmail: req.query.email }).toArray());
    });

    app.get("/jobs/:id", async (req, res) => {
      res.send(await jobsCollection.findOne({ _id: new ObjectId(req.params.id) }));
    });

    app.post("/accepted-tasks", async (req, res) => {
      res.send(await acceptedTasksCollection.insertOne(req.body));
    });

    app.get("/accepted-tasks", async (req, res) => {
      res.send(await acceptedTasksCollection.find({ email: req.query.email }).toArray());
    });

    app.delete("/accepted-tasks/:id", async (req, res) => {
      res.send(await acceptedTasksCollection.deleteOne({ _id: new ObjectId(req.params.id) }));
    });

    app.listen(port, () => console.log(`Server on ${port}`));
  } catch (e) { console.error(e); }
}
run();


// আপনার কোডের একদম নিচে
module.exports = app;
