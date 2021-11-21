import dotenv from 'dotenv'
import express from 'express'
dotenv.config()
import { passport } from './core/passport'
import './core/db'

/* TODO: 
Add docker
*/

const app = express()

app.use(passport.initialize())

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
    (req, res) => {
        res.send(
            `<script>window.opener.postMessage('${JSON.stringify(
                req.user
            )}', '*');window.close();</script>`
        )
    }
)

app.listen(3002, () => {
    console.log('SERVER WAS RUNNED')
})
