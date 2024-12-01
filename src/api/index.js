import axios from "axios";
import API_ENDPOINTS from "./endpoints";
export const BASE_URL = "http://localhost:3000";

export const Axios = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const handleApi = async (axiosPromise) => {
  try {
    return await axiosPromise;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const postUserRegister = (payload) =>
  handleApi(Axios.post(API_ENDPOINTS.REGISTER, payload));

export const postUserLogin = (payload) =>
  handleApi(Axios.post(API_ENDPOINTS.LOGIN, payload));

export const postUserLogout = (payload) =>
  handleApi(
    Axios.post(API_ENDPOINTS.LOGOUT, payload, {
      headers: { "x-auth-token": localStorage.getItem("token") },
    })
  );

export const createProduct = (payload) =>
  handleApi(
    Axios.post(API_ENDPOINTS.PRODUCT, payload, {
      headers: { "x-auth-token": localStorage.getItem("token") },
    })
  );

export const searcProducts = (payload) =>
  handleApi(
    Axios.get(API_ENDPOINTS.SEARCHPROD, {
      headers: { "x-auth-token": localStorage.getItem("token") },
      params: {
        name: payload.name,
        subcategory: payload.category,
        range: payload.range,
        limit: payload.limit,
        page: payload.page,
      },
    })
  );

export const filterProd = (rating) =>
  handleApi(
    Axios.get(`${API_ENDPOINTS.FILTERPROD}/${rating}`, {
      headers: { "x-auth-token": localStorage.getItem("token") },
    })
  );

export const getAllProducts = () =>
  handleApi(
    Axios.get(API_ENDPOINTS.PRODUCT, {
      headers: { "x-auth-token": localStorage.getItem("token") },
    })
  );

export const addProductsToCart = (payload) =>
  handleApi(
    Axios.post(API_ENDPOINTS.ADDTOCART, payload, {
      headers: { "x-auth-token": localStorage.getItem("token") },
    })
  );

export const removeProductFromCart = (payload) =>
  handleApi(
    Axios.delete(API_ENDPOINTS.ADDTOCART, {
      data: payload,
      headers: { "x-auth-token": localStorage.getItem("token") },
    })
  );

export const getUserCart = (payload) =>
  handleApi(
    Axios.get(API_ENDPOINTS.ADDTOCART, {
      headers: { "x-auth-token": localStorage.getItem("token") },
      params: {
        id: payload.userId,
      },
    })
  );

export const handleCheckout = (payload) =>
  handleApi(
    Axios.post(API_ENDPOINTS.CHECKOUT, payload, {
      headers: { "x-auth-token": localStorage.getItem("token") },
    })
  );

export const handleProcessOrder = (payload) =>
  handleApi(
    Axios.post(API_ENDPOINTS.PROCESS_ORDER, payload, {
      headers: { "x-auth-token": localStorage.getItem("token") },
    })
  );

export const fetchUserOrders = (payload) =>
  handleApi(
    Axios.get(API_ENDPOINTS.GET_USER_ORDERS, {
      headers: { "x-auth-token": localStorage.getItem("token") },
      params: {
        id: payload.userId,
      },
    })
  );

export const getSpecificOrder = (payload) =>
  handleApi(
    Axios.get(API_ENDPOINTS.GET_ORDER, {
      headers: { "x-auth-token": localStorage.getItem("token") },
      params: {
        id: payload.orderId,
      },
    })
  );

export const addReviewToProd = (payload) =>
  handleApi(
    Axios.post(API_ENDPOINTS.ADD_REVIEW, payload, {
      headers: { "x-auth-token": localStorage.getItem("token") },
    })
  );
