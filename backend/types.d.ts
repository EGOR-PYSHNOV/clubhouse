import { UserModel } from './types/user'
declare global {
    namespace Express {
        interface User extends UserModel {}
    }
}
