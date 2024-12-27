const express = require('express')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const session = require('express-session')
const cors = require('cors')
const path = require('path')
const { sequelize } = require('./models')
require('dotenv').config()
const passport = require('passport')
const passportConfig = require('./passport')
const indexRouter = require('./routes')
const authRouter = require('./routes/auth')
const postRouter = require('./routes/post')
const themeRouter = require('./routes/theme')

const app = express()
passportConfig()
app.set('port', process.env.PORT || 8002)
app.use(cors({ origin: 'http://localhost:3001', credentials: true }))

sequelize
   .sync({ force: false })
   .then(() => {
      console.log('데이터베이스 연결 성공')
   })
   .catch((err) => {
      console.error(err)
   })

app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, 'uploads')))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(
   session({
      resave: false,
      saveUninitialized: true,
      secret: process.env.COOKIE_SECRET,
      cookie: {
         httpOnly: true,
         secure: false,
      },
   })
)

app.use(passport.initialize())
app.use(passport.session())

app.use('/', indexRouter)
app.use('/auth', authRouter)
app.use('/post', postRouter)
app.use('/theme', themeRouter)

app.use((req, res, next) => {
   const error = new Error(`${req.method} ${req.url} 라우터가 존재하지 않습니다.`)
   error.status = 404
   next(error)
})

app.use((err, req, res, next) => {
   const statusCode = err.status || 500
   const errorMessage = err.message || '서버 내부 오류'
   res.status(statusCode).json({
      succes: false,
      message: errorMessage,
      error: err,
   })
})

app.options('*', cors())
app.listen(app.get('port'), () => {
   console.log(app.get('port'), '번 포트에서 대기중')
})
