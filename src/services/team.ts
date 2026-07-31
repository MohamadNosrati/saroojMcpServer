import { projectRoutes, teamRoutes } from "../routes/api.js";
import type { IBaseResponse } from "../types/base.js";
import type { ITeamateInfo } from "../types/team.js";
import axiosInstance from "./base.js";

export const getAllTeamatesInfo = async (language: "en" | "fa") => {
  console.log("call projects api service!!!!!!");
  const res = await axiosInstance.get<IBaseResponse<ITeamateInfo[]>>(
    teamRoutes.getTeamsInfo(language),
  );
  return res?.data?.data;
};
