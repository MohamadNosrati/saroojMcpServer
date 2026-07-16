import { z } from "zod";
import { getAllProjectsInfo } from "../services/projects.js";

export const getProjectsInfoTool = Object.freeze({
  name: "get-projects-info",

  description:
    "Returns all sarooj projects including their title, description, architectureStyle, alts, steps and other public information.",

  inputSchema: z.object({}),

  async execute() {
    const { data } = await getAllProjectsInfo();

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(data),
        },
      ],
    };
  },
});
