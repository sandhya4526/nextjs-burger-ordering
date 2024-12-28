// Interface representing a product in the menu
export interface Product {
  id: number; // Unique identifier for the product
  name: string; // Product name
  description: string; // Description of the product
  price: number; // Price in cents
  image: string; // URL of the product image
  calorie: string; // Calorie information
  slug: string; // Slug for SEO-friendly URLs
}

// Interface for items in the cart, extending Product with quantity
export interface CartItem extends Product {
  quantity: number; // Number of items in the cart
}
