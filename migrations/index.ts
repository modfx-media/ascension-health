import * as migration_20261026_163230_initial from './20261026_163230_initial';

export const migrations = [
  {
    up: migration_20261026_163230_initial.up,
    down: migration_20261026_163230_initial.down,
    name: '20261026_163230_initial'
  },
];
