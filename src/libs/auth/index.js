import Session from './session'
import { login } from './login'
import { normalizeError } from '@errors'

export const $login = params => {
  return normalizeError(login)(params)
}

export default {
    Session,
    $login,
}