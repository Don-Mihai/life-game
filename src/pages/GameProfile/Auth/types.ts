export enum INPUTS_KEYS {
  EMAIL = 'email',
  PASSWORD = 'password',
  FIRST_NAME = 'firstName',
}

export interface PRegister {
  [INPUTS_KEYS.FIRST_NAME]: string;
  [INPUTS_KEYS.PASSWORD]: string;
  [INPUTS_KEYS.EMAIL]: string;
}

export enum AUTH_MODE {
  LOGIN,
  REGISTER,
}

export const initValues = { firstName: '', email: '', password: '' };
