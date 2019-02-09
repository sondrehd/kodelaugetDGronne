export const SET_STATION_MODAL_VISIBLE = "SET_STATION_MODAL_VISIBLE";
export const SET_SELECTED_STATION = "SET_SELECTED_STATION";
export const SET_NAVIGATION_MODE = "SET_NAVIGATION_MODE";
export const SET_DRIVING_MODE = "SET_DRIVING_MODE";
export const SET_SHOW_LEVEL_MENU = "SET_SHOW_LEVEL_MENU";
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

export const setDrivingMode = drivingMode => {
  return {
    type: SET_DRIVING_MODE,
    drivingMode,
  };
};

export const setShowLevelMenu = showLevelMenu => {
  return {
    type: SET_SHOW_LEVEL_MENU,
    showLevelMenu,
  };
};
