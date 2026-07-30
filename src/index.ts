import express from "express";
import mcpRouter from "./routes/mcp.js";
import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});

export const app = express();
app.use(express?.json());

app.use("/mcp", mcpRouter);
