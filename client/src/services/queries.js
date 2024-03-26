import { apiSlice } from "./app/apiSlice";

const queryslice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBuses: builder.query({
      query: () => "/bus/all",
      keepUnusedDataFor: 5,
      // 84ab6ba2-cc15-4d45-8c51-20a153ff12aa
    }),

    getBookingBus: builder.query({
      query: () => "/bus/booking",
      keepUnusedDataFor: 5,
      // 84ab6ba2-cc15-4d45-8c51-20a153ff12aa
    }),

    getBus: builder.query({
      query: (id) => `bus/${id}`,
      keepUnusedDataFor: 5,
    }),

    getCompanyBus: builder.query({
      query: (id) => `bus/company/${id}`,
      keepUnusedDataFor: 5,
    }),

    getCompany: builder.query({
      query: () => "/Coverage/",
      keepUnusedDataFor: 5,
    }),
    getTickets: builder.query({
      query: () => "/Contract/",
      keepUnusedDataFor: 5,
    }),
    getTicketForClient: builder.query({
      query: (id) => `ticket/client/${id}`,
      keepUnusedDataFor: 5,
    }),
    getCompanies: builder.query({
      query: () => `/companies/all`,
      keepUnusedDataFor: 5,
    }),
    getCompanyTickets: builder.query({
      query: (id) => `ticket/company/${id}`,
      keepUnusedDataFor: 5,
    }),
    getCompanyTrips: builder.query({
      query: (id) => `trip/company/${id}`,
      keepUnusedDataFor: 5,
    }),
    getCompanyAnalytics: builder.query({
      query: (id) => `analytics/company/${id}`,
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useGetCompanyBusQuery,
  useGetTicketForClientQuery,
  useGetCompaniesQuery,
  useGetCompanyTicketsQuery,
  useGetCompanyTripsQuery,
  useGetCompanyAnalyticsQuery,
} = queryslice;
