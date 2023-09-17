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
        }),
        jobApply: builder.mutation({
            query:(data)=>({
                url:'/apply',
                method:"PATCH",
                body:data
            })
        }),
        getJobs:builder.query({
            query:()=>({
                url:'/jobs'
            })
        }),
        getJobById:builder.query({
            query:(id)=>({
                url:`/job/${id}`
            })
        }),
        appliedJob:builder.query({
            query:(email)=>({
                url:`/applied-jobs/${email}`
            })
        }),
        qustion: builder.mutation({
            query:(data)=>({
                
                url:'/query',
                method:"PATCH",
                body:data
            })
        }),
    })
})
export const {useJobPostMutation, useGetJobByIdQuery, useGetJobsQuery,useJobApplyMutation,useAppliedJobQuery, useQustionMutation} = jobApi