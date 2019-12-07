import React from 'react'
import Layout from '../components/layout';

export default function About() {
    return (
        <Layout>
            <div className="md:flex my-20">
                <div className="md:flex-shrink-0">
                    <img className="rounded-lg md:w-56" src="https://scontent-mia3-1.xx.fbcdn.net/v/t1.0-9/s960x960/67873868_10218470236127933_8940422769670094848_o.jpg?_nc_cat=103&_nc_ohc=j8W-v28kkhUAQlpea57BrrcrbfNCaCsGCS73IAAHgZthkzP1UPe8iIDxg&_nc_ht=scontent-mia3-1.xx&oh=57b53eeae4b05e61b15d1f376b0bbad9&oe=5E8A5BB3" alt="Business owner named Xochitl with her husband Daniel" />
                </div>
                <div className="mt-4 md:mt-0 md:ml-6">
                    <div className="uppercase tracking-wide text-sm text-teal-600 font-bold">Xochitl</div>
                    <h2 className="block mt-2 text-lg leading-tight font-bold text-gray-900">Headline</h2>
                    <p className="mt-1 text-gray-600">Insert Xochitl's entire life story here.</p>
                </div>
            </div>
            <div className="md:flex my-20">
                <div className="md:flex-shrink-0">
                    <img className="rounded-lg md:w-56" src="https://scontent-mia3-1.xx.fbcdn.net/v/t1.0-9/50811282_10216992449144182_1595039279073984512_n.jpg?_nc_cat=104&_nc_ohc=p-dtXVzC1LgAQmUDzzBEbe2hzVpvxkv884M1hm3nlW8VzsJR5-FoZNSEw&_nc_ht=scontent-mia3-1.xx&oh=61bfc64d55cb2765d5cd1b13fe4868ce&oe=5E71D580" alt="Business owner's daughter Jazmin" />
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
