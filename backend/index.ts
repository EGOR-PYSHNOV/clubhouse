import dotenv from 'dotenv'
import express from 'express'
dotenv.config()
import { passport } from './core/passport'
import './core/db'

const app = express()

app.use(passport.initialize())

app.get('/auth/facebook', passport.authenticate('facebook'))

app.get(
    '/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/',
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
