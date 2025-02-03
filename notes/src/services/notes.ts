import { createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"

export  const notesApi = createApi({
    reducerPath: `notes`,
    baseQuery: fetchBaseQuery({

    }),
    endpoints: (builder) => ({
         getMainNodes: builder.query({
            query: () => '/api/GetAllMainNodes'
        }),
        getNode: builder.mutation({
            query: (nodeId) => ({
                url: `/api/GetNode/` + nodeId
            })
        }),
        getNote: builder.mutation({
            query: (nodeId) => ({
                url: `/api/GetNote/` + nodeId
            })
        }),
        searchNote: builder.mutation({
            query: (searchData) => ({
                url:`/search`,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(searchData),

            })
        })

    })
})
export const { useSearchNoteMutation,useGetMainNodesQuery, useGetNodeMutation, useGetNoteMutation} = notesApi;