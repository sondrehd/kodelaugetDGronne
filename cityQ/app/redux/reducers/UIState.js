import {
  SET_STATION_MODAL_VISIBLE,
  SET_SELECTED_STATION,
} from "../actions/UIState";

const initialState = {
  stationModalVisible: false,
  selectedStationId: null,
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
    default: {
      return state;
    }
  }
});
