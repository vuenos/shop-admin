import { atom, useRecoilState } from 'recoil';

const usersAtom = atom({
  key: 'users',
  default: null
});

export { usersAtom };
export const useUsersState = () => useRecoilState(usersAtom);