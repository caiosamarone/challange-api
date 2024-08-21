export function checkPermission(email: string, password: string) {
  if (email === 'ADMIN@ADMIN.COM' && password === 'ADMIN') {
    return 'ADMIN'
  }
  return 'USER'
}
