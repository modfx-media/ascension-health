/** Remove database URLs and embedded passwords before an error is printed or saved. */
export function redactSecrets(input: string): string {
  return input.replace(/[a-z][a-z0-9+.-]*:\/\/[^\s'")\]]+/gi, (match) => {
    if (/^postgres(?:ql)?:\/\//i.test(match)) return "postgres://[redacted]";
    try {
      const url = new URL(match);
      if (url.username || url.password) return `${url.protocol}//[redacted]`;
      return match;
    } catch {
      return /^postgres/i.test(match) ? "postgres://[redacted]" : match;
    }
  });
}
