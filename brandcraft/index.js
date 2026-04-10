const express = require('express');
const app = express();
const cors = require('cors');
const dns = require('node:dns');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// DNS fix
dns.setServers(['1.1.1.1', '8.8.8.8']);

const uri = process.env.MONGO_URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    console.log("MongoDB Connected ✅");

    const database = client.db("mernAuthDB");
    const usersCollection = database.collection("users");

    // ✅ Save User
    app.post('/users', async (req, res) => {
      const user = req.body;
      if (!user.email || !user.uid) {
        return res.status(400).send({ error: "Email & UID required" });
      }

      const existingUser = await usersCollection.findOne({ email: user.email });
      if (existingUser) {
        return res.status(409).send({ error: "User already exists" });
      }

      const result = await usersCollection.insertOne(user);
      res.send(result);
    });

    // ✅ Get Users
    app.get('/users', async (req, res) => {
      const users = await usersCollection.find().toArray();
      res.send(users);
    });

  } catch (err) {
    console.error("MongoDB connection failed:", err);
  }
}

run();

app.get('/', (req, res) => {
  res.send('Hello World from Express!');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});