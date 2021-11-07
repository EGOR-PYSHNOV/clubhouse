import { useRouter } from 'next/router'
import React from 'react'
import { BackButton } from '../../components/BackButton'
import { Header } from '../../components/Header'

export default function RoomPage() {
    const router = useRouter()
    const { id } = router.query

    return (
        <>
            <Header />

            <div className='container mt-40'>
                <BackButton path='/rooms' title='All rooms' />
            </div>
        </>
    )
}
