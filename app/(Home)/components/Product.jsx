import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import BookImage from '../../../public/book.png';

const Product = ({ user }) => {
  return (
    <div className="flex gap-5 p-5 rounded shadow-md">
      <Image
        src={BookImage}
        alt={user.username}
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: 'auto', height: '12rem' }}
      />
      <div>
        <h2 className="line-clamp-2 text-xl font-bold text-primary-600 text-balance">
          {user.name}
        </h2>
        <p className="font-bold text-primary-900 mt-1">{user.email}</p>
        <Link
          href={`/user/${user.id}`}
          className="py-1 px-2 rounded border border-primary-500 mt-4 inline-block text-primary-500 font-medium text-sm
                    hover:border-primary-100 hover:bg-primary-100 transition"
        >
          Read more
        </Link>
      </div>
    </div>
  );
};

export default Product;
