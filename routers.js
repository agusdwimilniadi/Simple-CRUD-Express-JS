const express = require("express");
const { ObjectId } = require("mongodb");
const router = express.Router();
const connection = require("./connection");

router.get("/users", async (req, res) => {
  try {
    if (connection.connect()) {
      const db = connection.db("db_latihan");
      const users = await db.collection("users").find().toArray();
      res.send({ data: users });
    } else {
      res.send("Connection failed");
    }
  } catch (err) {
    res.send({ message: "Internal Server error" });
  }
});
router.post("/users", async (req, res) => {
  try {
    if (connection.connect()) {
      const { name, age, status } = req.body;
      const db = connection.db("db_latihan");
      const users = await db.collection("users").insertOne({
        name: name,
        age: age,
        status: status,
      });
      console.log("Users = >");
      console.log(users);
    } else {
      res.send("Connection failed");
    }
  } catch (err) {
    console.log(err);
    res.send({ message: "Internal Server error" });
  }
});

router.put("/users/:id", async (req, res) => {
  try {
    if (connection.connect()) {
      const { id } = req.params;
      const { name, age, status } = req.body;
      const db = connection.db("db_latihan");
      const users = await db.collection("users").updateOne(
        { _id: ObjectId(id) },
        {
          $set: {
            name: name,
            age: age,
            status: status,
          },
        }
      );
      console.log("Users = >");
      console.log(users);
      if (users.modifiedCount === 1) {
        res.send({ message: "Successfully Updated" });
      } else {
        res.send({ message: "Failed Updated" });
      }
    } else {
      res.send("Connection failed");
    }
  } catch (err) {
    console.log(err);
    res.send({ message: "Internal Server error" });
  }
});

router.delete("/users/:id", async (req, res) => {
  try {
    if (connection.connect()) {
      const { id } = req.params;
      const { name, age, status } = req.body;
      const db = connection.db("db_latihan");
      const users = await db
        .collection("users")
        .deleteOne({ _id: ObjectId(id) });
      console.log("Users = >");
      console.log(users);
      if (users.deletedCount === 1) {
        res.send({ message: "Successfully deleted" });
      } else {
        res.send({ message: "Failed Deleted" });
      }
    } else {
      res.send("Connection failed");
    }
  } catch (err) {
    console.log(err);
    res.send({ message: "Internal Server error" });
  }
});
module.exports = router;
