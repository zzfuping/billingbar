
function get(key) {
  if (!key || !_has(key)) {
    return null;
  }
  return wx.getStorageSync(key)

}

function all() {
  return wx.getStorageInfoSync()
}

function set(key, data, time) {
  if (!key) {
    return;
  }
  wx.setStorageSync(key, data)
}

function remove(key) {
  if (!key || !_has(key)) {
    return;
  }
  wx.removeStorageSync(key)
}

function clearAll() {
  wx.clearStorage()
}

function _has(key) {
  if (!key) {
    return
  }
  let value = wx.getStorageSync(key)
  if (value) {
    return true
  }
  return false
}

export default {
  all,
  get,
  set,
  remove,
  clearAll,
  has: _has
};
