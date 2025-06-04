import {baseApi} from "@shared/api/baseApi";


type ResponseType = {
    status:201 | 409,
    token?:string,
} ;

type DataType = {
    username: string
    email: string
    password: string
}

export const loginApi = baseApi.injectEndpoints({
    endpoints:build => ({
        signUp:build.mutation<ResponseType,DataType>({
            query:(data) => ({
                url:'/v1/signup',
                method:'POST',
                body:data
            })
        })
    }),
});

export const {useSignUpMutation} = loginApi;