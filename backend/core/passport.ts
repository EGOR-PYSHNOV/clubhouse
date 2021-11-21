import passport from 'passport'
import { Strategy as FacebookStrategy } from 'passport-facebook'

passport.use(
    'facebook',
    new FacebookStrategy(
        {
            clientID: process.env.FACEBOOK_APP_ID,
            clientSecret: process.env.FACEBOOK_APP_SECRET,
            callbackURL: 'http://localhost:3002/auth/facebook/callback',
        },
        (token, tokenSecret, profile, done) => {
            const user = {
                fullname: profile.displayName,
                avatarUrl: profile.photos?.[0].value,
            }
        }
    )
)

export { passport }
