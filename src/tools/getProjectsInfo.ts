import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import { getAllProjectsInfo } from "../services/projects.js";
import z from "zod";

const TOOLNAME = "search-sarooj-project-knowledge";
const TOOLTITLE = "Sarooj Project Knowledge";
const TOOLDESCRIPTION = `
Use this tool whenever the user asks anything related to Sarooj Construction Company,
its portfolio, completed projects, renovation experience, architectural style,
industrial construction, commercial construction, residential buildings, villas,
houses, offices, warehouses, factories, or wants professional advice that could
benefit from understanding Sarooj's previous projects.

Examples:
- What projects has Sarooj completed?
- Show me Sarooj's portfolio.
- Has Sarooj worked on industrial projects?
- Have you renovated office buildings?
- Tell me about your renovation experience.
- What architectural styles do you build?
- Can Sarooj build a warehouse?
- I need advice for renovating my factory.
- Recommend a construction approach based on your previous work.
- Which Sarooj project is similar to my needs?

Do NOT use this tool for:
- General construction knowledge that is unrelated to Sarooj.
- Questions about pricing, contracts, employees, company policies,
  or information not represented by the project portfolio.

This tool returns the complete Sarooj project portfolio. The assistant should
analyze the returned projects and use them as context when answering the user.
      `;

export const registerProjectsInfoTool = (mcpServer: McpServer) => {
  mcpServer.registerTool(
    TOOLNAME,
    {
      title: TOOLTITLE,
      description: TOOLDESCRIPTION,
      inputSchema: z.object({
        language: z.enum(["en", "fa"]),
      }).describe("Natural language search query about Sarooj company projects info"),
      outputSchema: z.object({
        projects: z.array(
          z.object({
            id: z.string(),
            title: z.string().optional(),
            description: z.string().optional(),
            area: z.number().optional(),
            alt: z.string().optional(),
            address: z.string().optional(),
            artitectureStyle: z.string().optional(),
          }),
        ),
      }),

      annotations: {
        readOnlyHint: true,
        openWorldHint: false,
        idempotentHint: true,
      },
      _meta: {
        category: "knowledge",
        domain: "construction",
        company: "Sarooj",
        capability: [
          "portfolio",
          "projects",
          "renovation",
          "industrial",
          "commercial",
          "residential",
          "architecture",
          "construction-advice",
        ],
      },
    },
    async ({ language }) => {
      const data = await getAllProjectsInfo(language);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(data),
          },
        ],
        structuredContent: {
          projects: data,
        },
      };
    },
  );
};
