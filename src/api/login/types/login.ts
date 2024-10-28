export interface LoginRequestData {
  username: string
  password: string
  code: string
}

export type LoginCodeResponseData = ApiResponseData<string>

export type LoginResponseData = ApiResponseData<{ token: string }>

export type UserInfoResponseData = ApiResponseData<{
  username: string
  roles: string[]
}>
