
export function setDestination(destination) {
  return {
    type: 'SET_DESTINATION',
    destination
  };
}



export function setRemaining(time, distance) {
  return {
    type: 'SET_REMAINING',
    timeRemaining: time,
    distanceRemaining: distance
  };
}



