export const SET_STATION_MODAL_VISIBLE = "SET_STATION_MODAL_VISIBLE";
export const SET_SELECTED_STATION = "SET_SELECTED_STATION";
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
