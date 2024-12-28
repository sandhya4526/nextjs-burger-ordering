import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import { Dispatch, SetStateAction } from 'react';

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
}

export default function Header({ searchQuery, setSearchQuery }: HeaderProps) {
  const { cartItems } = useCart();
  const { theme, toggleTheme } = useTheme();

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <header
      className={`flex justify-between items-center px-6 py-4 shadow ${
        theme === 'light' ? 'bg-gray-100 ' : 'bg-gray-900'
      }`}
    >
      <div className="flex items-center">
        <Link href="/" className="text-2xl font-bold flex items-center">
          BURGER
          <Image
            src="/home.png"
            alt="Home"
            width={24}
            height={24}
            className="ml-2"
          />
        </Link>
      </div>

      <div className="flex items-center space-x-4">
        <input
          type="text"
          placeholder="Type to search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={`px-4 py-2 rounded-full ${
            theme === 'light' ? 'bg-gray-200' : 'bg-gray-700'
          }`}
        />
        
        <button
          onClick={toggleTheme}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
        </button>
        
        <Link href="/cart" className="relative">
          <div className="relative inline-block">
            <Image
              src="/cart.png"
              alt="Cart"
              width={24}
              height={24}
            />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-3 bg-green-500 rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </div>
        </Link>
      </div>
    </header>
  );
}
