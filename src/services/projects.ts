import { projectRoutes } from "../routes/api.js";
import type { IBaseResponse } from "../types/base.js";
import type { IProjectInfo } from "../types/project.js";
import axiosInstance from "./base.js";

export const getAllProjectsInfo = async () => {
  console.log("call api service!!!!!!");
  const res = await axiosInstance.get<IBaseResponse<IProjectInfo[]>>(
    projectRoutes.getProjectsInfo(),
  );
  console.log("res",res?.data?.data)
  return res?.data?.data;
};
