import {
  SET_STATION_MODAL_VISIBLE,
  SET_SELECTED_STATION,
  SET_NAVIGATION_MODE,
  SET_DRIVING_MODE,
  SET_SHOW_LEVEL_MENU,
} from "../actions/UIState";

const initialState = {
  stationModalVisible: false,
  selectedStationId: null,
  navigationMode: false,
  userProfileMode: false,
  drivingMode: false,
  showLevelMenu: false
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
    case SET_DRIVING_MODE: {
      return {
        ...state,
        drivingMode: action.drivingMode,
      };
    }
    case SET_SHOW_LEVEL_MENU: {
      return {
        ...state,
        showLevelMenu: action.showLevelMenu,
      };
    }
    default: {
      return state;
    }
  }
});
