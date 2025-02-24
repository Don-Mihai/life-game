import { resolve, dirname } from 'path';

export const webpack = {
  alias: {
    '@': resolve(dirname(new URL(import.meta.url).pathname), 'src')
  }
};
