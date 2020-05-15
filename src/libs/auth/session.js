import consts from './consts'

const SESSION_KEY = `mapp_session_${consts.WX_SESSION_MAGIC_ID}`

const Session = {
  clear: () => {
    wx.removeStorageSync(SESSION_KEY)
  },

  get: () => {
    return wx.getStorageSync(SESSION_KEY) || null
  },

  set: session => {
    wx.setStorageSync(SESSION_KEY, session)
  }
}

export default Session
