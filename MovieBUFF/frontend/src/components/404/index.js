import React from 'react';
import Footer from '../footer';
import Header from '../header';

export default function PageNotFound() {
  return (
    <div className='min-h-screen justify-between flex flex-col'>
        <Header/>
        <div className='w-full h-full flex justify-center items-center'>
            <div className='fontDesi text-prime text-7xl'>
                404
            </div>
            <ul className='text-4xl gap-2 ml-3'>
                <li>Sorry</li> <li>page</li> <li>not</li> <li>found!</li>
            </ul>
        </div>
        <Footer/>
    </div>
  )
}
