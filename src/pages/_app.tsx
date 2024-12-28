import type { AppProps } from 'next/app';
import { ThemeProvider } from '../context/ThemeContext';
import { CartProvider } from '../context/CartContext';
import '../styles/globals.css';

// Custom App component to wrap the application with providers
export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    // Wrapping the app with ThemeProvider for theme management
    <ThemeProvider>
      {/* Wrapping the app with CartProvider for cart management */}
      <CartProvider>
        {/* Rendering the current page */}
        <Component {...pageProps} />
      </CartProvider>
    </ThemeProvider>
  );
}
