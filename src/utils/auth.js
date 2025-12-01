import Cookies from 'js-cookie'

const TokenKey = 'token'
//token
export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

//权限

export function getAuth() {
  return Cookies.get('userAuth')
}

export function setAuth(token) {
  return Cookies.set('userAuth',token)
}

export function removeAuth() {
  return Cookies.remove('userAuth')
}