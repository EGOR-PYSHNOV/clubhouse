import Link from 'next/link'
import Image from 'next/image'
import React from 'react'

type BackButtonProps = {
    title: string
    path: string
}

export const BackButton: React.FC<BackButtonProps> = ({ title, path }) => {
    return (
        <Link href={path} passHref>
            <div className='d-flex mb-30 cup'>
                <img
                    src='/static/back-arrow.svg'
                    alt='Back'
                    className='mr-10'
                />
                <h3>{title}</h3>
            </div>
        </Link>
    )
}
