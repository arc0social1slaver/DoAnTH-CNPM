// import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query";
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import getBEURL from "../../utils/backendURL";

const baseQuery = fetchBaseQuery({
    baseUrl: `${getBEURL()}/api/categories`,
    credentials: "include",
    prepareHeaders: (headers) => {
        const token = localStorage.getItem('token')
        if(token) {
            headers.set('Authorization', `Bearer ${token}`)
        }
        return headers
    }
})
const catAPI = createApi({
    reducerPath: 'catAPI',
    baseQuery,
    tagTypes: ["cats"],
    endpoints: (builder) => ({
        fetchAllCats: builder.query({
            query: () => "/",
            providesTags: ["cats"]
        }),
        addCat: builder.mutation({
            query: (newCat) => ({
                url: '/create-category',
                method: "POST",
                body: newCat
            }),
            invalidatesTags: ["products"]
        }),
        updateCat: builder.mutation({
            query: ({id, ...newCat}) => ({
                url: `/edit/${id}`,
                method: "PUT",
                body: newCat,
                headers: {
                    'Content-Type': 'application/json',
                }
            }),
            invalidatesTags: ["cats"]
        }),
        deleteCat: builder.mutation({
            query: (id) => ({
                url:  `/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["cats"]
        })
    })
})
export const {useFetchAllCatsQuery, useAddCatMutation, useUpdateCatMutation, useDeleteCatMutation} = catAPI;
export default catAPI;