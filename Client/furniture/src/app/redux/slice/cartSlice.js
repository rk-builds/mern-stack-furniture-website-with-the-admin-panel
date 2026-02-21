import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie"

// import { useDispatch } from "react-redux";
export const fetchCartData = createAsyncThunk( //API Fetch
  'cart/fetchCartData',
  async (_, { rejectWithValue }) => {
    try {
      const token = Cookies.get('TOKEN');
      if (!token) throw new Error('No auth token found in cookies');

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_APIBASEURL}cart/cart-data`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // console.log('Cart Data Response:', response.data.data);
      return {
        cartItems: response.data.data ?? [],
        imgPath: response.data.imgPath,
      };


    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Error fetching cart'
      );
    }
  }
);


export let cartSlice = createSlice(
  {
    name: "cart",
    initialState: {
      imgPath: "",
      cartItems: [],
      discount: 0,
      loading: false,
      error: null,
    },
    reducers: {
      // addToCart: function (state, action) {
      //   let { payload } = action;
      //   state.cartItems.push(payload);
      // }
      // ,
      // removeFromCart: function (state, action) {
      //   let { payload } = action;
      // state.cartItems= state.cartItems.filter(item=>item.id !== payload.id);
      // }

      updateQtyLocal: (state, action) => {
        const { cartId, productQty } = action.payload;

        const item = state.cartItems.find(
          (i) => i._id === cartId
        );

        if (item) {
          item.productQty = productQty;
        }
      }
    },

    setDiscount: (state, action) => {
      state.discount = action.payload;
    },

    clearDiscount: (state) => {
      state.discount = 0;
    },
  
    
    extraReducers: (builder) => {
  builder
    .addCase(fetchCartData.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchCartData.fulfilled, (state, action) => {
      state.loading = false;
      state.cartItems = action.payload.cartItems;
      state.imgPath = action.payload.imgPath;
    })
    .addCase(fetchCartData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
},
  }
)

export default cartSlice.reducer;
export let { addToCart, removeFromCart, updateQtyLocal,setDiscount,clearDiscount} = cartSlice.actions;