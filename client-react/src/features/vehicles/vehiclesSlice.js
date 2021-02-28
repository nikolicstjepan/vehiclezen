import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";

import {
  callAddVehicle,
  callGetAllVehicles,
  callRemoveVehicle,
  callGetVehiclesByYear,
  callGetVehiclesByModel,
  callGetVehiclesByMake,
} from "../../lib/api";

const vehiclesAdapter = createEntityAdapter();

const initialState = vehiclesAdapter.getInitialState({
  status: "idle",
  error: null,
});

export const addNewVehicle = createAsyncThunk("vehicles/addVehicle", async (productData) => {
  const addResponse = await callAddVehicle(productData);
  return addResponse.posted;
});

export const fetchVehicles = createAsyncThunk(
  "vehicles/fetchVehicles",
  async ({ type, term, page } = {}) => {
    let searchFunction;

    switch (type) {
      case "make":
        searchFunction = callGetVehiclesByMake;
        break;
      case "model":
        searchFunction = callGetVehiclesByModel;
        break;

      case "year":
        searchFunction = callGetVehiclesByYear;
        break;
      default:
        searchFunction = callGetAllVehicles;
    }

    // if any type has empty string as term, it should return all vehicles
    if (term === "") {
      searchFunction = callGetAllVehicles;
    }

    const results = await searchFunction({ [type]: term, page });
    return results.list;
  }
);

export const removeVehicle = createAsyncThunk("vehicles/removeVehicle", async ({ id }) => {
  await callRemoveVehicle(id);
  return id;
});

const vehiclesSlice = createSlice({
  name: "vehicles",
  initialState,
  reducers: {
    removeError: (state) => {
      state.error = null;
    },
  },
  extraReducers: {
    [addNewVehicle.fulfilled]: (state, action) => {
      vehiclesAdapter.addOne(state, action.payload);
      state.error = null;
    },

    [removeVehicle.fulfilled]: (state, action) => {
      vehiclesAdapter.removeOne(state, action.payload);
      state.error = null;
    },

    [fetchVehicles.pending]: (state) => {
      state.status = "loading";
      state.error = null;
    },
    [fetchVehicles.fulfilled]: (state, action) => {
      state.status = "succeeded";
      vehiclesAdapter.setAll(state, action.payload);
      state.error = null;
    },

    [addNewVehicle.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

export const { removeError } = vehiclesSlice.actions;

export default vehiclesSlice.reducer;

export const {
  selectAll: selectAllVehicles,
  selectById: selectVehicleById,
  selectIds: selectVehiclesIds,
} = vehiclesAdapter.getSelectors((state) => state.vehicles);

export const selectVehiclesStatus = (state) => state.vehicles.status;
export const selectVehiclesError = (state) => state.vehicles.error;
