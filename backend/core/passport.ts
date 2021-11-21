import passport from 'passport'
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth'
import { user as User } from '../models'

passport.use(
    'google',
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: 'http://localhost:3002/auth/google/callback',
        },
        async (_: unknown, __: unknown, profile, done) => {
            try {
                const obj = {
                    fullname: profile.displayName,
                    avatarUrl: profile.photos?.[0].value,
                    isActive: false,
                    username:
                        profile.name.givenName + ' ' + profile.name.familyName,
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
