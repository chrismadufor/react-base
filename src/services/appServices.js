import { http } from "../utils/axios";

export const getPosts = async () => {
  const response = await http.get("posts");
  return response.data;
};

export const getPostById = async (id) => {
  const response = await http.get(`posts/${id}`);
  return response.data;
};

export const getUsers = async (page = 1, limit = 10) => {
  // JSONPlaceholder doesn't support pagination, but we'll fetch all and paginate client-side
  const response = await http.get("users");
  const allUsers = response.data;
  
  // Client-side pagination
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedUsers = allUsers.slice(startIndex, endIndex);
  const totalPages = Math.ceil(allUsers.length / limit);
  
  return {
    data: paginatedUsers,
    total: allUsers.length,
    current_page: page,
    pages: totalPages,
  };
};

export const getUserById = async (id) => {
  const response = await http.get(`users/${id}`);
  return response.data;
};