export function prismaJSON(info: unknown): unknown {
  return JSON.parse(JSON.stringify(info))
}
