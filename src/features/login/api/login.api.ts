import {baseApi} from "@shared/api/baseApi";
import {clearAppError, login} from "@shared/store/slices/appSlice";


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
            }),
           async onQueryStarted(arg, {dispatch,queryFulfilled}):Promise<void> {
                try {

              await queryFulfilled;
                    dispatch(login());
                    dispatch(clearAppError())
                }
                catch (error){}

            }
        })
    }),
});

export const {useSignUpMutation} = loginApi;