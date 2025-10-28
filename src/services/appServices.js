import { http } from "../utils/axios";

export const getPosts = async () => {
  const response = await http.get("posts");
  return response.data;
};

export const getPostById = async (id) => {
  const response = await http.get(`posts/${id}`);
  return response.data;
};