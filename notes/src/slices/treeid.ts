import { createSlice,PayloadAction } from "@reduxjs/toolkit"

interface TreeIdState {
    treeid: number;
  }

export const treeidSlice = createSlice({
    name: "TreeId",
    initialState: {
        treeid: 0,
        selected: {},
    },
    reducers: {
        getTreeid:(state) =>
        {
            return state;
        },
        setTreeid:(state,action: PayloadAction<number>) => {
            state.treeid = action.payload;
        },
        increaseid: (state) =>
        {
            state.treeid = state.treeid + 1
            setTreeid(state.treeid)
        }
    }
});

export const {getTreeid, setTreeid, increaseid} = treeidSlice.actions;

export default treeidSlice.reducer;