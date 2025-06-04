import {createSlice} from '@reduxjs/toolkit'

type AppState = {
    isLoggedIn: boolean
}

const initialState = { isLoggedIn : false } as AppState

export const appSlice = createSlice({
    name: 'appSlice',
    selectors:{
        selectIsLoggedIn:(state)=>state.isLoggedIn
    },
    initialState,
    reducers: builder=>({
        login: builder.reducer((state)=>{
            state.isLoggedIn=true
        }),
        logout: builder.reducer((state)=>{
            state.isLoggedIn=false
        })
    })
})

export const { login, logout } = appSlice.actions
export const {selectIsLoggedIn} = appSlice.selectors
