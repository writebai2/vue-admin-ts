import { type MockMethod } from "vite-plugin-mock"
import { LoginBody } from "./type"

// 用户信息数据
function createUserList() {
  return [
    {
      id: 1,
      username: "admin",
      password: "admin123",
      desc: "管理员",
      token: "Admin Token",
    },
    {
      id: 2,
      username: "system",
      password: "admin123",
      desc: "成员",
      token: "System Token",
    },
  ]
}

export default (): MockMethod[] => [
  // 用户登录接口
  {
    url: "/api/user/login",
    method: "post",
    response: ({ body }: { body: LoginBody }) => {
      const { username, password } = body
      const checkUser = createUserList().find(
        (item) => item.username === username && item.password === password
      )
      //   错误返回
      if (!checkUser) {
        return {
          code: 201,
          data: "",
          message: "账号或者密码不正确",
        } as ApiResponseData<string>
      }
      //   正确返回
      const { token } = checkUser
      return {
        code: 200,
        data: {
          token: token,
        },
        message: "",
      } as ApiResponseData<{ token: string }>
    },
  },
]
