# wopr-plugin-sandbox

Docker-based session isolation plugin for WOPR.

## Build & Test

```bash
npm install
npm run build        # tsc
npm run check        # biome check + tsc --noEmit
npm run test         # vitest run
npm run lint         # biome check
npm run lint:fix     # biome check --fix
npm run format       # biome format --write
```

## Architecture

- `src/index.ts` -- Plugin entry point, default export, extension registration
- `src/config.ts` -- Sandbox config resolution from WOPR main config
- `src/config-hash.ts` -- SHA-256 hash of sandbox config for change detection
- `src/context.ts` -- Per-session sandbox context resolution
- `src/docker.ts` -- Docker container lifecycle (create, start, exec, remove)
- `src/prune.ts` -- Idle/old container pruning
- `src/registry.ts` -- Container registry facade (delegates to SQL repository)
- `src/sandbox-repository.ts` -- SQL-backed CRUD via PluginSchema storage API
- `src/sandbox-schema.ts` -- Zod schema + PluginSchema definition
- `src/sandbox-migrate.ts` -- JSON-to-SQL migration for legacy registry
- `src/tool-policy.ts` -- Tool allow/deny policy engine with glob patterns
- `src/runtime.ts` -- Runtime dependency injection (logger, storage, config)
- `src/shell-escape.ts` -- Shell argument escaping and command validation
- `src/types.ts` / `src/types.docker.ts` -- Type definitions
- `src/shared.ts` -- Shared utilities (slugify, path resolution)
- `src/constants.ts` -- Default values and paths

## Plugin Contract

- Imports from `@wopr-network/plugin-types` only -- never relative paths into core
- Storage via `PluginSchema` + `Repository<T>` -- no direct Drizzle
- Extensions registered in `init()`, unregistered in `shutdown()`
- `shutdown()` is idempotent, sets `ctx = null`

## Issue Tracking

Linear: WOP- prefix | Team: WOPR
