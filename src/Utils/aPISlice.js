import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchData = createAsyncThunk('fetchData', async () => {
    const data = await fetch('http://localhost:5000/api/products');
    // console.log('response for redux slice : ', data)
    return data.json();
})

const aPISlice = createSlice({
    name: 'APIData',
    initialState: {
        products: [],
        status: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchData.pending, (state) => {
            state.status = 'loading';
            console.log('Loading Data :')
        })
        builder.addCase(fetchData.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.products = action.payload;
            
        })
        builder.addCase(fetchData.rejected, (action) => {
            console.log('Error', action.payload);
        })
    }

})



export default aPISlice.reducer