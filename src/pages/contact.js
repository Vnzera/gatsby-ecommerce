import React from 'react'
import Layout from '../components/layout';

export default function Contact() {
    return (
        <Layout>
            <h3 className="mt-16">Contact us with any questions or concerns</h3>
            <div className="w-full max-w-xs m-auto my-20">
                <form
                    data-netlify="true" name="contact" method="POST" data-netlify-honeypot="bot-field"
                    className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <input type="hidden" name="contact" value="contact" />
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Email
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="email" type="email" placeholder="Email" />
                    </div>
                    <div className="mb-6">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            Subject
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" name="subject" type="text" placeholder="Subject" />

                        <div className="flex flex-col">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Message</label>
                            <textarea className="my-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" name="message" rows="3" placeholder="Enter your message here" />
                        </div>
                    </div>
                    <button className="my-0 mx-auto bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                        Submit
                    </button>
                </form>
            </div>
        </Layout>
    )
}
