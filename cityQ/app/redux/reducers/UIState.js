import {
  SET_STATION_MODAL_VISIBLE,
  SET_SELECTED_STATION,
  SET_NAVIGATION_MODE,
} from "../actions/UIState";

const initialState = {
  stationModalVisible: false,
  selectedStationId: null,
  navigationMode: false,
  userProfileMode: false,
};

export default (UIReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_STATION_MODAL_VISIBLE: {
      return {
        ...state,
        stationModalVisible: action.value,
      };
    }
    case SET_SELECTED_STATION: {
      return {
        ...state,
        selectedStationId: action.id,
      };
    }
    case SET_NAVIGATION_MODE: {
      return {
        ...state,
        navigationMode: action.navigationMode,
      };
    }
    default: {
      return state;
    }
  }
});
