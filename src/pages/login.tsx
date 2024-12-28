import { useRouter } from 'next/router';
import { useState } from 'react';

// This is our Login page component
export default function Login() {
  // We're using state to keep track of what the user types in the username field
  const [username, setUsername] = useState('');
  // Same thing for the password field
  const [password, setPassword] = useState('');
  // This lets us programmatically navigate to other pages
  const router = useRouter();

  // This function runs when the user clicks the login button
  const handleLogin = () => {
    // We're checking if both username and password fields have been filled
    if (username && password) {
      // In a real app, we'd check these credentials against a database
      // For now, we're just pretending the login was successful
      localStorage.setItem('isAuthenticated', 'true');
      // After "logging in", we send the user to the home page
      router.replace('/');
    } else {
      // If either field is empty, we show an alert
      alert('Please enter a username and password.');
    }
  };

  // Here's what our login page looks like
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {/* Username input field */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-72 p-3 rounded border bg-gray-200"
        />
      </div>
      {/* Password input field */}
      <div className="mb-4">
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-72 p-3 rounded border bg-gray-200"
        />
      </div>
      {/* Login button */}
      <button
        onClick={handleLogin}
        className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Login
      </button>
    </div>
  );
}
