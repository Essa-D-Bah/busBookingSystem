import { apiSlice } from "../app/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (loginData) => ({
        url: "/auth/login/",
        method: "POST",
        body: loginData,
      }),
    }),
    register:builder.mutation({
        query:(registerData)=>({
          url:"/auth/register",
          method:"POST",
          body:registerData
        })
    })
  }),
});

export const { useLoginMutation, useRegisterMutation} = authApiSlice;
