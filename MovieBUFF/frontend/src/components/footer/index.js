import React from 'react';
import { GiHearts } from 'react-icons/gi';

export default function Footer() {
  return (
    <>
        <footer className="flex flex-row items-center font-sans justify-center gap-2 bg-prime text-white p-2 text-lg">
        Made by Soumya Deep Sarkar with <GiHearts className="text-red-500" />
      </footer>
    </>
  )
}
