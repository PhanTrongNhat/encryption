import axiosClient from "./axiosClient";
const UserApi = {
  postUser: (data) => {
    const url = "/Login";
    return axiosClient.post(url, data);
  },
  registerUser: (data) => {
    const url = "/signin";
    return axiosClient.post(url, data);
  },
  getImages: (params) => {
    const url = `/getimages?username=${params}`;
    return axiosClient.get(url);
  },
  uploadkey: (data) => {
    const url = "/uploadkey";
    return axiosClient.post(url, data);
  },
  uploadAnotherUser: (data) => {
    const url = "/user";
    return axiosClient.post(url, data);
  },
  getImageAnotherUser: (params) => {
    const url = `/user?username=${params}`;
    return axiosClient.get(url);
  },
};

export default UserApi;
