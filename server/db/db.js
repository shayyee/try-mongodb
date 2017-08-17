/**
 * Created by lenovo on 2017/8/16.
 */
// 引入node的文件路径模块path和文件处理模块fs
const path = require('path')
const fs = require('fs')
const mongoose = require('mongoose')

// mongodb 连接
mongoose.connect('mongodb://localhost/tifi-music', {
  // 此处防止错误：DeprecationWarning: `open()` is deprecated in mongoose >= 4.11.0, use `openUri()` instead
  useMongoClient: true
})
// 此处防止 node.js - Mongoose: mpromise 错误
mongoose.Promise = global.Promise
let db = mongoose.connection
db.on('error', console.error.bind(console, 'Connect error'))
db.once('open', function () {
  console.log('Mongodb started successfully')
})
// 声明待添加的model对象
let model = {}
// 读取方式和router一样
const schemas = fs.readdirSync(path.resolve(__dirname, './model'))
schemas.forEach((file) => {
  // 设置数据库表名为读取到的文件名(去除后缀名)
  let name = file.substring(0, file.lastIndexOf('.'))
  // 获取到的对象就是数据库字段
  let schema = require('./model/' + file)
  // 使用mongoose.Schema和mongoose.model完成对数据库表和字段的创建
  model[name] = mongoose.model(name, mongoose.Schema(schema))
})
// 输出model对象
module.exports = model
