import React from 'react';

export default function Footer() {
  return (
    <>
      <footer className="flex flex-row items-center font-sans justify-center gap-2 bg-prime text-white p-2 text-lg">
        Made by Soumya Deep Sarkar with
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-heart-fill"
          className='text-red-500'
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
          />
        </svg>
      </footer>
    </>
  );
}
