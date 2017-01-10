export interface User {
  userId: number;
  loginId: string;
  firstName: string;
  lastName: string;
  email: string;
  createDate: string;
}

export const defaultUser: User = {
  userId: 0,
  loginId: '',
  firstName: '',
  lastName: '',
  email: '',
  createDate: undefined,
};

