import {createSlice} from '@reduxjs/toolkit'

type AppState = {
    isLoggedIn: boolean
    appError: string | null
}

const initialState = {
    isLoggedIn : false,
    appError:null,
} as AppState

export const appSlice = createSlice({
    name: 'appSlice',
    selectors:{
        selectIsLoggedIn:(state)=>state.isLoggedIn,
        selectAppError:(state)=>state.appError,
    },
    initialState,
    reducers: builder=>({
        login: builder.reducer((state)=>{
            state.isLoggedIn=true
        }),
        logout: builder.reducer((state)=>{
            state.isLoggedIn=false
        }),
        setAppError: builder.reducer<{appError:string|null}>((state,action)=>{
            state.appError=action.payload.appError
        }),
        clearAppError: builder.reducer((state)=>{
            state.appError=null
        }),
    })
})

export const { login, logout, setAppError,clearAppError } = appSlice.actions
export const {selectIsLoggedIn,selectAppError} = appSlice.selectors
