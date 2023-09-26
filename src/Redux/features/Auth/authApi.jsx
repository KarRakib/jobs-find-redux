
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
            async onQueryStarted(data, { dispatch, queryFulfilled }) {
                try {
                    const res = await queryFulfilled;
                    dispatch(getUser(data.email))
                } catch (error) {
                    console.log(error);
                }
            }

        }),
        
        getUserById: builder.query({
            query: (id) => ({
                url: `/user?id=${id}`,
            })
        }),
        messsageSet:builder.mutation({
            query:(data)=>({
                url:'/message',
                method:"POST",
                body: data
            })
        }),
        getMessageById : builder.query({
            query:(id)=>({
                url:`/message?id=${id}`,
            })
        }),
        getSigleMessageById : builder.query({
            query:(id)=>({
                url:`/one-message?id=${id}`,
            })
        }),
        messageUpdate: builder.mutation({
            query: ({ id, ...data }) => ({
              url: `/one-message?id=${id}`,
              method: 'PATCH',
              body: data
            })
          }),
          chatQustion: builder.mutation({
            query: (data) => ({
                url: '/message-emp',
                method: "PATCH",
                body: data
            })
        }),
          chatAnswer: builder.mutation({
            query: (data) => ({
                url: '/message-can',
                method: "PATCH",
                body: data
            })
        }),
          
    })
})
export const { useUserSaveMutation, useGetSigleMessageByIdQuery, useChatAnswerMutation,useGetUserByIdQuery, useChatQustionMutation,useMesssageSetMutation, useGetMessageByIdQuery, useMessageUpdateMutation } = authApi