import { http } from "../utils/axios";

export const getPosts = async () => {
  const response = await http.get("posts");
  return response.data;
};