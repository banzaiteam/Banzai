export type ResponseSignUp = {
    status:201 | 409,
    token?:string,
} ;

export type DataSignUp = {
    username: string
    email: string
    password: string
}