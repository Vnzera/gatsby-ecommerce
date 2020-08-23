import React from 'react'
import Layout from '../components/layout';

export default function About() {
    return (
        <Layout>
            <div className="md:flex my-20">
                <div className="md:flex-shrink-0">
                    <img className="rounded-lg md:w-56" src="https://images.unsplash.com/photo-1529144415895-6aaf8be872fb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1489&q=80" alt="Business owner" />
                </div>
                <div className="mt-4 md:mt-0 md:ml-6">
                    <div className="uppercase tracking-wide text-sm text-teal-600 font-bold">Xochitl</div>
                    <h2 className="block mt-2 text-lg leading-tight font-bold text-gray-900">Headline</h2>
                    <p className="mt-1 text-gray-600">Insert Xochitl's entire life story here.</p>
                </div>
            </div>
            <div className="md:flex my-20">
                <div className="md:flex-shrink-0">
                    <img className="rounded-lg md:w-56" src="https://images.unsplash.com/photo-1529144415895-6aaf8be872fb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1489&q=80" alt="Business owner's daughter" />
                </div>
                <div className="mt-4 md:mt-0 md:ml-6">
                    <div className="uppercase tracking-wide text-sm text-teal-600 font-bold">Jazmin</div>
                    <h2 className="block mt-2 text-lg leading-tight font-bold text-gray-900">Headline</h2>
                    <p className="mt-1 text-gray-600">Insert Jazmin's entire life story here.</p>
                </div>
            </div>
        </Layout>
    )
}
