/**
 * Created by lenovo on 2017/8/16.
 */
// '引入mongoose的model
const model = require('../db/db')
// 加密用户的密码
const sha1 = require('sha1')
// mogodb会自动的为我们添加_id字段,类型为objectid,我们要把它转换成创建该用户的时间
const objectIdToTimestamp = require('objectid-to-timestamp')

module.exports = {
  // 获取所有用户
  users: {
    response: (req, res) => {
      model.User.find({}, (err, doc) => {
        if (err) console.log(err)
        res.send(doc)
      })
    }
  },
  // 登录
  login: {
    type: 'post',
    response: (req, res) => {
      let pw = sha1(req.body.password)
      console.log(pw)
      model.User.find({
        email: req.body.email
      }, (err, doc) => {
        if (err) console.log(err)
        if (doc) {
          if (pw === doc[0].password) {
            res.json({
              code: 0,
              info: '登录成功'
            })
          } else {
            res.json({
              code: 1,
              info: '密码错误'
            })
          }
        } else {
          res.json({
            code: 1,
            info: '用户名不存在'
          })
        }
      })
    }
  },
  // 用户注册
  reg: {
    type: 'post',
    response: (req, res) => {
      // console.log(req.body)
      let userRegister = new model.User({
        email: req.body.email,
        password: sha1(req.body.password)
      })
      // 将 objectid转换为用户创建时间,使用是的UTC国际标准时间
      userRegister.createTime = objectIdToTimestamp(userRegister._id)

      // 查询邮箱是否已存在于数据库
      model.User.findOne({
        email: (userRegister.email)
          .toLowerCase()
      }, (err, doc) => {
        if (err) console.log(err)
        if (doc) {
          res.json({
            code: 1,
            msg: '该邮箱已被注册'
          })
        } else {
          userRegister.save(err => {
            if (err) console.log(err)
            console.log(new Date(), 'register success')
            res.json({
              code: 0,
              data: {
                email: userRegister.email
              },
              msg: '注册成功'
            })
          })
        }
      })
    }
  }
}

