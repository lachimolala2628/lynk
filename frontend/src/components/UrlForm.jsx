import React, { useState } from 'react'
import { createShortUrl } from '../api/shortUrl.api';
import { useSelector } from 'react-redux';
import { queryClient } from '../main';

const UrlForm = () => {

    const [url, setUrl] = useState();
    const [shortUrl, setShortUrl] = useState();
    const [copied, setCopied] = useState(false);
    const [error, setError] = useState(null);
    const [customSlug, setCustomSlug] = useState("");
    const { isAuthenticated } = useSelector((state) => state.auth);

    const handleSubmit = async () => {
        try {
            const shortUrl = await createShortUrl(url, customSlug);
            setShortUrl(shortUrl)
            queryClient.invalidateQueries({ queryKey: ['userUrls'] })
            setError(null)
        } catch (error) {
            setError(error.message)
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(shortUrl);
        setCopied(true);

        setTimeout(() => {
            setCopied(false);
        }, 2000)
    };

    return (
        <div className='w-full max-w-sm mx-auto rounded-xl'>
            <div className='mb-2'>
                <label htmlFor="url" className="block text-gray-700 text-sm font-bold mb-2">
                    Enter your URL
                </label>
                <input
                    type="url"
                    id="url"
                    value={url}
                    onInput={(event) => setUrl(event.target.value)}
                    placeholder="https://www.example.com"
                    required
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>
            {isAuthenticated && (
                <div className="mt-4 mb-4">
                    <label htmlFor="customSlug" className="block text-gray-700 text-sm font-bold mb-2">
                        Custom URL (optional)
                    </label>
                    <input
                        type="text"
                        id="customSlug"
                        value={customSlug}
                        onChange={(event) => setCustomSlug(event.target.value)}
                        placeholder="Enter custom URL"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
            )}
            <button
                onClick={handleSubmit}
                type="submit"
                className="w-full bg-blue-500 text-white mt-2 py-2 px-4 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 
                focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
            >Shorten URL
            </button>
            {error && (
                <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
                    {error}
                </div>
            )}
            {shortUrl && (
                <div className="mt-6">
                    <h2 className="text-lg font-semibold mb-2">Your shortened URL:</h2>
                    <div className="flex items-center">
                        <input
                            type="text"
                            readOnly
                            value={shortUrl}
                            className="flex-1 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        <button
                            onClick={handleCopy}
                            className={`px-4 py-2 rounded-r-md transition-colors duration-20 ${copied ? 'bg-green-500 text-white hover:bg-green-600' : 'bg-gray-200 hover:bg-gray-300'}`}
                        >
                            {copied ? 'Copied!' : 'Copy'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default UrlForm