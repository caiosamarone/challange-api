import { env } from '@/config/env'

export function checkPermission(email: string, password: string) {
  if (email.toLowerCase() === env.ADMIN_EMAIL && password.toLowerCase() === env.ADMIN_PSW) {
    return 'ADMIN'
  }
  return 'USER'
}
