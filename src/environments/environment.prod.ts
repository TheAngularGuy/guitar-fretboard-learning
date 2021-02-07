import { shareBetweenEnv } from './shared.env';

export const environment = {
  ...shareBetweenEnv,
  production: true,
  version: '0.0.1',
  enableNgxsLogger: false,
  enableAnalyticsDebug: false,
};
