import apiClient from "../services/api";

/**
 * 주문, 배송 상태 API
 * @returns {Promise<*>}
 */
export const getSalesStatus = async () => {
  const { data } = await apiClient.get('/shapi/v1/dashboard/salesStatus');

  return data.result;
}

/**
 * 교환 현황 API
 * @returns {Promise<*>}
 */
export const getExchangeStatus = async () => {
  const { data } = await apiClient.get('/shapi/v1/dashboard/exchangeStatus');

  return data.result;
}

/**
 * 패널티 현활 API
 * @returns {Promise<*>}
 */
export const getPenaltyStatus = async () => {
  const { data } = await apiClient.get('/shapi/v1/dashboard/penaltyStatus');

  return data.result;
}

/**
 * 인기상품 현황 API
 * @returns {Promise<*>}
 */
export const getPopularProducts = async () => {
  const { data } = await apiClient.get('/shapi/v1/dashboard/popularProducts');

  return data.result.data;
}

/**
 * 상품 연동 현황 API
 * @returns {Promise<*>}
 */
export const getLinkageStatus = async () => {
  const { data } = await apiClient.get('/shapi/v1/dashboard/linkageStatus')

  return data.result;
}

/**
 * 상품 현황 API
 * @returns {Promise<*>}
 */
export const getProductState = async () => {
  const { data } = await apiClient.get('/shapi/v1/dashboard/productState');

  return data.result;
}

/**
 * 상품정보고시 위반 현황 API
 * @returns {Promise<*>}
 */
export const getProductViolation = async () => {
  const { data } = await apiClient.get('/shapi/v1/dashboard/productViolation');

  return data.result;
}

/**
 * 매출 현황 API
 * @returns {Promise<*>}
 */
export const getOrderStatus = async () => {
  const { data } = await apiClient.get('/shapi/v1/dashboard/orderStat');

  return data.result;
}