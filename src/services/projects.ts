import { projectRoutes } from "../routes/api.js";
import type { IBaseResponse } from "../types/base.js";
import type { IProjectInfo } from "../types/project.js";
import axiosInstance from "./base.js";

export const getAllProjectsInfo = async (language: "en" | "fa") => {
  console.log("call projects api service!!!!!!");
  const res = await axiosInstance.get<IBaseResponse<IProjectInfo[]>>(
    projectRoutes.getProjectsInfo(language),
  );
  return res?.data?.data;
};
