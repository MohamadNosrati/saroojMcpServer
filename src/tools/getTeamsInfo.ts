import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import z from "zod";
import { getAllTeamatesInfo } from "../services/team.js";

const TOOLNAME = "search-sarooj-team-knowledge";
const TOOLTITLE = "Sarooj Team Knowledge";
const TOOLDESCRIPTION =
  "Search information about Sarooj company team members, including CEO, managers, HR, engineers, and other staff.";

export default function registerTematesInfoTool(
  server: McpServer,
) {
  server.registerTool(
    TOOLNAME,
    {
      title: TOOLTITLE,
      description: TOOLDESCRIPTION,
      inputSchema: z
        .object({
          language: z.enum(["en", "fa"]),
        })
        .describe(
          "Natural language search query about Sarooj company team members",
        ),
    },
    async ({ language }) => {
      const result = await getAllTeamatesInfo(language);

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(result),
          },
        ],
        structuredContent: {
          teamates: result,
        },
      };
    },
  );
}
