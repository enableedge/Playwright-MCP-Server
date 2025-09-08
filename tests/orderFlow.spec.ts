import { test, expect } from '@playwright/test';

test('Complete order flow on automationexercise.com', async ({ page }) => {
  // 1. Navigate to https://automationexercise.com
  await page.goto('https://automationexercise.com');

  // 2. Click on Signup/Login
  await page.waitForSelector('a[href="/login"]', { state: 'visible', timeout: 10000 });
  await page.click('a[href="/login"]');

  // 3. Fill email as ceo.nadella@example.com
  await page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address').fill('ceo.nadella@example.com');

  // 4. Fill password as ceo100microsoft
  await page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Password').fill('ceo100microsoft');

  // 5. Click Login
  await page.getByRole('button', { name: /Login/i }).click();

  // 6. Verify the text "Logged in as Satya Nadella"
  await expect(page.getByText('Logged in as Satya Nadella')).toBeVisible();

  // 7. Click on Products
  await page.getByRole('link', { name: /Products/i }).click();

  // 8. In the search box type "Men Tshirt"
  await page.getByPlaceholder('Search Product').fill('Men Tshirt');

  // 9. Click on the search icon
  await page.waitForSelector('button[type="submit"]', { state: 'visible', timeout: 10000 });
  await page.click('button[type="submit"]');

  // 10. Click on "Add to cart"
  await page.waitForSelector('a.add-to-cart', { state: 'visible', timeout: 10000 });
  await page.click('a.add-to-cart');

  // 11. Verify the text "Your product has been added to cart"
  await expect(page.getByText('Your product has been added to cart')).toBeVisible();

  // 12. Click on "View Cart"
  await page.getByRole('link', { name: /View Cart/i }).click();

  // 13. Click "Proceed to Checkout"
  await page.waitForSelector('a.check_out', { state: 'visible', timeout: 10000 });
  await page.click('a.check_out');

  // 14. Scroll Down and Click "Place Order"
  await page.waitForSelector('a[href="/payment"]', { state: 'visible', timeout: 10000 });
  await page.click('a[href="/payment"]');

  // 15. Verify Text "Payment"
  await expect(page.locator('h2.heading', { hasText: 'Payment' })).toBeVisible();

  // 16. Inside Name on Card Textbox Write "Satya Nadella"
  await page.waitForSelector('input[name="name_on_card"]', { state: 'visible', timeout: 10000 });
  await page.fill('input[name="name_on_card"]', 'Satya Nadella');

  // 17. Card Number Textbox write "1234 5678 9012"
  await page.waitForSelector('input[name="card_number"]', { state: 'visible', timeout: 10000 });
  await page.fill('input[name="card_number"]', '1234 5678 9012');

  // 18. CVC Textbox write "311"
  await page.waitForSelector('input[name="cvc"]', { state: 'visible', timeout: 10000 });
  await page.fill('input[name="cvc"]', '311');

  // 19. In MM Textbox write "12" and in YYYY Textbox write "2026"
  await page.getByPlaceholder('MM').fill('12');
  await page.getByPlaceholder('YYYY').fill('2026');

  // 20. Click Pay and Confirm Order
  await page.getByRole('button', { name: /Pay and Confirm Order/i }).click();

  // 21. Wait for the confirmation message to appear
  await page.waitForSelector('div:has-text("Congratulations! Your order has been confirmed!")', { state: 'visible', timeout: 15000 });
  // 22. Verify "Congratulations! Your order has been confirmed!"
  await expect(page.getByText('Congratulations! Your order has been confirmed!')).toBeVisible();

  // 23. Click Continue Button
  await page.waitForSelector('a.btn.btn-primary', { state: 'visible', timeout: 10000 });
  await page.click('a.btn.btn-primary');

  // 24. Click Logout on the top navbar
  await page.getByRole('link', { name: /Logout/i }).click();

  // 25. Verify Text "Login to your account"
  await expect(page.getByText('Login to your account')).toBeVisible();

  // 26. Close the browser
  await page.close();
});
