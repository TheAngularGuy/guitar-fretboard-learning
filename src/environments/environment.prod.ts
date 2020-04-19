import { shareBetweenEnv } from './shared.env';

export const environment = {
  ...shareBetweenEnv,
  production: true,
  version: '1.4.1',
};
