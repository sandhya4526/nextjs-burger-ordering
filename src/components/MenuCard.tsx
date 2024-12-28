import Link from 'next/link';
import Image from 'next/image';
import { Product } from '../interfaces';

// This tells TypeScript what props our MenuCard component expects
interface MenuCardProps {
  item: Product; // We're expecting a single product item
}

// This is our MenuCard component. It shows one item from our burger menu.
export default function MenuCard({ item }: MenuCardProps) {
  return (
    // This div is the card container. It's dark, rounded, and does a cool hover effect.
    <div className="bg-gray-900 rounded-lg overflow-hidden hover:shadow-2xl transform hover:scale-105">
      {/* Clicking anywhere on the card takes you to that product's page */}
      <Link href={`/product/${item.id}`} className="block no-underline">
        {/* This is where we show the burger's picture */}
        <div className="relative w-full h-48">
          <Image
            src={item.image}
            alt={item.name}
            layout="fill"
            className="object-cover"
          />
        </div>
        
        {/* Here's where we put all the text info about the burger */}
        <div className="p-4">
          {/* The name of the burger */}
          <h2 className="text-lg font-semibold text-white">{item.name}</h2>
          {/* The price, converted from cents to dollars */}
          <p className="text-green-400 font-bold">${(item.price / 100).toFixed(2)}</p>
          {/* A short description of the burger */}
          <p className="text-gray-400 text-sm mt-2">{item.description}</p>
        </div>
      </Link>
    </div>
  );
}
