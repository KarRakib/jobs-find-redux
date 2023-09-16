import { createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const apiSlice = createApi({
   reducerPath: 'crateapi',
    baseQuery:fetchBaseQuery({baseUrl:import.meta.env.VITE_SERVER_URL}),
    endpoints:(builder)=>({ })
})
export default apiSlice