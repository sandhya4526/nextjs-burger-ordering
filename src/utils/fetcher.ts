// Utility function to fetch data with error handling
export const fetcher = async (url: string) => {
  try {
    const response = await fetch(url); // Fetch data from the provided URL
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.status}`); // Handle non-OK response
    }
    return await response.json(); // Parse JSON response
  } catch (error) {
    console.error('Fetcher Error:', error); // Log any errors
    throw error; // Re-throw error to be handled by the caller
  }
};
