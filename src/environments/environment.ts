import { shareBetweenEnv } from './shared.env';

export const environment = {
  ...shareBetweenEnv,
  production: false,
  version: 'dev',
  enableNgxsLogger: false,
  enableAnalyticsDebug: false,
};

