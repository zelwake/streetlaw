import * as bcrypt from 'bcrypt'

export async function hashedPassword(password: string): Promise<string> {
  const hash = await bcrypt.hash(password, 10)
  return hash
}

export function compareHash(
  password: string,
  hashed: string
): Promise<boolean> {
  return bcrypt.compare(password, hashed)
}
