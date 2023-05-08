export function fullUsername(userObject: {
  firstName: string
  lastName: string
}): string {
  return `${userObject.firstName} ${userObject.lastName}`
}
