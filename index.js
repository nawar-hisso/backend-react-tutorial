import express from "express";
import cors from "cors";
import { APPLICATION } from "./server/configs/application.js";
import { MESSAGES } from "./server/configs/messages.js";
import connectToDB from "./server/models/index.js";
import routes from "./server/routes/index.js";

const app = express();

// Connect to DB
connectToDB();

// Middleware to read JSON payloads
app.use(express.json());

// Middleware to control CORS
app.use(
  cors({
    credentials: true,
  })
);

// Load routes
app.use(routes);

// Start the server
app.listen(APPLICATION.PORT, () => {
  console.log(MESSAGES.WELCOME);
});

export default app;
