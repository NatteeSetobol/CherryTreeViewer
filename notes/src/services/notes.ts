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
        })

    })
})
export const { useGetMainNodesQuery, useGetNodeMutation, useGetNoteMutation} = notesApi;