import * as migration_20251009_155501_initial from './20251009_155501_initial'
import * as migration_20251106_000000_add_media_optimization_fields from './20251106_000000_add_media_optimization_fields'
import * as migration_20251106_000001_add_missing_blocks_and_fields from './20251106_000001_add_missing_blocks_and_fields'
import * as migration_20251106_000002_final_comprehensive_fix from './20251106_000002_final_comprehensive_fix'
import * as migration_20251106_000003_add_blocks_to_locked_docs from './20251106_000003_add_blocks_to_locked_docs'

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
  {
    up: migration_20251106_000001_add_missing_blocks_and_fields.up,
    down: migration_20251106_000001_add_missing_blocks_and_fields.down,
    name: '20251106_000001_add_missing_blocks_and_fields',
  },
  {
    up: migration_20251106_000002_final_comprehensive_fix.up,
    down: migration_20251106_000002_final_comprehensive_fix.down,
    name: '20251106_000002_final_comprehensive_fix',
  },
  {
    up: migration_20251106_000003_add_blocks_to_locked_docs.up,
    down: migration_20251106_000003_add_blocks_to_locked_docs.down,
    name: '20251106_000003_add_blocks_to_locked_docs',
  },
]
