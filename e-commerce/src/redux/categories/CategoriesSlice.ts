import { createSlice } from "@reduxjs/toolkit";
import actGetCategories from "./act/actGetCategories";
import { TLoading ,Tcategory,isString} from "@types";
interface ICategoriesState{
    records:Tcategory[];
    loading:TLoading;
    error:null|string;
}
const initialState:ICategoriesState ={
    records:[],
    loading:"idle",
    error:null
};
const CategoriesSlice = createSlice({
    name:"categories",
    initialState,
    reducers:{
        categoriesRecordsCleanup:(state)=>{
            state.records=[];
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(actGetCategories.pending ,(state)=>{
            state.loading="pending";
            state.error=null
        });
        builder.addCase(actGetCategories.fulfilled,(state, action)=>{
            state.loading="succeeded";
            state.records = action.payload;
        });
        builder.addCase(actGetCategories.rejected,(state,action)=>{
            state.loading="failed";
            if(isString(action.payload)){
                state.error=action.payload
            }  
        })
    }
});

export default CategoriesSlice.reducer
export const{categoriesRecordsCleanup}=CategoriesSlice.actions
export {actGetCategories}