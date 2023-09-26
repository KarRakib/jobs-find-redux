import apiSlice from "../../api/apiSlice";

const jobApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        jobPost: builder.mutation({
            query: (data) => ({
                url: '/job',
                method: "POST",
                body: data
            }),
            invalidatesTags: ['Post']
            // async onQueryStarted(data,{dispatch,queryFulfilled}){
            //     const res = await queryFulfilled;
            //     dispatch()
            // }
        }),
        jobApply: builder.mutation({
            query: (data) => ({
                url: '/apply',
                method: "PATCH",
                body: data
            })
        }),
        getJobs: builder.query({
            query: () => ({
                url: '/jobs'
            })
        }),
        getJobById: builder.query({
            query: (id) => ({
                url: `/job/${id}`
            })
        }),
        appliedJob: builder.query({
            query: (email) => ({
                url: `/applied-jobs/${email}`
            })
        }),
        getMyJobs: builder.query({
            query: (email) => ({
                url: `/my-jobs/${email}`
            })
        }),
        qustion: builder.mutation({
            query: (data) => ({
                url: '/query',
                method: "PATCH",
                body: data
            })
        }),
        reply: builder.mutation({
            query: (data) => ({
                url: '/reply',
                method: "PATCH",
                body: data
            })

        }),
        jobClose: builder.mutation({
            query: ({id,...data}) => ({
                url: `/job-close/${id}`,
                method: "PATCH",
                body: data
            })

        }),
    })
})
export const { useJobPostMutation, useGetJobByIdQuery, useGetJobsQuery, useJobCloseMutation, useJobApplyMutation, useAppliedJobQuery, useQustionMutation,useGetMyJobsQuery, useReplyMutation } = jobApi