import { GetServerSideProps } from 'next';
import Header from '../components/Header';
import MenuCard from '../components/MenuCard';
import { Product } from '../interfaces';
import { useState } from 'react';

// This defines what props our Home component expects
interface HomeProps {
  menu: Product[]; // An array of products for our menu
}

// This is our main Home page component
export default function Home({ menu }: HomeProps) {
  // We're using state to keep track of what the user types in the search bar
  const [searchQuery, setSearchQuery] = useState('');

  // This filters our menu based on what the user has typed
  const filteredMenu = menu.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen">
      {/* We're including our Header component here */}
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {/* This is where we display all our menu items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
        {filteredMenu.length > 0 ? (
          // If we have items that match the search, we display them
          filteredMenu.map((item) => <MenuCard key={item.id} item={item} />)
        ) : (
          // If no items match the search, we show this message
          <div className="col-span-full text-center text-gray-400">
            No Results Found
          </div>
        )}
      </div>
    </div>
  );
}

// This function runs on the server to fetch our menu data
export const getServerSideProps: GetServerSideProps = async () => {
  // We're fetching our menu data from this URL
  const res = await fetch('https://burgerhub00.github.io/data/products.json');
  let menu: Product[] = [];

  try {
    // We're parsing the JSON response
    const data = (await res.json()) as { products: Product[] };

    if (Array.isArray(data.products)) {
      // We're using a Map to ensure we don't have any duplicate products
      menu = Array.from(
        new Map(data.products.map((item) => [item.id, item])).values()
      );
    } else {
      console.error('Invalid data format:', data);
    }
  } catch (error) {
    console.error('Error fetching products:', error);
  }

  // We're passing our menu data as props to the Home component
  return {
    props: { menu },
  };
};
