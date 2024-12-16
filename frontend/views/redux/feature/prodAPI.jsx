// import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query";
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import getBEURL from "../../utils/backendURL";

const baseQuery = fetchBaseQuery({
    baseUrl: `${getBEURL()}/api/products`,
    credentials: "include",
    // prepareHeaders: (headers) => {
    //     const token = localStorage.getItem('token')
    //     if(token) {
    //         headers.set('Authorization', `Bearer ${token}`)
    //     }
    //     return headers
    // }
})
const prodAPI = createApi({
    reducerPath: 'prodAPI',
    baseQuery,
    tagTypes: ["products"],
    endpoints: (builder) => ({
        fetchAllProds: builder.query({
            query: () => "/",
            providesTags: ["products"]
        }),
        fetchProdByID: builder.query({
            query: (id) => `/${id}`,
            providesTags: (result, err, id) => [{type: "products", id}]
        }),
        addProd: builder.mutation({
            query: (newProd) => ({
                url: '/create-product',
                method: "POST",
                body: newProd
            }),
            invalidatesTags: ["products"]
        }),
        updateProd: builder.mutation({
            query: ({id, ...newProd}) => ({
                url: `/edit/${id}`,
                method: "PUT",
                body: newProd,
                headers: {
                    'Content-Type': 'application/json',
                }
            }),
            invalidatesTags: ["products"]
        }),
        deleteProd: builder.mutation({
            query: (id) => ({
                url:  `/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["products"]
        })
    })
})
export const {useFetchAllProdsQuery} = prodAPI;
export default prodAPI;