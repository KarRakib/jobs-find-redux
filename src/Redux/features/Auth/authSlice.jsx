import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth } from "../../../Firebase/firebase.config";


const initialState = {
    user: {
        email: '',
        role: ''
    },
    isLoading: true,
    isError: false,
    error: '',
}
export const createUser = createAsyncThunk('users/crateUser',
    async ({ email, password }) => {
        console.log(email, password);
        const data = await createUserWithEmailAndPassword(auth, email, password)
        console.log(data.user);
        return data.user.email
    }
)
export const logInUser = createAsyncThunk('users/logInUser',
    async ({ email, password }) => {
        console.log(email, password);
        const data = await signInWithEmailAndPassword(auth, email, password)
        return data.user.email
    }
)
export const getUser = createAsyncThunk('users/getUser',
    async (email) => {
        console.log(email);
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/user/${email}`);
        const data = await res.json();
        console.log(data);
        if (data.status) {
            return data;
        }

        return email
    }
)
export const logInGoogle = createAsyncThunk('users/logInGoogle',
    async () => {
        const googleProvider = new GoogleAuthProvider()
        const data = await signInWithPopup(auth, googleProvider)
        return data.user.email
    }
)
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user.email = "",
            state.user.role = ""

     },
        setUser: (state, { payload }) => {
            state.user.email = payload,
                state.isLoading = false
        },
        toggle: (state) => {
            state.isLoading = false
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createUser.pending, (state) => {
            state.isLoading = true,
                state.isError = false,
                state.error = ''
        }).addCase(createUser.fulfilled, (state, { payload }) => {
            state.isLoading = false,
                state.isError = false,
                state.user.email = payload
        }).addCase(createUser.rejected, (state, action) => {
            state.isLoading = false,
                state.user.email = '',
                state.isError = true,
                state.error = action.error.message
        }).addCase(logInUser.pending, (state) => {
            state.isLoading = true,
                state.isError = false,
                state.error = ''
        }).addCase(logInUser.fulfilled, (state, { payload }) => {
            state.isLoading = false,
                state.isError = false,
                state.user.email = payload
        }).addCase(logInUser.rejected, (state, action) => {
            state.isLoading = false,
                state.user.email = '',
                state.isError = true,
                state.error = action.error.message
        }).addCase(logInGoogle.pending, (state) => {
            state.isLoading = true,
                state.isError = false,
                state.error = ''
        }).addCase(logInGoogle.fulfilled, (state, { payload }) => {
            state.isLoading = false,
                state.isError = false,
                state.user.email = payload
        }).addCase(logInGoogle.rejected, (state, action) => {
            state.isLoading = false,
                state.user.email = '',
                state.isError = true,
                state.error = action.error.message
        }).addCase(getUser.pending, (state) => {
            state.isLoading = true,
                state.isError = false,
                state.error = ''
        }).addCase(getUser.fulfilled, (state, { payload }) => {
            console.log(payload);
            state.isLoading = false,
                state.isError = false;
                if(payload.status){
                    state.user = payload.data
                }else{
                    state.user.email = payload
                }
                state.error = ''
        }).addCase(getUser.rejected, (state, action) => {
            state.isLoading = false,
                state.user.email = '',
                state.isError = true,
                state.error = action.error.message
        })
    }
})
export const { logout, setUser, toggle } = authSlice.actions
export default authSlice.reducer