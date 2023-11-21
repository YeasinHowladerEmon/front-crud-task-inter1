import { IUser } from "../../../interface/interface";
import { api } from "../../api/apiSlice";

export interface GetUserResponse {
  data: IUser[];
}
export const UserApi = api.injectEndpoints({
  endpoints: (builder) => ({
    singleDetails: builder.query({
      query: (id) => `/users/${id}`
    }),
    getAllUsers: builder.query<GetUserResponse, {page?:number| undefined}>({
      query: ({page}) => `/users?page=${page}`,
      providesTags: ["user"]
    }),
    getSearchUser: builder.query<GetUserResponse, string>({
      query: (query) => `/users?searchTerm=${query}`
    }),
    getPagePaginationUser: builder.query<GetUserResponse, number>({
      query: (query) => `/users?page=${query}`
    }),
    getFiltersUser: builder.query<
      GetUserResponse,
      {
        domain?: string | undefined;
        gender?: string | undefined;
        available?: string | undefined;
        page?: number | undefined;
      }
    >({
      query: ({ domain, gender, available, page }) => {
        if (domain && gender && available) {
          return `/users?domain=${domain}&gender=${gender}&available=${available}&page=${page}`;
        } else if (domain && gender) {
          return `/users?domain=${domain}&gender=${gender}&page=${page}`;
        } else if (domain && available) {
          return `/users?domain=${domain}&available=${available}&page=${page}`;
        } else if (gender && available) {
          return `/users?gender=${gender}&available=${available}&page=${page}`;
        } else if (domain) {
          return `/users?domain=${domain}&page=${page}`;
        } else if (gender) {
          return `/users?gender=${gender}&page=${page}`;
        }  else {
          return `/users?available=${available}&page=${page}`;
        }
      }
    }),
    userUpdate: builder.mutation({
      query: ({ id, data }) => ({
        url: `/users/${id}`,
        method: "PATCH",
        body: data
      }),
      invalidatesTags: ["user"]
    }),
    userDelete: builder.mutation({
      query: ({ id }) => ({
        url: `/users/${id}`,
        method: "DELETE"
      })
    }),
    createUser: builder.mutation({
      query: ({ data }) => ({
        url: `/users/create-user`,
        method: "POST",
        body: data
      })
    })
  })
});

export const {
  useGetAllUsersQuery,
  useSingleDetailsQuery,
  useGetPagePaginationUserQuery,
  useGetSearchUserQuery,
  useGetFiltersUserQuery,
  useUserUpdateMutation,
  useUserDeleteMutation,
  useCreateUserMutation
} = UserApi;
