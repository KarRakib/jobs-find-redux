import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Firebase/firebase.config";


const initialState ={
    email: '',
    role: '',
    isLoading:true,
    isError: false,
    error: '',
}
export const createUser = createAsyncThunk('users/crateUser',
        async({email, password})=>{
            console.log(email, password);
            const data = await createUserWithEmailAndPassword(auth, email, password)
           return data.user.email
        }
)
export const logInUser = createAsyncThunk('users/logInUser',
        async({email, password})=>{
            console.log(email, password);
            const data = await signInWithEmailAndPassword(auth, email, password)
           return data.user.email
        }
)
const  authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        logout:(state)=>{
            state.email = ""
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(createUser.pending,(state)=>{
            state.isLoading= true,
            state.isError= false,
            state.error= ''
        }).addCase(createUser.fulfilled,(state,{payload})=>{
            state.isLoading= false,
            state.isError= false,
            state.email= payload
        }).addCase(createUser.rejected,(state,action)=>{
            state.isLoading= false,
            state.email= '',
            state.isError= true,
            state.error= action.error.message
        }).addCase(logInUser.pending,(state)=>{
            state.isLoading= true,
            state.isError= false,
            state.error= ''
        }).addCase(logInUser.fulfilled,(state,{payload})=>{
            state.isLoading= false,
            state.isError= false,
            state.email= payload
        }).addCase(logInUser.rejected,(state,action)=>{
            state.isLoading= false,
            state.email= '',
            state.isError= true,
            state.error= action.error.message
        })
    }
})
export const  {logout} = authSlice.actions
export default authSlice.reducer