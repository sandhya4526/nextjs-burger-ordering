import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Product } from '../../interfaces';
import { useCart } from '../../context/CartContext';
import { useTheme } from '../../context/ThemeContext';
import Header from '../../components/Header';

interface ProductDetailProps {
  product?: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  // Get cart functions and items from our cart context
  const { addToCart, updateCartItemQuantity, cartItems } = useCart();
  // Get the current theme (light or dark)
  const { theme } = useTheme();
  // Keep track of how many of this item are in the cart
  const [quantity, setQuantity] = useState(0);
  // For showing a notification when we add to cart
  const [notification, setNotification] = useState<string | null>(null);

  // When the component loads or the cart changes, update the quantity
  useEffect(() => {
    if (product) {
      const existingItem = cartItems.find((item) => item.id === product.id.toString());
      if (existingItem) {
        setQuantity(existingItem.quantity);
      }
    }
  }, [product, cartItems]);

  // Function to add the item to the cart
  const handleAddToCart = () => {
    if (product && quantity === 0) {
      addToCart({
        id: product.id.toString(),
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
      });
      setQuantity(1);
      // Show a notification
      setNotification(`${product.name} added to cart`);
      // Clear the notification after 3 seconds
      setTimeout(() => setNotification(null), 3000);
    }
  };

  // Function to increase the quantity in the cart
  const handleIncrease = () => {
    if (product) {
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);
      updateCartItemQuantity(product.id.toString(), newQuantity);
    }
  };

  // Function to decrease the quantity in the cart
  const handleDecrease = () => {
    if (product) {
      if (quantity > 1) {
        const newQuantity = quantity - 1;
        setQuantity(newQuantity);
        updateCartItemQuantity(product.id.toString(), newQuantity);
      } else {
        setQuantity(0);
        updateCartItemQuantity(product.id.toString(), 0);
      }
    }
  };

  // If we couldn't find the product, show an error message
  if (!product) {
    return (
      <div className={`flex flex-col items-center justify-center min-h-screen ${
        theme === 'light' ? 'bg-white text-black' : 'bg-black text-white'
      }`}>
        <Header searchQuery="" setSearchQuery={() => {}} />
        <p className="text-red-500 text-xl">Product not found!</p>
        <Link href="/" className="mt-4 text-blue-500">
          Go back to home
        </Link>
      </div>
    );
  }

  // If we found the product, show its details
  return (
    <div className={`min-h-screen ${
      theme === 'light' ? 'bg-white text-black' : 'bg-black text-white'
    }`}>
      <Header searchQuery="" setSearchQuery={() => {}} />
      <div className="max-w-4xl mx-auto bg-gray-900 text-white rounded-lg p-6 mt-16">
        <Link href="/" className="text-green-400">
          ← Go Back
        </Link>
        <div className="flex lg:flex-row gap-6 mt-6">
          <div className=" lg:w-1/3">
            <Image
              src={product.image}
              alt={product.name}
              className="object-cover w-[250px] h-[250px] mx-auto rounded-lg"
              width={250}
              height={250}
            />
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <p className="text-green-400 text-xl font-semibold mb-4">
              Price: ${(product.price / 100).toFixed(2)}
            </p>
            <p className="text-gray-400 mb-4">{product.description}</p>
            <p className="text-gray-500 mb-6">
              Nutrition: {product.calorie} calories
            </p>
            <div>
              {quantity === 0 ? (
                <button
                  onClick={handleAddToCart}
                  className="px-6 py-2 bg-green-500 text-black font-bold rounded hover:bg-green-600"
                >
                  Add to Cart
                </button>
              ) : (
                <div className="flex items-center space-x-4">
                  <button
                    onClick={handleDecrease}
                    className="px-3 py-1 bg-gray-700 text-white rounded"
                  >
                    -
                  </button>
                  <span className="text-xl">{quantity}</span>
                  <button
                    onClick={handleIncrease}
                    className="px-3 py-1 bg-gray-700 text-white rounded"
                  >
                    +
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {notification && (
        <div className="fixed bottom-4 left-1/2 bg-green-500 px-6 py-2 rounded">
          {notification}
        </div>
      )}
    </div>
  );
}

// This function generates all possible paths for our products
export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch('https://burgerhub00.github.io/data/products.json');
  const data = await res.json();

  const paths = data.products.map((product: Product) => ({
    params: { id: product.id.toString() },
  }));

  return { paths, fallback: true };
};

// This function fetches the data for a specific product
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const res = await fetch('https://burgerhub00.github.io/data/products.json');
  const data = await res.json();

  const product = data.products.find(
    (p: Product) => p.id.toString() === params?.id
  );

  return {
    props: { product: product || null },
  };
};
