import { getSession } from '../utils/session'

export default function (to, from, next) {
  next( getSession() ? true : '/login');
}