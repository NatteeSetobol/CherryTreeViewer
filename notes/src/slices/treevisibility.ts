import { createSlice, PayloadAction} from '@reduxjs/toolkit'

interface TreeVisibility {
    value: boolean;
}

const initialState: TreeVisibility= {
    value: false,
}

const TreeVisibilitySlice = createSlice({
    name: 'boolean',
    initialState,
    reducers: {
        setBoolean: (state,action: PayloadAction<boolean>) => {
            state.value = action.payload;
        },
        toggleBoolean: (state) => {
            state.value = !state.value;
        },
    }
})

export const { setBoolean, toggleBoolean} = TreeVisibilitySlice.actions;

export default TreeVisibilitySlice.reducer;