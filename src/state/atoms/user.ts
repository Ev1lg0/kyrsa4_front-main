import { atom } from 'recoil';

export const userAtom = atom({
  key: 'userState',
  default: {
    id: 0,
    FirstName: '',
    SecondName: '',
    MiddleName: '',
  },
});
