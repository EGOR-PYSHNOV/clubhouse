import passport from 'passport'
import { Strategy as FacebookStrategy } from 'passport-facebook'
import { User } from '../models'

passport.use(
    'facebook',
    new FacebookStrategy(
        {
            clientID: process.env.FACEBOOK_APP_ID,
            clientSecret: process.env.FACEBOOK_APP_SECRET,
            callbackURL: 'http://localhost:3002/auth/facebook/callback',
        },
        async (_: unknown, __: unknown, profile, done) => {
            try {
                const obj = {
                    fullname: profile.displayName,
                    avatarUrl: profile.photos?.[0].value,
                    isActive: false,
                    username: profile.username,
                    phone: '',
                }

                const findUser = await User.findOne({
                    where: {
                        username: obj.username,
                    },
                })

                if (!findUser) {
                    const user = await User.create(obj)
                    return done(null, user.toJSON())
                }

                done(null, findUser)
            } catch (error) {
                done(error)
            }
        }
    )
)

passport.serializeUser(function (user, done) {
    done(null, user.id)
})

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        err ? done(err) : done(null, user)
    })
})

export { passport }
