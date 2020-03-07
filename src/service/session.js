function getTimeStamp() {
  return Math.round(new Date() / 1000)
}

export function getSession() {
  if (sessionStorage) {
    const data = sessionStorage.getItem('session');
    if (data) {
      let [session, expriseTime] = data.split('-');
      if (getTimeStamp() > parseInt(expriseTime)) {
        return false;
      } else {
        return session;
      }
    }
  }

  return false;
}

export function setSession(session, expriseTime) {
  if (!expriseTime) {
    expriseTime = getTimeStamp() + 1800;
  }
  if (sessionStorage) {
    sessionStorage.setItem('session', `${session}-${expriseTime}`);
  }
}

export function clearSession() {
  sessionStorage.removeItem("session");
}