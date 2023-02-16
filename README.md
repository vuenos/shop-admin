# Sanctum / SPA authentication

A React app that authenticates with the [Laravel Sanctum](https://laravel.com/docs/7.x/sanctum) package. See [this repo](https://github.com/unlikenesses/sanctum-backend-example) for an example API that works with this project.


## Authorization
- 인가된 csrf 토큰은 쿠키로 저장이 된다.
- 이후로는 주문, 상품 등의 데이터를 호출(API fetch)할 시에 특정한 추가 인증절차는 불필요
- csrf 토큰이 정상적으로 저장될때 브라우저 스토리지에 'auth' 와 같은 key 를 저장한다.
- 저장된 'auth' key 값으로 Recoil 을 통해 로그인 상태관리(global state management)를 하게 된다.
```javascript
// atoms/auth.js
import { atom, useRecoilState} from "recoil";

const AuthState = atom({
  key: 'AuthState',
  default: {loggedIn: false, id: "", password: ""}
});

export { AuthState }

export const useAuthState = () => useRecoilState(AuthState);


// login.jsx
import { useAuthState } from "../atoms/auth";

const loginSubmit = async (form) => {

  await apiClient.get(`/sanctum/csrf-cookie`);

  try {
    const { data, status } = await apiClient.post(`/api/login`, JSON.stringify(form));
    console.log(data);
    if (status === 200) {
      setAuthState({ loggedIn: true, ...data });
      localStorage.setItem("auth", true);
      navigate("/dashboard");
    }
  } catch (error) {
    if (error.response && error.response.status === 422) {
      setShowError(true);
      setErrorAlert("계정정보 확인");
      console.log(error.message);
    }
    else {
      setShowError(true);
      setErrorAlert("일시적인 오류로 로그인을 할 수 없습니다. 잠시 후 다시 시도해 주십시오");
      console.error(error);
    }
  }

};
```

## API fetch
- RTK(ReactQuery) 사용 <https://react-query-v3.tanstack.com/>
- API Action 함수들을 한 파일에서 관리한다.
```javascript
// api.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://localhost:5000',
  withCredentials: true,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
});

// orderApi.js
import apiClient from "../services/api";

export const getSalesStatus = async () => {
  const { data } = await apiClient.get('/api/salesStatus');

  return data.result;
}

export const getExchangeStatus = async () => {
  const { data } = await apiClient.get('/api/exchangeStatus');

  return data.result;
}
```
```javascript
import { useQuery } from "react-query";
import {getOrderData} from "./api/orderApi";

const {
  isLoading, // 로딩상테
  error,
  refetch, // data refetch
  data: orderData // api value parameter
} = useQuery('getOrderData', getOrderData); // API 호출 액션 함수

const Order = () => {
  return (
    <h1>{orderData && orderData.total}</h1>
  )
}
```