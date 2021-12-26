import { axios } from '../../core/axios'
import Link from 'next/link'
import { GetServerSideProps } from 'next'
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
                <div className='grid mt-30'></div>
            </div>
        </>
    )
}
