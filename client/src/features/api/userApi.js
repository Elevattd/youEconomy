import { setCredentials } from "../slices/authSlice.js";
import { apiSlice } from "./apiSlice.js";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (id) => `/user/${id}`,
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            setCredentials({
              user: {
                id: data.id,
                name: data.name,
                balance: data.balance,
              },
            })
          );
        } catch (error) {
          console.log("Error fetching user");
        }
      },
    }),

    getCurrent: builder.query({
      query: (id) => {
        // if (!id) return "";
        return { url: `/transaction/current/${id}` };
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            setCredentials({
              user: { current_transactions: data },
            })
          );
        } catch (error) {
          console.log("Error fetching user");
        }
      },
    }),

    getAllTransactions: builder.mutation({
      query: ({ id, type }) => {
        return {
          url: `/transaction/history/${id}?type=${type}`,
        };
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            setCredentials({
              user: {
                all_transactions: data,
              },
            })
          );
        } catch (error) {
          console.log("error fetching transaction history");
        }
      },
    }),

    deleteTransaction: builder.mutation({
      query: ({ id, userId }) => {
        return {
          url: `/transaction/delete/${userId}`,
          method: "DELETE",
          body: { id },
        };
      },
    }),

    createTransaction: builder.mutation({
      query: ({ userId, data }) => {
        return {
          url: `/transaction/post/${userId}`,
          method: "POST",
          body: { ...data },
        };
      },
    }),

    updateTransaction: builder.mutation({
      query: ({ transaction, inputData }) => {
        return {
          url: `/transaction/update/${transaction}`,
          method: "PUT",
          body: { ...inputData },
        };
      },
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetCurrentQuery,
  useCreateTransactionMutation,
  useGetAllTransactionsMutation,
  useDeleteTransactionMutation,
  useUpdateTransactionMutation,
} = userApi;
