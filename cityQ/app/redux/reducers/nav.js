// @flow

const initialState = { destination: { latitude: 59.924234229977, longitude: 10.7422535 }, timeRemaining: null, distanceRemaining: null };

export default function appDataReducer(
  state = initialState,
  action: { type: string, destination: ?string, timeRemaining: ?number, distanceRemaining: ?number }
) {
  switch (action.type) {
    case 'SET_DESTINATION':
      return {
        ...state,
        destination: action.destination
      }
    case 'SET_REMAINING':
      return {
        ...state,
        timeRemaining: action.timeRemaining,
        distanceRemaining: action.distanceRemaining
      }
    default:
      return state;
  }
}
