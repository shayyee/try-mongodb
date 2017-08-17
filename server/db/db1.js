/**
 * Created by lenovo on 2017/8/16.
 */
const mongoose = require('mongoose')
// 连接数据库 如果不自己创建 默认tifi-music数据库会自动生成
mongoose.connect('mongodb://localhost/tifi-music', {
  // 此处防止错误：DeprecationWarning: `open()` is deprecated in mongoose >= 4.11.0, use `openUri()` instead
  useMongoClient: true
})

// 为这次连接绑定事件
const db = mongoose.connection
db.once('error', () => console.log('Mongo connection error'))
db.once('open', () => console.log('Mongo connection successed'))
/** ************ 定义模式loginSchema **************/
const loginSchema = mongoose.Schema({
  email: String,
  password: String
})

/** ************ 定义模型Model **************/
const Models = {
  User: mongoose.model('Login', loginSchema)
}

module.exports = Models
