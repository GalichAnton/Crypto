import { configureStore } from "@reduxjs/toolkit";
import { Api } from "../services/API";
import { newsApi } from "../services/NewsApi";

export default configureStore({
  reducer: {
    [Api.reducerPath]: Api.reducer,
    [newsApi.reducerPath]: newsApi.reducer,
  },
})