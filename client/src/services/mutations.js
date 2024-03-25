import { apiSlice } from "./app/apiSlice";

const mutationSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    bookBus: builder.mutation({
      query: (bookingData) => ({
        url: "/trip/book",
        method: "POST",
        body: bookingData,
      }),
    }),
    bookTicket: builder.mutation({
      query: (bookingData) => ({
        url: "/ticket/create",
        method: "POST",
        body: bookingData,
      }),
    }),
    addBus: builder.mutation({
      query: (bookingData) => ({
        url: "/bus/create",
        method: "POST",
        body: bookingData,
      }),
    }),
  }),
});

export const { useAddBusMutation,useBookBusMutation, useBookTicketMutation } = mutationSlice;
