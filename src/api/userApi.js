import { useSetRecoilState } from 'recoil';
import apiClient from "../services/api";
import { usersAtom } from "../atoms/users";

const useUserActions = () => {
  const setUserInfo = useSetRecoilState(usersAtom);
  // const token = localStorage.getItem("access_token");
  // const config = {
  //   headers: {
  //     Authorization: "Bearer " + token
  //   }
  // }

  async function getUserInfo () {
    console.log(apiClient);
    const { data } = await apiClient.get(`/shapi/v1/user`);
    // localStorage.setItem("tmp_data", data.data.name);
    setUserInfo(data.result);
    console.log('USERDATA::', data.result)
    return data.result;
  }

  return {
    getUserInfo
  }
}

export { useUserActions };