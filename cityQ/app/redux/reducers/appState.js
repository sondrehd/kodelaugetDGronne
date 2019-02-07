// @flow

const initialState: ?string = 'background';

export default function appStateReducer(
  state: ?string = initialState,
  action: { type: string, state: string }
): ?string {
  switch (action.type) {
    case 'SET_APP_STATE':
      return action.state;
    default:
      return state;
  }
}
