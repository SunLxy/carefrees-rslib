import type {
  EnvironmentConfig,
} from '@rsbuild/core';

export type Format = 'esm' | 'cjs' | 'umd' | 'mf';
export type RsbuildConfigWithLibInfo = {
  id?: string;
  format: Format;
  config: EnvironmentConfig;
};
