import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import BookImage from '../../../public/book.png';

const Product = ({ post }) => {
  // console.log('post', post)
  return (
    <div className="flex gap-5 p-5 rounded shadow-md">
      <Image
        src={BookImage}
        alt={post.user}
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: 'auto', height: '12rem' }}
      />
      <div>
        <h2 className="line-clamp-2 text-xl font-bold text-primary-600 text-balance">
          {post.heading}
        </h2>
        <p className=" text-primary-900 mt-1">{post.description}</p>
        <Link
          href={`/user/${post.id}`}
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
