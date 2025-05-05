import { createSlice } from '@reduxjs/toolkit'
const initVal = {
    user: null
}

const userSlice = createSlice({
    name: 'user',
    initialState: initVal,
    reducers: {
        setValue: (state, action) => {
            state.user = action.payload; 
            
          },
          
    }
})
export const {setValue} = userSlice.actions
export default userSlice.reducer