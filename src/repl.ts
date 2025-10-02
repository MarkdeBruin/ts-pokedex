export function cleanInput(input: string): string[] {
  if (!input.trim()) return [];
  return input.trim().toLowerCase().split(/\s+/);
}