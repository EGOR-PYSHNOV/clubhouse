import '../styles/global.scss'
import type { AppProps } from 'next/app'
import { GetServerSidePropsContext } from 'next'
import Cookies from 'nookies'
import { axios } from '../core/axios'

function MyApp({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />
}
export const getServerSideProps = (ctx: GetServerSidePropsContext) => {
    const cookies = Cookies.get(ctx)
    if (cookies.token) {
        axios.defaults.headers.common[
            'Authorization'
        ] = `Bearer ${cookies.token}`
    }
}

export default MyApp
