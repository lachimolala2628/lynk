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
        <div className='w-full max-w-sm mx-auto'>
            <div className='mb-2'>
                <label htmlFor="url" className="block text-[#FFFFFF] text-sm font-mono mb-2">
                    Enter your URL
                </label>
                <input
                    type="url"
                    id="url"
                    value={url}
                    onInput={(event) => setUrl(event.target.value)}
                    placeholder="https://www.example.com"
                    required
                    className="shadow appearance-none border rounded-xl w-full py-2 px-3 text-[#FFFFFF] bg-[#171717] border-[#222323] placeholder:text-[#a1a1a1] placeholder:font-mono"
                />
            </div>
            {isAuthenticated && (
                <div className="mt-4 mb-4">
                    <label htmlFor="customSlug" className="block text-[#FFFFFF] text-sm font-mono mb-2">
                        Custom URL (optional)
                    </label>
                    <input
                        type="text"
                        id="customSlug"
                        value={customSlug}
                        onChange={(event) => setCustomSlug(event.target.value)}
                        placeholder="Enter custom URL"
                        className="shadow appearance-none border rounded-xl w-full py-2 px-3 text-[#FFFFFF] bg-[#171717] border-[#222323] placeholder:text-[#a1a1a1] placeholder:font-mono"
                    />
                </div>
            )}
            <button
                onClick={handleSubmit}
                type="submit"
                className="w-full mt-2 py-2 px-4 rounded-xl bg-[#E5E5E5] text-[#171717] font-mono"
            >Shorten URL
            </button>
            {error && (
                <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
                    {error}
                </div>
            )}
            {shortUrl && (
                <div className="mt-6">
                    <h2 className="text-lg font-mono mb-2">Your shortened URL:</h2>
                    <div className="flex items-center">
                        <input
                            type="text"
                            readOnly
                            value={shortUrl}
                            className="flex-1 shadow appearance-none border rounded-l-lg w-full py-2 px-3 text-[#FFFFFF] bg-[#171717] border-[#222323] placeholder:text-[#a1a1a1] placeholder:font-mono"
                        />
                        <button
                            onClick={handleCopy}
                            className={`px-4 py-2 rounded-r-lg transition-colors duration-20 font-mono ${copied ? 'bg-[#E5E5E5] text-[#171717]' : 'bg-[#E5E5E5]'}`}
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