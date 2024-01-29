import express from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/database.service.js";



export const mongoRouter = express.Router();
mongoRouter.use(express.json());


// mongoRouter.get("/", async (req, res) => {
//     const userSub = req.query.Username;
//     console.log(userSub);
//     try {
//       const invoices = await collections.invoices
//         .find({ "Username": userSub })
//         .toArray();
//       res.status(200).send(invoices);
//     } catch (error) {
//       res.status(500).send(error.message);
//     }
//   });

mongoRouter.get("/", async (req, res) => {
  try {
    const invoices = await collections.invoices.find().limit(50).toArray();
    res.status(200).send(invoices);
  } catch (error) {
    res.status(500).send(error.message);
  }
});




mongoRouter.get("/userinfo/:accessToken", async (req, res) => {
    const accessToken = req?.params?.accessToken;
    try {
        const object = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${accessToken}`, {
            method: "GET"
        })
          .then(response => response.text())
          .then((response) => {
              console.log(response)
              res.status(200).send(response);
          })
        
    } catch (error) {
        res.status(404).send(`Unable to find user details`);
    }
});

  //  {$type: `string`}
  mongoRouter.get("/query", async (req, res) => {
    const queryBy = req.query.sortby;
    const queryFor = req.query.sortfor;

    try {
      const invoices = await collections.invoices
        // .find({ [queryBy]: queryFor, "Username": username})
        .find({ [queryBy]: queryFor })
        .toArray();
      res.status(200).send(invoices);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
  
  // Create new item
  mongoRouter.post("/create", async (req, res) => {
    console.log(req.body);
    try {
      const params = {
        IssueDate: req.body.Invoice["cbc:IssueDate"]._text,
        DueDate: req.body.Invoice["cbc:DueDate"]._text,
        PayableAmount:
          req.body.Invoice["cac:LegalMonetaryTotal"]["cbc:PayableAmount"]._text,
        BuyerRef: req.body.Invoice["cbc:BuyerReference"]._text,
        SalesOrderId:
          req.body.Invoice["cac:OrderReference"]["cbc:SalesOrderID"]._text,
        XMLfile: req.body.Invoice,
        Decleration: req.body._declaration,
        Username: req.body.Username
      };
      const newinvoice = params;
      const result = await collections.invoices.insertOne(newinvoice);
  
      result
        ? res
            .status(201)
            .send(`Successfully created a new invoice with id ${result.insertedId}`)
        : res.status(500).send("Failed to create a new invoice.");
    } catch (error) {
      console.error(error);
      res.status(400).send(error.message);
    }
  });
  
  // Update item
  mongoRouter.put("/update/:id", async (req, res) => {
    console.log("EDITING")
    try {
      const id = req?.params?.id;
      const params = {
        IssueDate: req.body.Invoice["cbc:IssueDate"]._text,
        DueDate: req.body.Invoice["cbc:DueDate"]._text,
        PayableAmount:
          req.body.Invoice["cac:LegalMonetaryTotal"]["cbc:PayableAmount"]._text,
        BuyerRef: req.body.Invoice["cbc:BuyerReference"]._text,
        SalesOrderId:
          req.body.Invoice["cac:OrderReference"]["cbc:SalesOrderID"]._text,
        XMLfile: req.body.Invoice,
        Decleration: req.body._declaration,
        Username: req.body.Username
      };
      const query = { _id: new ObjectId(id) };
      const result = await collections.invoices.updateOne(query, {
        $set: params,
      });
      if (result.modifiedCount == 1) {
        res.status(200).send(`Successfully updated invoice with id ${id}`);
      } else if (result.matchedCount == 0) {
        res.status(404).send(`invoice with id ${id} does not exist`);
      } else if (result.modifiedCount == 0) {
        res.status(404).send(`invoice with id: ${id} not updated`);
      }
    } catch (error) {
      console.error(error.message);
      res.status(400).send(error.message);
    }
  });
  
  // Delete item
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
  





