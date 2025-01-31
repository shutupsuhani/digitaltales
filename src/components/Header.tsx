import { UserButton } from '@clerk/nextjs'
import React from 'react'

const Header = () => {
    return (
        <div className='flex items-center justify-between'>
            
            <div className='flex justify-start p-4 gap-2'>
                <div className='w-3 h-3  rounded-full bg-yellow-300'></div>
                <div className='w-3 h-3 rounded-full bg-red-700 '></div>
                <div className='w-3 h-3 rounded-full bg-green-700 '></div>
            </div>

            
            <div className='flex justify-end p-5'>

                <UserButton />

            </div>
        </div>


    )
}

export default Header
