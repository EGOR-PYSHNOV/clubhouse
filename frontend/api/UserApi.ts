import { axios } from '../core/axios'
import { User } from '../types/'

export const UserApi = {
    getMe: async (): Promise<User> => {
        const { data } = await axios.get('/auth/me')
        return data
    },
}
