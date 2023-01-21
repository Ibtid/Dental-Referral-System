import { ReactNode } from 'react';

export interface ISideNavsConfig {
  title: string;
  path: string;
  allowedRoles: string[];
  icon: ReactNode;
}
