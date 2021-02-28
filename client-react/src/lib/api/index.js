import * as apiMethods from "./api";

export function callRegisterUser(data) {
  return apiMethods.post("/users", data);
}

export function callLoginUser(data) {
  return apiMethods.post("/users/login", data);
}

export function callAddVehicle(data) {
  return apiMethods.post("/vehicles", data);
}

export function callGetVehiclesByMake({ make, page }) {
  return apiMethods.get(`/vehicles?make=${make}&page=${page}`);
}

export function callGetVehiclesByModel({ model, page }) {
  return apiMethods.get(`/vehicles?model=${model}&page=${page}`);
}

export function callGetVehiclesByYear({ year, page }) {
  return apiMethods.get(`/vehicles?year=${year}&page=${page}`);
}

export function callGetAllVehicles({ page }) {
  page = page || 1;
  return apiMethods.get(`/vehicles?page=${page}`);
}

export function callRemoveVehicle(id) {
  return apiMethods.remove(`/vehicles/${id}`);
}
