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
    id: 1,
    label: "vipon",
    children: [
      {
        id: 9,
        label: "产品评论",
      },
      {
        id: 10,
        label: "每日投诉明细",
      },
      {
        id: 20,
        label: "日均发码量",
      },
      {
        id: 30,
        label: "卖家订阅套餐",
      },
      {
        id: 11,
        label: "活动",
        children: [
          {
            id: 15,
            label: "用户统计",
          },
        ],
      },
    ],
  },
  {
    id: 2,
    label: "抓客",
    children: [
      {
        id: 5,
        label: "落地页埋点",
      },
      {
        id: 6,
        label: "活跃用户数据",
      },
    ],
  },
  {
    id: 3,
    label: "运营",
    "children|100": [
      {
        "id|+1": 20,
        label: "@cname",
      },
    ],
  },
]

// 单个节点明细
const treeSelectData = [
  {
    text_id: 1,
    engine: "vipon_db",
    sqlText: `
SELECT
	email,
	user_id,
	join_date,
	source,
	plan_interval,
	plan_amount / 100,
	plan_kind,
	case 
when source =1 then next_period_date
when source =2 then FROM_UNIXTIME(plan_expiry) 
end as expiry_date
FROM
	tbl_user 
WHERE
	stripe_id LIKE 'cus_%' 
	AND stripe_sub LIKE 'sub_%'
	AND plan_kind = 1
	AND promotion_limit>0
	and join_date>'2024-04-30'
    `,
  },
]

const tableData = {
  // {
  //   id: 11,
  //   date: "2018-07-24",
  //   sales: 23.34,
  //   sale: 137597.76,
  //   const: 102203.71,
  //   profit: 35394.05,
  // },
  "data|1000": [
    {
      "id|+1": 1,
      date: '@date("yyyy-MM-dd")',
      sales: "@float(10, 100, 2, 2)",
      sale: "@float(10000, 1000000, 2, 2)",
      const: "@float(10000, 500000, 2, 2)",
      profit: "@float(1000, 50000, 2, 2)",
    },
  ],
}

const tableHeader = [
  { label: "", width: "", prop: "id" },
  { label: "日期", width: "", prop: "date" },
  { label: "销售量", width: "", prop: "sales" },
  { label: "销售额", width: "", prop: "sale" },
  { label: "成本", width: "", prop: "const" },
  { label: "利润", width: "", prop: "profit" },
]

const vxeTableData = [
  {
    columns: [
      // { field: "id", title: "id" },
      { field: "date", title: "data" },
      { field: "sales", title: "sales" },
      { field: "const", title: "const" },
      { field: "profit", title: "profit" },
      { field: "price", title: "price" },
    ],
    "data|1000": [
      {
        // "id|+1": 1,
        date: '@date("yyyy-MM-dd")',
        sales: "@float(10, 100, 2, 2)",
        sale: "@float(10000, 1000000, 2, 2)",
        const: "@float(10000, 500000, 2, 2)",
        profit: "@float(1000, 50000, 2, 2)",
        price: "@float(1000, 50000, 2, 2)",
      },
    ],
  },
]
const engines = [
  {
    value: "vipon_db",
    label: "vipon_db",
  },
  {
    value: "vipon_log",
    label: "vipon_log",
  },
  {
    value: "erp",
    label: "erp",
  },
  {
    value: "大表库",
    label: "大表库",
  },
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
  /***
   * @vxeTable 表格数据
   */
  {
    url: "/api/vxe/table",
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
        data: vxeTableData,
      }
    },
  },
  /***
   * @引擎列表
   */
  {
    url: "/api/table/engines",
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
        data: engines,
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
