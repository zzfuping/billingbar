import stringify from '@utils/querystring'

function parseUrl(location) {
  if (typeof location === 'string') 
    return location

  const { path, query } = location
  const queryStr = stringify(query)
  return queryStr ? `${path}?${queryStr}` : path
}

export const parseRoute = ($mp) => {
  const _$mp = $mp || {}
  const path = _$mp.page && _$mp.page.route
  return {
    path: `/${path}`,
    params: {},
    query: _$mp.query,
    hash: '',
    fullPath: parseUrl({
      path: `/${path}`,
      query: _$mp.query
    }),
    name: path && path.replace(/\/(\w)/g, ($0, $1) => $1.toUpperCase())
  }
}

export const $router = {
  mode: 'history',
  push(location, complete, fail, success) {      
    const url = parseUrl(location)
    const params = { url, complete, fail, success }
    if (location.isTab) {
      wx.switchTab(params)
    } else if (location.reLaunch) {
      wx.reLaunch(params)
    } else {
      wx.navigateTo(params)
    }
  },
  replace(location, complete, fail, success) {
    const url = parseUrl(location)
    wx.redirectTo({ url, complete, fail, success })
  },
  go: (delta) => {
    wx.navigateBack({ delta })
  },
  back: () => {      
    wx.navigateBack({delta: 1})
  }
}

export default $router