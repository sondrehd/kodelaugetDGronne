// @flow

import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";

import appState from "./reducers/appState";
import appData from "./reducers/appData";
import nav from "./reducers/nav";
import UIState from "./reducers/UIState";

const rootReducer = combineReducers({
  appState,
  appData,
  UIState,
  nav,
});

const persistConfig = {
  key: "root",
  storage,
  stateReconciler: autoMergeLevel2,
  blacklist: ["appState", "appData", "nav", "UIState"],
  // transforms: [locationBlacklist]
};

export default persistReducer(persistConfig, rootReducer);
