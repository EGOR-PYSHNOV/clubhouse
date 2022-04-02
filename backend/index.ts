import { uploader } from './core/uploader'
import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
dotenv.config()
import { passport } from './core/passport'
import './core/db'
import { UserModel } from './types/user'
import AuthController from './controllers/AuthController'
import UploadController from './controllers/UploadController'

declare global {
    namespace Express {
        interface User extends UserModel {}
    }
}

/* TODO: 
Add docker
Add good path for file in back and front
*/

const app = express()

app.use(passport.initialize())
app.use(cors())
app.use(express.json())

app.post(
    '/auth/sms/activate',
    passport.authenticate('jwt', { session: false }),
    AuthController.activate
)

app.get(
    '/auth/sms',
    passport.authenticate('jwt', { session: false }),
    AuthController.sendSMS
)

app.get(
    '/auth/me',
    passport.authenticate('jwt', { session: false }),
    AuthController.getMe
)

app.get(
    '/auth/google',
    passport.authenticate('google', {
        scope: ['https://www.googleapis.com/auth/plus.login'],
    })
)

app.get(
    '/auth/google/callback/',
    passport.authenticate('google', {
        failureRedirect: '/login',
    }),
    AuthController.authCallback
)

app.post('/upload', uploader.single('photo'), UploadController.upload)

app.listen(process.env.PORT || 3002, () => {
    console.log('SERVER WAS RUNNED')
})
