import { test, expect } from "@playwright/test";

// Test to validate that the Login page is displayed and works correctly
test("should display Online page for authentication", async ({ page }) => {
  // Navigate to the login page
  await page.goto("http://localhost:3000/login");

  // Check if the Login input fields are visible
  await expect(page.getByPlaceholder("Username")).toBeVisible();
  await expect(page.getByPlaceholder("Password")).toBeVisible();

  // Fill in login details
  await page.getByPlaceholder("Username").click();
  await page.getByPlaceholder("Username").fill("sandhya");
  await page.getByPlaceholder("Password").click();
  await page.getByPlaceholder("Password").fill("sandhya");

  // Click the Login button
  await page.getByRole("button", { name: "Login" }).click();

  // Verify that the user is redirected to the home page
  await expect(page.getByRole('link', { name: 'BURGER Home' })).toBeVisible();

  // Verify that a menu item is displayed
  await expect(page.getByRole("link", { name: "Burger A $4.99" })).toBeVisible();
});

// Test to validate that the home page displays menu cards
test("should display home page with cards", async ({ page }) => {
  // Navigate to the login page and log in
  await page.goto("http://localhost:3000/login");
  await page.getByPlaceholder("Username").fill("sandhya");
  await page.getByPlaceholder("Password").fill("sandhya");
  await page.getByRole("button", { name: "Login" }).click();

  // Verify that the home page displays menu cards
  await expect(page.getByRole('link', { name: 'BURGER Home' })).toBeVisible();
  await expect(page.getByRole("link", { name: "Burger A $4.99" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Black Burger $5.99" })).toBeVisible();
});

// Test to validate that clicking a menu item opens the product detail page
test("on click item should display product details page", async ({ page }) => {
  // Navigate to the login page and log in
  await page.goto("http://localhost:3000/login");
  await page.getByPlaceholder("Username").fill("sandhya");
  await page.getByPlaceholder("Password").fill("sandhya");
  await page.getByRole("button", { name: "Login" }).click();

  // Click on a menu item and verify the product detail page
  await page.getByRole('link', { name: 'Burger A $4.99' }).click();
  await page.goto("http://localhost:3000/product/1");
  await expect(page.getByText('Burger APrice: $4.99A classic')).toBeVisible();
  await expect(page.getByText('Nutrition: 760 calories')).toBeVisible();
  await expect(page.getByText('← Go Back')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Add to Cart' })).toBeVisible();
});

// Test to validate that clicking "Add to Cart" adds the item to the cart
test("on click Add to cart will add items to cart", async ({ page }) => {
  // Navigate to the login page and log in
  await page.goto("http://localhost:3000/login");
  await page.getByPlaceholder("Username").fill("sandhya");
  await page.getByPlaceholder("Password").fill("sandhya");
  await page.getByRole("button", { name: "Login" }).click();

  // Add item to cart from the product detail page
  await page.getByRole("link", { name: "Burger A $4.99" }).click();
  await page.goto("http://localhost:3000/product/1");
  await page.getByRole("button", { name: "Add to Cart" }).click();

  // Navigate to the cart page and verify the item is added
  await page.getByRole('link', { name: 'Cart' }).click();
  await page.goto("http://localhost:3000/cart");
  await expect(page.getByText('Total:$')).toBeVisible(); // Verify total price
});

// Test to validate that cart item quantity can be updated
test("should update cart quantity", async ({ page }) => {
  test.setTimeout(60000); // Increase timeout for this test

  // Navigate to the login page and log in
  await page.goto("http://localhost:3000/login");
  await page.getByPlaceholder("Username").fill("sandhya");
  await page.getByPlaceholder("Password").fill("sandhya");
  await page.getByRole("button", { name: "Login" }).click();

  // Add item to cart from the product detail page
  await page.getByRole("link", { name: "Burger A $4.99" }).click();
  await page.goto("http://localhost:3000/product/1");
  await page.getByRole("button", { name: "Add to Cart" }).click();

  // Navigate to the cart page and verify the quantity update
  await page.getByRole('link', { name: 'Cart' }).click();
  await expect(page.getByText('-1+')).toBeVisible();
  await page.getByRole('button', { name: '+' }).click(); // Increase quantity
  await expect(page.getByText('-2+')).toBeVisible();
  await page.getByRole('button', { name: '-' }).click(); // Decrease quantity
  await expect(page.getByText('-1+')).toBeVisible();
  await page.getByRole('button', { name: '-' }).click(); // Remove item
  await expect(page.getByText('Your cart is empty.')).toBeVisible();
});
