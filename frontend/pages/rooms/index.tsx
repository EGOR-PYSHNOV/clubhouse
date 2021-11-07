import Link from 'next/link'
import { Button } from '../../components/Button'
import { ConversationCard } from '../../components/ConversationCard'
import { Header } from '../../components/Header'

export default function RoomsPage() {
    return (
        <>
            <Header />
            <div className='container'>
                <div className='mt-40 d-flex align-items-center justify-content-between'>
                    <h1>All conversations</h1>
                    <Button color='green'>+ Create room</Button>
                </div>
                <div className='mt-20 d-flex align-items-center'>
                    <Link href='/rooms/test-room' passHref>
                        <a>
                            <ConversationCard
                                title='Тестовая комната'
                                guests={['Маша', 'Коля']}
                                avatars={[
                                    'https://sun2-3.userapi.com/s/v1/if1/CAR1Aao3yIica7xq77xIIMMTn29CME-cE5JSJBc8OTNVt29JQjnhR0ZsX_9IO-AzgwVbfgB6.jpg?size=200x0&quality=96&crop=138,44,1048,1048&ava=1',
                                    'https://sun2-3.userapi.com/s/v1/if1/CAR1Aao3yIica7xq77xIIMMTn29CME-cE5JSJBc8OTNVt29JQjnhR0ZsX_9IO-AzgwVbfgB6.jpg?size=200x0&quality=96&crop=138,44,1048,1048&ava=1',
                                ]}
                                guestsCount={5}
                                speakersCount={5}
                            />
                        </a>
                    </Link>
                </div>
            </div>
        </>
    )
}
