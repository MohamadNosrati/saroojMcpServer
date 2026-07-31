import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

import { app } from "./index.js";
import { registerProjectsInfoTool } from "./tools/getProjectsInfo.js";
import registerTematesInfoTool from "./tools/getTeamsInfo.js";

export function createMcpServer() {
  const server = new McpServer({
    name: "sarooj",
    version: "1.0.0",
  });

  registerProjectsInfoTool(server);
  registerTematesInfoTool(server);

  return server;
}
app.listen(Number(process.env.PORT), () => {
  console.log(
    `MCP HTTP Server listening on ${process.env.BASEURL}:${process.env.PORT}`,
  );
});
