import apiSlice from "../../api/apiSlice";

 const jobApi = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        jobPost: builder.mutation({
            query:(data)=>({
                url:'/job',
                method:"POST",
                body:data
            }),
            // async onQueryStarted(data,{dispatch,queryFulfilled}){
            //     const res = await queryFulfilled;
            //     dispatch()
            // }
        })
    })
})
export const {useJobPostMutation} = jobApi