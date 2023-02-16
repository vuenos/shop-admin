import { atom, useRecoilState} from "recoil";

const AuthState = atom({
  key: 'AuthState',
  default: {loggedIn: false, m_id: "", password: ""}
});

export { AuthState }

export const useAuthState = () => useRecoilState(AuthState);