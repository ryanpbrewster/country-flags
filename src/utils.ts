export function assertNever(_: never) {}

export function mod(a: number, m: number): number {
  return ((a % m) + m) % m;
}
