
import apiSlice from "../../api/apiSlice";
import { getUser } from "./authSlice";

const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        userSave: builder.mutation({
            query: (data) => ({
                url: '/user',
                method: "POST",
                body: data
            }),
           async onQueryStarted(data,{dispatch,queryFulfilled}){
            try {
                const res = await queryFulfilled;
                dispatch(getUser(data.email))
            } catch (error) {
                console.log(error);
            }
           }
       
        })
    })
})
export const { useUserSaveMutation } = authApi