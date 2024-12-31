import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import getBEURL from "../../utils/backendURL";

const baseQuery = fetchBaseQuery({
    baseUrl: `${getBEURL()}/api/orders`,
    credentials: "include",
    prepareHeaders: (headers) => {
        const token = localStorage.getItem('token')
        // console.log(token);
        if(token) {
            headers.set('Authorization', `Bearer ${token}`)
        }
        // console.log(headers.has('Authorization'));
        return headers
    }
})
const orderAPI = createApi({
    reducerPath: "orderAPI",
    baseQuery,
    tagTypes: ["orders"],
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: (newOrder) => ({
                url: '/',
                method: "POST",
                body: newOrder,
            }),
            invalidatesTags: ["orders"]
        }),
        fetchAllOrder: builder.query({
            query: () => '/',
            providesTags: ["orders"],
        })
    })
})
export const {useCreateOrderMutation, useFetchAllOrderQuery} = orderAPI;
export default orderAPI;