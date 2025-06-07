import {baseApi} from "@shared/api/baseApi";
import {clearAppError, login} from "@shared/store/slices/appSlice";
import type {DataSignUp, ResponseSignUp} from "@features/login/model/types";


export const loginApi = baseApi.injectEndpoints({
    endpoints:build => ({
        signUp:build.mutation<ResponseSignUp,DataSignUp>({
            query:(data) => ({
                url:'/signup',
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