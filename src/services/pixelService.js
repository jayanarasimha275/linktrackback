import api from "./api";

export const getPixelByLinkId = async (linkId) => {
  const response = await api.get(`/pixels/${linkId}`);
  return response.data;
};

export const createPixel = async (data) => {
  const response = await api.post("/pixels", data);
  return response.data;
};

export const updatePixel = async (linkId, data) => {
  const response = await api.put(`/pixels/${linkId}`, data);
  return response.data;
};

export const deletePixel = async (linkId) => {
  const response = await api.delete(`/pixels/${linkId}`);
  return response.data;
};
