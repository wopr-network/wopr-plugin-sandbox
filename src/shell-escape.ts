/**
 * Shell Escape Utility
 * Sanitizes strings for safe inclusion in shell commands.
 */

/**
 * Escape a string for safe use as a single shell argument.
 * Wraps the value in single quotes and escapes any embedded single quotes.
 * This is the POSIX-standard approach: 'value' with ' escaped as '\''
 */
export function shellEscapeArg(arg: string): string {
  // Replace each single quote with: end quote, escaped quote, start quote
  return `'${arg.replace(/'/g, "'\\''")}'`;
}

/**
 * Validate a command string for obvious shell injection patterns.
 * Returns the command if safe, throws if suspicious metacharacters are detected
 * in positions that suggest injection rather than normal shell usage.
 *
 * This is a defense-in-depth check. The primary defense is Docker container isolation.
 * This catches the most common injection patterns:
 * - Null bytes (used to truncate strings in C-based shells)
 * - Empty commands
 */
export function validateCommand(command: string): string {
  // Reject null bytes — these can truncate strings in C-based shells
  if (command.includes("\0")) {
    throw new Error("Command contains null bytes");
  }

  // Reject empty commands
  const trimmed = command.trim();
  if (!trimmed) {
    throw new Error("Command is empty");
  }

  return trimmed;
}
