/**
 * Created by lenovo on 2017/8/16.
 */
// 用于获取路径
const path = require('path')
// 用于读写文件流
const fs = require('fs')
const express = require('express')
// 无需npm安装,因为是express的中间件bodyParser
// 用于解析客户端请求的body中的内容,内部使用JSON编码处理,url编码处理以及对于文件的上传处理.
// bodyParse可以接受客户端ajax提交的json数据,以及url的处理,不使用这个中间件将导致无法接收客户端的json数据
const bodyParser = require('body-parser')
// 需要npm安装,cookieParser中间件用于获取web浏览器发送的cookie中的内容.
// 在使用了cookieParser中间件后,代表客户端请求的htto.IncomingMessage对象就具有了一个cookies属性
// 该属性值为一个对象的数组,其中存放了所有web浏览器发送的cookie,每一个cookie为cookies属性值数组中的一个对象.
const cookieParser = require('cookie-parser')
// serve-favicon中间件用于请求网站的icon，用法如下：
// express().use(favicon(__dirname + '/public/images/favicon.ico'))
// const favicon = require('serve-favicon')
// morgan中间件是日志中间件，用于node的日志输出
// 进阶用法见http://www.cnblogs.com/chyingp/p/node-learning-guide-express-morgan.html
const logger = require('morgan')
// 获取后端路由.我设置在根目录下的server文件,读取下面的index.js
const routes = require('./server/router')
// compression 中间件用于压缩和处理静态内容
// 例子:app.use(express.static(path.join(__dirname, 'public')))
const compression = require('compression')
// 实例化express对象,用于连接中间件
const app = express()

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

app.use(compression({ threshold: 0 }))
// 在应用程序中装入路由器模块
app.use('/api', routes)

app.use(express.static(path.resolve(__dirname, './dist')))
// 因为是单页应用 所有请求都走/dist/index.html
app.get('*', function (req, res) {
  const html = fs.readFileSync(path.resolve(__dirname, './dist/index.html'), 'utf-8')
  res.send(html)
})
app.listen(8088, function () {
  console.log('Server running in port 8088')
})
/*
* 总结：server.js创建一个express应用app
*      => 使用body-parser解析客户端请求的body中的内容
*      => 在应用程序中装入路由器模块
*      => 接口数据来源于mongoose(在controller中引入)
*/
