import React from 'react'
import UrlForm from '../components/UrlForm'

const HomePage = () => {
    return (
        <div className='min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center p-4'>
            <div className='border border-[#222323] p-8 rounded-lg shadow-md w-full max-w-md'>
                <h1 className='text-2xl font-mono text-center mb-6 text-[#FFFFFF]'>
                    URL Shortener
                </h1>
                <UrlForm />
            </div>
        </div>
    )
}

export default HomePage