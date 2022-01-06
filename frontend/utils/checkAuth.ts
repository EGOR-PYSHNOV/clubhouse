import { GetServerSidePropsContext } from 'next'
import Cookies from 'nookies'
import { UserApi } from '../api/UserApi'
import { axios } from '../core/axios'
import { User } from '../types'

export const checkAuth = async (
    ctx: GetServerSidePropsContext
): Promise<User | null> => {
    try {
        const cookies = Cookies.get(ctx)
        if (cookies.token) {
            axios.defaults.headers.common[
                'Authorization'
            ] = `Bearer ${cookies.token}`
        }
        return await UserApi.getMe()
    } catch (error) {
        return null
    }
}
