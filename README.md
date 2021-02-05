## 项目描述

该项目为电商后台管理单页面应用项目

适用于初学react需要动手实践者

技术栈：react react-router antd axios es6

## 启动

#### 通过npm start 启动reactECBM的客户端 通过node serve.js启动服务器端

#### 后端端口默认绑定5000

## 目录结构

#### build

  ---- 打包后的文件

#### src

|  assets---logo.png  *logo图片*

|  components ---*组件* 

	1.header *header组件* 

	2.left-nav *侧边栏组件* 

	3.linkButton *链接组件*

|  pages --- *页面*

	1.admin *整体容器* 

	2.category *商品分类页面*
		|component
			|addForm.jsx *添加商品分类表单*
			|updateForm.jsx *更新商品分类表单*

	3.home组件 *主页页面*

	4.login *登入页面*

	5.product *商品页面*
		|product.jsx 商品页面容器	
		|pages
			|addProduct.jsx 添加商品页面
			|detail.jsx 商品详情页面
			|home 商品主页
			|pictuUpload 照片上传组件
			|rich-text-editor.jsx 富文本编辑器组件

	6.role *角色管理页面*
		|add-form.jsx 添加角色表单
		|auth-form.jsx 给角色添加权限表单
		|formateDate.js 格式化时间组件
		|role.jsx 角色管理页面主页

	7.user *用户管理页面*
		|user-form.jsx 添加用户表单
		|user.jsx 用户管理页面主页

|   static ---*静态文件*

	1.menuList.js 左侧菜单栏的属性

	2.router.js 设置服务端url


