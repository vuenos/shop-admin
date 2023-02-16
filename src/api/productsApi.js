import apiClient from "../services/api";

export const getProducts = async () => {
  const { data } = await apiClient.get(`/shapi/v1/products`);

  return data.result.data;
}