import React from 'react'
import image404 from '../assets/404.png';
import { Link } from 'react-router-dom';
const Page404 = () => {
    return (
        <section className="bg-[var(--light-cream-background)] dark:bg-gray-900 h-[100dvh]">
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                <div className="mx-auto max-w-screen-sm text-center">
                    <img src={image404} width="300" height="400" className="m-auto" />
                    <p className="mb-4 text-3xl tracking-tight font-bold text-[var(--text-color)] md:text-4xl">Something's missing.</p>
                    <p className="mb-4 text-lg font-light text-[var(--dark-light-brown)]">Sorry, we can't find that page</p>
                    <Link to="/dashboard" className="inline-flex text-[var(--text-color)] bg-[var(--light-one-brown-color)] hover:bg-primary-800   font-medium rounded-lg text-sm px-5 py-2.5 text-center  my-4">Back to Dashboard</Link>
                </div>
            </div>
        </section>
    )
}

export default Page404