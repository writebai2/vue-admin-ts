/***
 * @mock模拟数据
 */
const userinfo = [
  {
    userId: 2,
    avatar:
      "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
    username: "admin",
    password: "12345678",
    desc: "系统管理员",
    roles: ["系统管理员"],
    buttons: ["cuser.detail", "cuser.user"],
    routes: [
      "document",
      "pagination",
      "edit",
      "home",
      "components",
      "menu-one",
      "moremenu",
      "menu-two",
      "menu-three",
      "menu-three-1",
      "menu-three-2",
      "canvas",
      "news",
      "newsList",
      "newsType",
      "databoard",
      "data-select",
    ],
    token:
      "eyJhbGciOiJIUzUxMiIsInppcCI6IkdaSVAifQ.H4sIAAAAAAAAAKtWKi5NUrJSCjAK0A0Ndg1S0lFKrShQsjI0N7I0MjUEUjpKpcWpRZ4pQDEI0y8xNxWoIzElNzNPqRYAHrPX-UEAAAA.u8syR60yvQ_F2-oClEs9xW31Oo1GspbLq-XHOt6xm9UE5vuArmQ63gAiZ8VaQoOtF2snegMe2BlugnoEYDzLeg",
  },
  {
    userId: 2,
    avatar:
      "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
    username: "user",
    password: "12345678",
    desc: "用户",
    roles: ["用户"],
    buttons: ["cuser.detail", "cuser.user"],
    routes: ["document", "home", "news", "newsList", "components", "edit"],
    token: "user_Token",
  },
]

const treeTable = [
  {
    label: "vipon",
    id: 1,
    "children|5": [
      {
        label: "@cname",
        "id|+1": 10,
      },
    ],
  },
  {
    label: "抓客",
    id: 2,
    children: [
      {
        label: "前端",
        id: 3,
        "children|5": [
          {
            label: "@cname",
            "id|+1": 20,
          },
        ],
      },
      {
        label: "后端",
        id: 4,
        "children|5": [
          {
            label: "@cname",
            "id|+1": 30,
          },
        ],
      },
    ],
  },
  {
    label: "运营",
    id: 5,
    children: [
      {
        label: "市场运营",
        id: 6,
        "children|5": [
          {
            label: "@cname",
            "id|+1": 40,
          },
        ],
      },
      {
        label: "互联网营销",
        id: 7,
        "children|5": [
          {
            label: "@cname",
            "id|+1": 50,
          },
        ],
      },
    ],
  },
]

const tableData = [
  {
    id: 1,
    date: "2018-07-24",
    sales: 23.34,
    sale: 137597.76,
    const: 102203.71,
    profit: 35394.05,
  },
  {
    id: 2,
    date: "2018-07-24",
    sales: 23.34,
    sale: 137597.76,
    const: 102203.71,
    profit: 35394.05,
  },
  {
    id: 3,
    date: "2018-07-24",
    sales: 23.34,
    sale: 137597.76,
    const: 102203.71,
    profit: 35394.05,
  },
  {
    id: 4,
    date: "2018-07-24",
    sales: 23.34,
    sale: 137597.76,
    const: 102203.71,
    profit: 35394.05,
  },
  {
    id: 5,
    date: "2018-07-24",
    sales: 23.34,
    sale: 137597.76,
    const: 102203.71,
    profit: 35394.05,
  },
  {
    id: 6,
    date: "2018-07-24",
    sales: 23.34,
    sale: 137597.76,
    const: 102203.71,
    profit: 35394.05,
  },
  {
    id: 7,
    date: "2018-07-24",
    sales: 23.34,
    sale: 137597.76,
    const: 102203.71,
    profit: 35394.05,
  },
  {
    id: 8,
    date: "2018-07-24",
    sales: 23.34,
    sale: 137597.76,
    const: 102203.71,
    profit: 35394.05,
  },
  {
    id: 9,
    date: "2018-07-24",
    sales: 23.34,
    sale: 137597.76,
    const: 102203.71,
    profit: 35394.05,
  },
  {
    id: 10,
    date: "2018-07-24",
    sales: 23.34,
    sale: 137597.76,
    const: 102203.71,
    profit: 35394.05,
  },
  {
    id: 11,
    date: "2018-07-24",
    sales: 23.34,
    sale: 137597.76,
    const: 102203.71,
    profit: 35394.05,
  },
  {
    id: 12,
    date: "2018-07-24",
    sales: 23.34,
    sale: 137597.76,
    const: 102203.71,
    profit: 35394.05,
  },
]

const tableHeader = [
  { label: "", width: "", prop: "id" },
  { label: "日期", width: "", prop: "date" },
  { label: "销售量", width: "", prop: "sales" },
  { label: "销售额", width: "", prop: "sale" },
  { label: "成本", width: "", prop: "const" },
  { label: "利润", width: "", prop: "profit" },
]

export default [
  /***
   * @用户登录接口
   */
  {
    url: "/api/login",
    method: "POST",
    response: ({ body }: any) => {
      //获取请求体携带过来的用户名与密码
      const { username, password } = body

      //调用获取用户信息函数,用于判断是否有此用户
      const checkUser = userinfo.find(
        (item) => item.username === username && item.password === password
      )

      //没有用户返回失败信息
      if (!checkUser) {
        return { code: 201, message: "账号或者密码不正确", data: {} }
      }
      //如果有返回成功信息
      const { token } = checkUser
      return { code: 200, data: { token }, message: "登录成功！" }
    },
  },
  /***
   * @用户信息接口
   */
  {
    url: "/api/user",
    method: "POST",
    response: ({ body }: any) => {
      // 获取请求头携带token
      const token = body["token"]

      //查看用户信息是否包含有次token用户
      const userInfo = userinfo.find((item) => item.token === token)
      //没有返回失败的信息
      if (!userInfo) {
        return { code: 201, data: { message: "获取用户信息失败" } }
      }
      //如果有返回成功信息
      return {
        code: 200,
        message: "获取成功",
        data: userInfo,
      }
    },
  },
  /***
   * @数据看板
   */
  {
    url: "/api/table/tree",
    method: "POST",
    response: ({ body }: any) => {
      const token = body["token"]

      const userInfo = userinfo.find((item) => item.token === token)
      //没有返回失败的信息
      if (!userInfo) {
        return { code: 201, data: { message: "token错误" } }
      }

      return {
        code: 200,
        message: "获取成功",
        data: treeTable,
      }
    },
  },
  /***
   * @数据
   */
  {
    url: "/api/table/data",
    method: "POST",
    response: ({ body }: any) => {
      const token = body["token"]

      const userInfo = userinfo.find((item) => item.token === token)
      //没有返回失败的信息
      if (!userInfo) {
        return { code: 201, data: { message: "token错误" } }
      }

      return {
        code: 200,
        message: "获取成功",
        data: {
          header: tableHeader,
          data: tableData,
        },
      }
    },
  },
]

/***
 * //用户信息数据
const userinfo_mock = (response: any) => {
  // 获取请求头携带token
  const token = response.body
  //查看用户信息是否包含有次token用户
  const userInfo = userinfo.find((item) => item.token === token)
  //没有返回失败的信息
  if (!userInfo) {
    return { code: 201, data: { message: "获取用户信息失败" } }
  }
  //如果有返回成功信息
  return {
    code: 200,
    message: "获取成功",
    data: userInfo,
  }
}
// 用户登录
const login_mock = (response: any) => {
  //获取请求体携带过来的用户名与密码
  const { username, password } = JSON.parse(response.body)

  //调用获取用户信息函数,用于判断是否有此用户
  const checkUser = userinfo.find(
    (item) => item.username === username && item.password === password
  )

  //没有用户返回失败信息
  if (!checkUser) {
    return { code: 201, message: "账号或者密码不正确", data: {} }
  }
  //如果有返回成功信息
  const { token } = checkUser
  return { code: 200, data: { token }, message: "登录成功！" }
}
Mock.mock("/api/login", "post", login_mock)
Mock.mock("/api/user", "post", userinfo_mock)
 */
