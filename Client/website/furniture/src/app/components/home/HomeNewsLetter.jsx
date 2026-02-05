import React from 'react'

export default function HomeNewsLetter() {
    return (
        <>
            <section className='py-[40px] max-w-[full] bg-[#F8F9F9] my-[40px]' >
                <div className="text-center">
                    <h2>Our Newsletter</h2>
                    <p className='py-5'>Get E-mail updates about our latest shop and special offers.</p>
                    <div className="flex justify-center">
                        <form method="" action="" id="newsletter_form" >
                            <div className="border-1 border-gray-500 rounded-xl">
                                <input id="" name="email" type="email"  placeholder="Email address..." className='py-2 focus:outline-none' />
                                <button id="" className='bg-[#C09578] py-2 px-3 rounded-xl text-white'>Subscribe</button>
                            </div> 
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}
