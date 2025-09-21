import {stateAndDistricts} from "./statesAndDistricts"

export function getStates() {
  return Object.keys(stateAndDistricts);
}

export function getDistricts(state) {
  return stateAndDistricts[state] || [];
}