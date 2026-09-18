export type ResponseSignUp = {
  status: 201 | 409
}

/*export type DataSignUp = {
  username: string
  email: string
  password: string
  aboutMe?: string
  file?: string
}*/

export type DataSignUp = FormData & {
  get(name: 'username'): string
  get(name: 'email'): string
  get(name: 'password'): string
  get(name: 'aboutMe'): string | null
  get(name: 'file'): File | null
}
