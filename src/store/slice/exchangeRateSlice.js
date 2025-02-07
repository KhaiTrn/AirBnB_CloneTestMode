import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchExchangeRates = createAsyncThunk(
  "exchangeRate/fetchRates",
  async () => {
    const response = await axios.get(
      "https://api.exchangerate-api.com/v4/latest/USD"
    );
    return response.data.rates;
  }
);

const currencySymbols = {
  USD: "$",
  VND: "₫",
  JPY: "¥",
  THB: "฿",
  KRW: "₩",
  SGD: "$",
};

const exchangeRateSlice = createSlice({
  name: "exchangeRate",
  initialState: {
    rates: {},
    status: "idle",
    error: null,
    currentCurrency: "VND",
    currentSymbol: "₫",
  },
  reducers: {
    setCurrency: (state, action) => {
      const currency = action.payload;
      state.currentCurrency = currency;
      state.currentSymbol = currencySymbols[currency] || "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchExchangeRates.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchExchangeRates.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.rates = action.payload;
      })
      .addCase(fetchExchangeRates.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setCurrency } = exchangeRateSlice.actions;
export default exchangeRateSlice.reducer;
