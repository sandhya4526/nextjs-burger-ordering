import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import Header from '../components/Header';
import Image from 'next/image';

// This is our shopping cart page
export default function Cart() {
  const { cartItems, updateCartItemQuantity, removeFromCart, totalPrice } = useCart();
  const { theme } = useTheme();

  return (
    // The main container. Its background changes based on the theme
    <div className={`min-h-screen ${theme === 'light' ? 'bg-white' : 'bg-black'}`}>
      {/* Header */}
      <Header searchQuery="" setSearchQuery={() => { }} />

      {/* Cart Content */}
      <div className="max-w-4xl mx-auto bg-gray-900 rounded-lg p-6 mt-8">
        <h1 className="text-3xl font-bold text-center mb-6 text-white"> 
          Shopping Cart
        </h1>

        {/* If the cart is empty */}
        {cartItems.length === 0 ? (
          <p className="text-center text-white">
            Your cart is empty.
          </p>
        ) : (
          // If there are items in the cart
          <ul className="space-y-4">
            {cartItems.map((item) => (
              <li key={item.id} className="flex items-center justify-between gap-6">
                {/* Item Image and Name */}
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-16 h-16 rounded-full overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={64}
                      height={64}
                      className="object-cover"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-semibold text-white">
                      {item.name}
                    </h2>
                    <p className="text-white">
                      ({item.quantity})
                    </p>
                    {/* Quantity Adjust Buttons */}
                    <div className="flex items-center gap-2 ml-4">
                      <button
                        onClick={() =>
                          updateCartItemQuantity(item.id, Math.max(item.quantity - 1, 0))
                        }
                        className="px-2 py-1 bg-gray-700 rounded text-white"
                      >
                        -
                      </button>
                      <span className="text-lg font-semibold text-white">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateCartItemQuantity(item.id, item.quantity + 1)
                        }
                        className="px-2 py-1 bg-gray-700 rounded text-white"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {/* Item Total Price */}
                <p className="text-lg font-semibold flex-1 text-right text-white">
                  ${((item.price * item.quantity) / 100).toFixed(2)}
                </p>

                {/* Remove Button */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-white hover:text-red-500"
                >
                  <Image
                    src="/delete.png"
                    alt="Delete"
                    width={24}
                    height={24}
                  />
                </button>
              </li>
            ))}
          </ul>
        )}

        {/* Total Price */}
        <div className="mt-6 border-t border-gray-700 pt-4 flex justify-between items-center">
          <span className="text-xl font-bold text-white">
            Total:
          </span>
          <span className="text-xl font-bold text-green-400">
            ${((totalPrice) / 100).toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}
