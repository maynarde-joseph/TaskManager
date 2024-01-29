import express from "express";
import { connectToDatabase } from "./services/database.service.js";
import { mongoRouter } from "./routes/mongo.router.js";
import path from "path";
import { fileURLToPath } from 'url';

const app = express();
const port = 8080; // default port to listen
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// Mongo stuff
connectToDatabase()
  .then(() => {

    app.use("/invoices", mongoRouter);
    app.use(express.static('static'));

    // Serve the index.html file for any other requests
    app.get('/', (req, res) => {
      const filePath = path.join(__dirname, 'static', 'index.html');
      res.sendFile(filePath);
    });
    

    // start the Express server
    app.listen(port, () => {
      console.log(`Server started at http://localhost:${port}`);
    });

    })
    .catch((error) => {
        console.error("Database connection failed", error);
        process.exit();
    });