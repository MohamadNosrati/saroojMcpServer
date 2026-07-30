import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import type { Request, Response } from "express";
import crypto from "crypto";
import { createMcpServer } from "../server.js";

const transports = new Map<string, StreamableHTTPServerTransport>();

export const mcpHandler = async (req: Request, res: Response) => {
  const sessionId = req.headers["mcp-session-id"] as string | undefined;
  console.log("sessionId", sessionId);

  let transport = sessionId ? transports.get(sessionId) : undefined;

  if (!transport) {
    transport = new StreamableHTTPServerTransport({
      sessionIdGenerator: () => crypto.randomUUID(),
      onsessioninitialized(sessionId) {
        transports.set(sessionId, transport as any);
      },
    });

    const mcpServer = createMcpServer();

    await mcpServer.connect(transport as any);

    transport.onclose = () => {
      if (transport?.sessionId) {
        transports.delete(transport.sessionId);
      }
    };

    console.log("tranaportSessionId", transport?.sessionId);

    // transports.set(transport.sessionId!, transport);
  }

  await transport.handleRequest(req, res, req.body);
};
