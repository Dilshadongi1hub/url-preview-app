import api from "./api";

export const savePreview = (data) => {
  return api.post("/preview", data);
};

export const getAllPreviews = () => {
  return api.get("/preview");
};

export const deletePreview = (id) => {
  return api.delete(`/preview/${id}`);
};