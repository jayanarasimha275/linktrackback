import api from "./api";

export const getAllLinks = async () => {
  const response = await api.get("/links");
  return response.data;
};
