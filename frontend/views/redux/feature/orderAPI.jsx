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
        }),
        fetchAllHistory: builder.query({
            query: (id) => `/purchase/${id}`,
            providesTags: ["orders"],
        }),
        fetchHistoryByStat: builder.query({
            query: ({id, stat}) => `/purchase/${id}/${stat}`,
            providesTags: ["orders"],
        }),
        fetchMyStore: builder.query({
            query: (id) => `/my-store/${id}`,
            providesTags: ["orders"],
        }),
        fetchMyStoreByStat: builder.query({
            query: ({id, stat}) => `/my-store/${id}/${stat}`,
            providesTags: ["orders"],
        }),
        updateOrder: builder.mutation({
            query: ({id, ...newOrder}) => ({
                url: `/edit/${id}`,
                method: "PUT",
                body: newOrder,
            }),
            invalidatesTags: ["orders"],
        })
    })
})
export const {useCreateOrderMutation,
    useFetchAllOrderQuery,
    useFetchAllHistoryQuery,
    useLazyFetchHistoryByStatQuery,
    useFetchMyStoreQuery,
    useLazyFetchMyStoreByStatQuery,
    useUpdateOrderMutation,
} = orderAPI;
export default orderAPI;