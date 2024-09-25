import axios from "axios";

const axiosObj = axios.create({
  baseURL: "http://127.0.0.1:8000/",
  headers: {
    "Content-Type": "application/json",
  },
});

export const login = (data) => {
  return axiosObj.post("/login", data);
};

export const signup = (data) => {
  return axiosObj.post("/signup", data);
};

export const getPosts = () => {
  return axiosObj.get("/post");
};
export const getPostById = (id) => {
  return axiosObj.get(`/post/${id}`);
};

export const createPosts = (formData) => {
  return axiosObj.post("/post", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const updatePosts = (id, formData) => {
  return axiosObj.put(`/post/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deletePosts = (id) => {
  return axiosObj.delete(`/post/${id}`);
};
