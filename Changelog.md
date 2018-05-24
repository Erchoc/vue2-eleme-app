### 发布日期：2018-5-23
- 使用`vue init webpack vue2-elem-app`初始化项目

### 发布日期：2018-5-24 后端接口有bug
- 修改`README`文件
- 添加`Changlog`修改日志文件
- 删除不需要的`src/assets/`目录
- 确定大概目录结构,添加`svg`字体文件,使用`stylus`预处理器
- 手动添加`mock`数据`data.json`:商家,商品,评论
- 使用`express`配置并测试三个接口数据(BUG:vue-route)

### 发布日期：2018-5-24
- 添加`static/cssreset.css` [样式重置文件](https://meyerweb.com/eric/tools/css/reset/index.html)
- 配置`.eslintrc.js`,使`ESLint`支持`semi分号`的使用
- 防止`Vue`独有的`new Obj`语法被`ESLint`报错`no-new`,添加一行注释跳过检测
- 完成组件拆分基本框架, 重命名`Header`组件为`v-header`

### 发布日期：2018-5-24
- 使用`vue-route`构建起`商品-评论-商家`基本架构页面
- 修改部分样式,修改`reset.css`令超链接无下划线
- 导航被点击后激活`vue-route`的`linkActiveClass`改变字体颜色

### 发布日期：2018-5-25 移动端未测试
- 封装`stylus`的`minin.styl`实现了导航条底部的像素边框在移动端两倍显示的问题,使用`http-server`调试移动端
- 修改`icon.styl`引入字体的路径
- 组件路径引入均使用`webpack`配置的`@ == src`别名

