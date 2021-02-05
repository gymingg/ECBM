import {
    AppstoreOutlined,
    ToolOutlined,
    SafetyOutlined,
    UserOutlined,
    HomeOutlined,
    AreaChartOutlined,
    BarsOutlined
  } from "@ant-design/icons";
const menuList = [
  {
    title: "首页", // 菜单标题名称
    key: "/home", // 对应的 path
    icon: <HomeOutlined />, // 图标名称
    isPublic:true
  },
  {
    title: "商品",
    key: "/products",
    icon: <AppstoreOutlined />,
    children: [
      // 子菜单列表
      {
        title: "品类管理",
        key: "/category",
        icon: <BarsOutlined />,
      },
      {
        title: "商品管理",
        key: "/product",
        icon: <ToolOutlined />,
      },
    ],
  },
  {
    title: "用户管理",
    key: "/user",
    icon: <UserOutlined />,
  },
  {
    title: "角色管理",
    key: "/role",
    icon: <SafetyOutlined />,
  },
];
export default menuList;
