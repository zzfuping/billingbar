import { promisify } from '@utils/promisify'

export const wxCheckSession = promisify(wx.checkSession)
