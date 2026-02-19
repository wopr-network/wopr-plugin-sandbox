# @wopr-network/wopr-plugin-sandbox

> Docker-based session isolation for WOPR — container lifecycle management, per-session workspaces, and tool policy enforcement.

## Install

```bash
npm install @wopr-network/wopr-plugin-sandbox
```

## Usage

```bash
wopr plugin install github:wopr-network/wopr-plugin-sandbox
```

Then configure via `wopr configure --plugin @wopr-network/wopr-plugin-sandbox`.

## Configuration

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `image` | string | No | Docker image to use (default: `wopr-sandbox`) |
| `scope` | string | No | Isolation scope: `session` (default) or `user` |
| `idle_hours` | number | No | Container idle timeout in hours (default: `2`) |
| `max_age_days` | number | No | Maximum container age in days (default: `7`) |
| `tool_allow` | string[] | No | Whitelist of allowed tools in sandbox |
| `tool_deny` | string[] | No | Blacklist of denied tools in sandbox |
| `workspace_root` | string | No | Host path for sandbox workspaces |

## What it does

The sandbox plugin provides Docker-based isolation for untrusted agent sessions. Each session gets its own container with a dedicated workspace directory, and a configurable tool policy engine controls which tools are permitted inside the sandbox. The plugin manages the full container lifecycle (create, start, prune) and migrates existing session state to SQL-backed storage automatically on upgrade.

## License

MIT
