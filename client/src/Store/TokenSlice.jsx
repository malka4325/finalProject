import { createSlice } from '@reduxjs/toolkit'
const initVal = {
    token: null
}

const tokenSlice = createSlice({
    name: 'token',
    initialState: initVal,
    reducers: {
        setValue: (state, action) => {
            state.token = action.payload; 
            
          },
    }
})
export const {setValue} = tokenSlice.actions
export default tokenSlice.reducer