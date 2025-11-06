import * as migration_20251009_155501_initial from './20251009_155501_initial'
import * as migration_20251106_000000_add_media_optimization_fields from './20251106_000000_add_media_optimization_fields'

export const migrations = [
  {
    up: migration_20251009_155501_initial.up,
    down: migration_20251009_155501_initial.down,
    name: '20251009_155501_initial',
  },
  {
    up: migration_20251106_000000_add_media_optimization_fields.up,
    down: migration_20251106_000000_add_media_optimization_fields.down,
    name: '20251106_000000_add_media_optimization_fields',
  },
]
