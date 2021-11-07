import Axios from '../../core/axios'
import Link from 'next/link'
import { GetServerSideProps } from 'next'
import { Button } from '../../components/Button'
import { ConversationCard } from '../../components/ConversationCard'
import { Header } from '../../components/Header'

export default function RoomsPage({ rooms = [] }) {
    return (
        <>
            <Header />
            <div className='container'>
                <div className='mt-40 d-flex align-items-center justify-content-between'>
                    <h1>All conversations</h1>
                    <Button color='green'>+ Create room</Button>
                </div>
                <div className='grid mt-30'>
                    {rooms.map((room) => (
                        <Link key={room.id} href={`/rooms/${room.id}`}>
                            <a className='d-flex'>
                                <ConversationCard
                                    title={room.title}
                                    avatars={room.avatars}
                                    guests={room.guests}
                                    guestsCount={room.guestsCount}
                                    speakersCount={room.speakersCount}
                                />
                            </a>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async () => {
    try {
        const { data } = await Axios.get('/rooms')
        return {
            props: {
                rooms: data,
            },
        }
    } catch (error) {
        return {
            props: {
                rooms: [],
            },
        }
    }
}
