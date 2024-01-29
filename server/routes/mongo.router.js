import express from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/database.service.js";
export const mongoRouter = express.Router();
mongoRouter.use(express.json());

// Get all.
mongoRouter.get("/", async (req, res) => {
  try {
    const invoices = await collections.invoices.find().limit(50).toArray();
    res.status(200).send(invoices);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Create new item.
mongoRouter.post("/create", async (req, res) => {
  try {
    // Extract task data from the request body
    const { Name, Description, DueDate, Priority, Notes } = req.body;

    // Create a new task object based on the schema
    const params = {
      Name,
      Description,
      DueDate: new Date(DueDate), // Convert DueDate to a Date object
      Completed: false,
      Priority,
      Notes
    };

    // Insert the new task into the database
    const newinvoice = params;
    const result = await collections.invoices.insertOne(newinvoice);

    // Send a response based on the result of the database operation
    result
      ? res.status(201).send(`Successfully created a new task with id ${result.insertedId}`)
      : res.status(500).send("Failed to create a new task.");
  } catch (error) {
    console.error(error);
    res.status(400).send(error.message);
  }
});

// Delete item.
mongoRouter.delete("/:id", async (req, res) => {
  const id = req?.params?.id;
  // const username = req.body.username
  try {
    const query = { _id: new ObjectId(id) };
    const result = await collections.invoices.deleteOne(query);
    console.log(result);
    if (result && result.deletedCount) {
      res.status(202).send(`Successfully removed invoice with id ${id}`);
    } else if (!result) {
      res.status(400).send(`Failed to remove invoice with id ${id}`);
    } else if (!result.deletedCount) {
      res.status(404).send(`invoice with id ${id} does not exist`);
    }
  } catch (error) {
    console.error(error.message);
    res.status(400).send(error.message);
  }
});

// Query item. Format: {$type: `string`}
mongoRouter.get("/query", async (req, res) => {
  const queryBy = req.body.queryBy;
  const queryFor = req.body.queryFor;
  try {
    const invoices = await collections.invoices.find({ [queryBy]: queryFor }).toArray();
    res.status(200).send(invoices);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Update item
mongoRouter.put("/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updateFields = req.body;
    const query = { _id: new ObjectId(id) };

    if (updateFields.Completed === true) {
      updateFields.CompletedDate = new Date();
    }

    const result = await collections.invoices.updateOne(query, {
      $set: updateFields,
    });

    if (result.matchedCount === 0) {
      res.status(404).send(`Invoice with id ${id} does not exist`);
    } else if (result.modifiedCount > 0) {
      res.status(200).send(`Successfully updated invoice with id ${id}`);
    } else {
      res.status(404).send(`Invoice with id ${id} not updated`);
    }
  } catch (error) {
    console.error(error.message);
    res.status(400).send(error.message);
  }
});