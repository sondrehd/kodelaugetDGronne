// @flow

const initialState = { stations: [] };

export default function appDataReducer(
  state = initialState,
  action: { type: string, stations: Array<Object> }
) {
  switch (action.type) {
    case 'SET_APP_DATA':
      return {
        ...state,
        stations: action.stations
      }
    default:
      return state;
  }
}
