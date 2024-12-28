import Document, { Html, Head, Main, NextScript } from 'next/document';

// This is a custom Document component for Next.js
// It lets us tweak the initial HTML that gets sent from the server
export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* Here we're setting up some basic info about our app */}
          <meta charSet="UTF-8" />
          <meta name="description" content="Burger Ordering App" />
          <link rel="icon" href="/favicon.ico" />
          
          {/* We're importing a nice font for our app */}
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          {/* This script runs as soon as the body loads */}
          {/* It checks if the user has a theme preference and applies it right away */}
          {/* This prevents a flash of unstyled content when the page loads */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function() {
                  // Check if the user has a saved theme preference
                  const savedTheme = localStorage.getItem('theme') || 'dark';
                  
                  // Apply the theme to the HTML element
                  document.documentElement.className = savedTheme + '-theme';
                  
                  // Set the background and text color based on the theme
                  document.body.style.backgroundColor = 
                    savedTheme === 'light' ? '#ffffff' : '#000000';
                  document.body.style.color = 
                    savedTheme === 'light' ? '#000000' : '#ffffff';
                })();
              `,
            }}
          />
          
          {/* This is where our main app content will go */}
          <Main />
          
          {/* This loads all the necessary Next.js scripts */}
          <NextScript />
        </body>
      </Html>
    );
  }
}
