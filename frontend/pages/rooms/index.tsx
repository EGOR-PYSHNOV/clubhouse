import { axios } from '../../core/axios'
import { GetServerSideProps } from 'next'
import { Button } from '../../components/Button'
import { Header } from '../../components/Header'
import { UserApi } from '../../api/UserApi'
import Cookies from 'nookies'
import Head from 'next/head'
import { checkAuth } from '../../utils/checkAuth'

export default function RoomsPage() {
    return (
        <>
            <Head>
                <meta
                    name='viewport'
                    content='width=device-width, initial-scale=1.0'
                />
                <title>Clubhouse: Drop-in audio chat</title>
            </Head>

            <Header />
            <div className='container'>
                <div className='mt-40 d-flex align-items-center justify-content-between'>
                    <h1>All conversations</h1>
                    <Button color='green'>+ Create room</Button>
                </div>
                <div className='grid mt-30'></div>
            </div>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    try {
        const user = await checkAuth(ctx)

        console.log(user)

        if (!user) {
            return {
                props: {},
                redirect: {
                    permanent: false,
                    destination: '/',
                },
            }
        }

        return {
            props: {
                user,
                rooms: [],
            },
        }
    } catch (error) {
        console.log('ERROR!')
        return {
            props: {
                rooms: [],
            },
        }
    }
}
