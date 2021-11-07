import Axios from '../../core/axios'
import { useRouter } from 'next/router'
import { GetServerSideProps } from 'next'
import React from 'react'
import { BackButton } from '../../components/BackButton'
import { Header } from '../../components/Header'
import { Room } from '../../components/Room'

export default function RoomPage({ room }) {
    const router = useRouter()
    const { id } = router.query

    return (
        <>
            <Header />

            <div className='container mt-40'>
                <BackButton path='/rooms' title='All rooms' />
            </div>
            <Room title={room.title} />
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    try {
        const { data } = await Axios.get('/rooms.json')
        const roomId = ctx.query.id
        const room = data.find((roomDb) => roomDb.id === roomId)
        return {
            props: {
                room,
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
