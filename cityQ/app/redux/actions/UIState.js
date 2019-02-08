export const SET_STATION_MODAL_VISIBLE = "SET_STATION_MODAL_VISIBLE";
export const SET_SELECTED_STATION = "SET_SELECTED_STATION";
export const SET_NAVIGATION_MODE = "SET_NAVIGATION_MODE";
export const setStationModalVisible = value => {
  return {
    type: SET_STATION_MODAL_VISIBLE,
    value,
  };
};

export const setSelectedStation = id => {
  return {
    type: SET_SELECTED_STATION,
    id,
  };
};

export const setNavigationMode = navigationMode => {
  return {
    type: SET_NAVIGATION_MODE,
    navigationMode,
  };
};
