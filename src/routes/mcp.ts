import { app } from "../index.js";
import { mcpHandler } from "../controllers/mcp.js";
import express from "express";

const mcpRouter = express.Router();

mcpRouter.all("/", mcpHandler);

export default mcpRouter;
