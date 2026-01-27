import { createSlice } from '@reduxjs/toolkit';
import { isString, TLoading } from '@types';
import actAuthRegister from './act/actAuthRegister';
import actAuthLogin from './act/actAuthLogin';

interface IAuthSlice{
    Loading:TLoading;
    error:string|null;
    user:{
        id:number;
        email:string;
        firstName:string;
        lastName:string;
    }|null;
    accessToken:string|null;
}
const initialState:IAuthSlice={
    Loading:"idle",
    error:null,
    user:null,
    accessToken:null,
}
const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
        resetUI:(state)=>{
            state.Loading="idle";
            state.error=null;
        },
        authLogout:(state)=>{
            state.user=null;
            state.accessToken=null;
        }
    },
    extraReducers:(builder)=>{
        //register
        builder.addCase(actAuthRegister.pending,(state)=>{
            state.Loading="pending"
            state.error=null
        });
        builder.addCase(actAuthRegister.fulfilled,(state)=>{
            state.Loading="succeeded"
        });
        builder.addCase(actAuthRegister.rejected,(state,action)=>{
            state.Loading="failed";
            if(isString(action.payload)){
                state.error=action.payload
            }
        })
        // login
        builder.addCase(actAuthLogin.pending,(state)=>{
            state.Loading="pending";
            state.error=null;
        })
        builder.addCase(actAuthLogin.fulfilled,(state,action)=>{
            state.Loading="succeeded";
            state.accessToken=action.payload.accessToken;
            state.user=action.payload.user;
        })
        builder.addCase(actAuthLogin.rejected,(state,action)=>{
            state.Loading="failed";
            if(isString(action.payload)){
                state.error=action.payload;
            }
            
        })
    }
})
export const{resetUI,authLogout}=authSlice.actions
export {actAuthRegister,actAuthLogin}
export default authSlice.reducer