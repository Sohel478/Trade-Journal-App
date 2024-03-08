import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

export const tradingAccountList = createAsyncThunk(
  "tradingAccount/tradingAccountList",
  async (token) => {
    const response = await axios.get(`${apiUrl}/trading-account`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });
    console.log("===> I'm response", response)
    return response;
  }
);

export const tradingAccountAdd = createAsyncThunk(
  "tradingAccount/tradingAccountAdd",
  async (data) => {
    const response = await axios.post(`${apiUrl}/trading-account`, data?.values, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${data?.token}`,
      },
    });
    return response;
  }
);

// export const tradingAccountEdit = createAsyncThunk(
//   "tradingAccount/tradingAccountEdit",
//   async (data) => {
//     const response = await axios.put(`${apiUrl}/trading-account/update/`, data?.values, {
//       headers: {
//         "Content-Type": "application/json",
//         authorization: `Bearer ${data?.token}`,
//       },
//     });
//     return response;
//   }
// );

export const tradingAccountEdit = createAsyncThunk(
  "tradingAccount/tradingAccountEdit",
  async (data) => {
    const response = await axios.put(
      `${apiUrl}/trading-account/update/${data.id}`,
      data.values,
      {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${data.token}`,
        },
      }
    );
    return response;
  }
);



export const tradingAccountDelete = createAsyncThunk(
  "tradingAccount/tradingAccountDelete",
  async ( data ) => {
    try {
      const response = await axios.delete(`${apiUrl}/trading-account/${id}`, {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${data.token}`,
        },
      });
      return response.data
    } catch (error) {
      throw error
    }
  }
);


export const tradingAccountUpdateFilter = createAsyncThunk(
  "tradingAccount/tradingAccountFilter",
  async (data) => {
    console.log(data)
    const response = await axios.get(`${apiUrl}/trading-account/${data.values}`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${data?.toke}`,
      },
    });
    return response;
  }
);

const tradingAccountSlice = createSlice({
  name: "tradingAccount",
  initialState: {
    data: [],
    payloadHold: [],
    isAddedOrEdited: false,
    isLoading: false
  },
  reducers: {
    addNewData: (state, action) => {
      state.payloadHold = action.payload;
    },
    deleteData: (state, action) => {
      state.data = state.data.filter((item) => item.id !== action.payload.id);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(tradingAccountList.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(tradingAccountList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action?.payload?.data;
      })
      .addCase(tradingAccountList.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(tradingAccountAdd.pending, (state, action) => {
        state.isLoading = true;
        state.isAddedOrEdited = false;
      })
      .addCase(tradingAccountAdd.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAddedOrEdited = true;
        state.data = [...state.data,action?.payload?.data];
      })
      .addCase(tradingAccountAdd.rejected, (state, action) => {
        state.isLoading = false;
        state.isAddedOrEdited = false;
      })
      .addCase(tradingAccountEdit.pending, (state, action) => {
        state.isLoading = true;
        state.isAddedOrEdited = false;
      })
      .addCase(tradingAccountEdit.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAddedOrEdited = true;
        // state.data = action?.payload?.data;
      })
      .addCase(tradingAccountEdit.rejected, (state, action) => {
        state.isLoading = false;
        state.isAddedOrEdited = false;
      })
      .addCase(tradingAccountDelete.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(tradingAccountDelete.fulfilled, (state, action) => {
        state.isLoading = false;
        // Call deleteData reducer to remove the deleted trading account from the state
        state = deleteData(state, action);
      })
      .addCase(tradingAccountDelete.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

export const { addNewData, deleteData } = tradingAccountSlice.actions;

export default tradingAccountSlice.reducer;
