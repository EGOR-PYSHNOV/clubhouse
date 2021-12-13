import { createJwtToken } from './../helpers/auth/createJwtToken'
import { UserModel } from './../types/user'
import passport from 'passport'
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import { user as User } from '../models'

const config = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET_KEY,
}

passport.use(
    'jwt',
    new JwtStrategy(config, (jwt_payload, done) => {
        done(null, jwt_payload.data)
    })
)

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
                let userData: UserModel

                const obj: Omit<UserModel, 'id'> = {
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
                    userData = (await User.create(obj)).toJSON()
                } else {
                    userData = await findUser.toJSON()
                }

                done(null, {
                    ...userData,
                    token: createJwtToken(userData),
                })
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
