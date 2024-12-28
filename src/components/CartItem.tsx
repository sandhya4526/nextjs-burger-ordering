import { CartItem as CartItemType } from '../interfaces';

// This component expects two props: the item itself and a function to remove it
interface CartItemProps {
  item: CartItemType; // The cart item to display
  onRemove: (id: number) => void; // Function to call when removing the item
}

// This is our CartItem component. It shows one item in the shopping cart.
export default function CartItem({ item, onRemove }: CartItemProps) {
  return (
    // The main container for our cart item. It's a flex box for layout.
    <div className="flex items-center p-4 border-b border-gray-300">
      {/* Here's the product image. We're using the item's image and name. */}
      <img
        src={item.image}
        alt={item.name}
        className="w-24 h-20 object-cover rounded-lg mr-4"
      />
      {/* This div contains all the text info and the remove button */}
      <div className="flex-1">
        {/* The name of the product */}
        <h2 className="text-xl font-semibold mb-2">{item.name}</h2>
        {/* The price, converted from cents to dollars */}
        <p className="text-sm text-gray-600">Price: ${(item.price / 100).toFixed(2)}</p>
        {/* How many of this item are in the cart */}
        <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
        
        {/* The button to remove this item from the cart */}
        <button
          onClick={() => onRemove(item.id)}
          className="text-white"
        >
          Remove
        </button>
      </div>
    </div>
  );
}
