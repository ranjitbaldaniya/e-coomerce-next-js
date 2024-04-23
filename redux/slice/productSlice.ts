// src/features/productSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { AppThunk } from "../store";

interface Product {
  bestSelling: boolean;
  categories: [string];
  color: string;
  comparePrice: number;
  createdAt: Date;
  description: string;
  image: string;
  price: number;
  review: number;
  reviewCount: number;
  title: string;
  updatedAt: Date;
  __v: number;
  _id: string;
}

interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    getProductStart(state) {
      state.loading = true;
      state.error = null;
    },
    getProductSuccess(state, action: PayloadAction<Product[]>) {
      state.loading = false;
      state.products = action.payload;
    },
    getProductFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { getProductStart, getProductSuccess, getProductFailure } =
  productSlice.actions;

export default productSlice.reducer;

// Async action creator to fetch product data
export const fetchProductData =
  (): AppThunk =>
    async (
      dispatch: (arg0: {
        payload: string | Product[] | undefined;
        type:
        | "product/getProductStart"
        | "product/getProductSuccess"
        | "product/getProductFailure";
      }) => void
    ) => {
      dispatch(getProductStart());
      try {
        const response = await axios.get("http://localhost:3003/api/");
        dispatch(getProductSuccess(response.data));
      } catch (error: any) {
        dispatch(getProductFailure(error.message));
      }
    };


















//   import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// interface Product {
//   bestSelling: boolean;
//   categories: string[];
//   color: string;
//   comparePrice: number;
//   createdAt: Date;
//   description: string;
//   image: string;
//   price: number;
//   review: number;
//   reviewCount: number;
//   title: string;
//   updatedAt: Date;
//   __v: number;
//   _id: string;
// }

// interface ProductState {
//   products: Product[];
//   loading: boolean;
//   error: string | null;
// }

// const initialState: ProductState = {
//   products: [],
//   loading: false,
//   error: null,
// };

// // Define an API service using createApi
// export const productApi = createApi({
//   reducerPath: "productApi",
//   baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001" }),
//   endpoints: (builder) => ({
//     fetchProducts: builder.query<Product[], void>({
//       query: () => "/getall",
//     }),
//   }),
// });

// // Define a slice for managing product state
// const productSlice = createSlice({
//   name: "product",
//   initialState,
//   reducers: {
//     // Reducers for managing product state...
//   },
//   extraReducers: (builder) => {
//     // Define extra reducers for handling API responses
//     builder.addCase(productApi.endpoints.fetchProducts.fulfilled, (state, action) => {
//       state.loading = false;
//       state.products = action.payload;
//     });
//     builder.addCase(productApi.endpoints.fetchProducts.pending, (state) => {
//       state.loading = true;
//       state.error = null;
//     });
//     builder.addCase(productApi.endpoints.fetchProducts.rejected, (state, action) => {
//       state.loading = false;
//       state.error = action.error.message ?? "Failed to fetch products";
//     });
//   },
// });

// // Export action creators and reducer
// export const { getProductStart, getProductSuccess, getProductFailure } = productSlice.actions;
// export default productSlice.reducer;

// // Export hook for usage in components
// export const { useFetchProductsQuery } = productApi;



