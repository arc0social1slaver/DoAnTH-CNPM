// import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query";
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import getBEURL from "../../utils/backendURL";

const baseQuery = fetchBaseQuery({
    baseUrl: `${getBEURL()}/api/products`,
    credentials: "include",
    prepareHeaders: (headers) => {
        const token = localStorage.getItem('token')
        if(token) {
            headers.set('Authorization', `Bearer ${token}`)
        }
        return headers
    }
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
    })
})
export const {useFetchAllProdsQuery} = prodAPI;
export default prodAPI;