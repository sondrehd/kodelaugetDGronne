import { stations } from '../../mockData/stations'

export function getAppData() {
  return {
    type: 'SET_APP_DATA',
    stations: stations
  };
}

export function setAppDataBackend(
  level,
  battery,
  speed,
  lock,
  light) {
  return {
    type: 'SET_APP_DATA_BACKEND',
    level: level,
    battery: battery,
    speed: speed,
    lock: lock,
    light: light
  };
}

export function setLevel(level) {
  return {
    type: 'SET_LEVEL',
    level: level,
  };
}

export function setLock(lock) {
  return {
    type: 'SET_LOCK',
    lock: lock,
  };
}

export function setLight(light) {
  return {
    type: 'SET_LIGHT',
    light: light,
  };
}


