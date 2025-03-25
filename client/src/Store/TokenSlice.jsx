import { createSlice } from '@reduxjs/toolkit'
const initVal = {
    token: "hh"
}

const tokenSlice = createSlice({
    name: 'token',
    initialState: initVal,
    reducers: {
        setValue: (state, action) => {
            state.value = action.payload; 
            console.log(state.value);
          },
    }
})
export const {setValue} = tokenSlice.actions
export default tokenSlice.reducer