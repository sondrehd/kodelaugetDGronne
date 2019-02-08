import { stations } from '../../mockData/stations'

export function getAppData() {
  return {
    type: 'SET_APP_DATA',
    stations: stations
  };
}


