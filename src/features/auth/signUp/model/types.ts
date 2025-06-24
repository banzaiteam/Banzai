export type ResponseSignUp = {
  status: 201 | 409
}

export type DataSignUp = {
  username: string
  email: string
  password: string
  aboutMe?: string
  file?: string
}
