// @flow

const initialState = {
  stations: [],
  level: 'off',
  battery: 0,
  speed: 0,
  lock: true,
  light: false
};

export default function appDataReducer(
  state = initialState,
  action
) {
  switch (action.type) {
    case 'SET_APP_DATA':
      return {
        ...state,
        stations: action.stations
      }
    case 'SET_APP_DATA_BACKEND':
      return {
        ...state,
        level: action.level,
        battery: action.battery,
        speed: action.speed,
        lock: action.lock,
        light: action.light
      }
    case 'SET_LEVEL':
      return {
        ...state,
        level: action.level,
      }
    case 'SET_LOCK':
      return {
        ...state,
        lock: action.lock,
      }
    case 'SET_LIGHT':
      return {
        ...state,
        light: action.light,
      }
    default:
      return state;
  }
}
