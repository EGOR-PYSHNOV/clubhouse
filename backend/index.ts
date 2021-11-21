import dotenv from 'dotenv'
import express from 'express'
dotenv.config()
import { passport } from './core/passport'
import './core/db'

const app = express()

app.get('/auth/facebook', passport.authenticate('facebook'))

app.get(
    '/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/',
        failureRedirect: '/login',
    }),
    (req, res) => {
        res.send()
    }
)

app.listen(3002, () => {
    console.log('SERVER WAS RUNNED')
})
