import axiosInstance from "./base.js";

export const getAllProjectsInfo = async () => {
  return await axiosInstance.get("projects/get-all-info");
};
