/**
 * Created by lenovo on 2017/8/16.
 * 注意文件名首字母大写，否则mongoose出错
 */
module.exports = {
  // 设计数据库字段,先简单的设置一些常用的字段
  name: String,
  phone: String,
  email: String,
  password: String,
  createTime: Date
}