import { test, expect } from '@playwright/test';

const APP_URL = 'https://www.saucedemo.com/';
const USERNAME = 'standard_user';
const PASSWORD = 'secret_sauce';

const productSelectors = [
  'button[data-test="add-to-cart-sauce-labs-backpack"]',
  'button[data-test="add-to-cart-sauce-labs-bike-light"]',
];

async function login(page: any) {
  await page.goto(APP_URL);
  await page.fill('#user-name', USERNAME);
  await page.fill('#password', PASSWORD);
  await page.click('#login-button');
  await expect(page).toHaveURL(/inventory.html/);
}

async function addProductsToCart(page: any) {
  for (const selector of productSelectors) {
    await page.click(selector);
  }
  await expect(page.locator('.shopping_cart_badge')).toHaveText('2');
}

async function completeCheckoutInfo(page: any, firstName: string, lastName: string, postalCode: string) {
  await page.fill('#first-name', firstName);
  await page.fill('#last-name', lastName);
  await page.fill('#postal-code', postalCode);
  await page.click('input[data-test="continue"]');
}

test.describe('SauceDemo checkout workflow', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test('should review cart, complete checkout, and confirm order', async ({ page }) => {
    await addProductsToCart(page);
    await page.click('.shopping_cart_link');

    await expect(page).toHaveURL(/cart.html/);
    await expect(page.locator('.cart_item')).toHaveCount(2);
    await expect(page.locator('.cart_item .inventory_item_name')).toContainText([
      'Sauce Labs Backpack',
      'Sauce Labs Bike Light',
    ]);
    await expect(page.locator('.cart_item .inventory_item_price')).toContainText(['$29.99', '$9.99']);
    await expect(page.locator('button[data-test="checkout"]')).toBeVisible();

    await page.click('button[data-test="checkout"]');
    await expect(page).toHaveURL(/checkout-step-one.html/);
    await expect(page.locator('#first-name')).toBeVisible();
    await expect(page.locator('#last-name')).toBeVisible();
    await expect(page.locator('#postal-code')).toBeVisible();

    await completeCheckoutInfo(page, 'John', 'Doe', '12345');
    await expect(page).toHaveURL(/checkout-step-two.html/);

    await expect(page.locator('[data-test="payment-info-label"]')).toHaveText('Payment Information:');
    await expect(page.locator('[data-test="shipping-info-label"]')).toHaveText('Shipping Information:');
    await expect(page.locator('.summary_subtotal_label')).toHaveText('Item total: $39.98');
    await expect(page.locator('.summary_tax_label')).toHaveText(/Tax:/);
    await expect(page.locator('.summary_total_label')).toHaveText(/Total:/);

    await page.click('button[data-test="finish"]');
    await expect(page).toHaveURL(/checkout-complete.html/);
    await expect(page.locator('h2')).toHaveText('Thank you for your order!');
    await expect(page.locator('button[data-test="back-to-products"]')).toBeVisible();
  });

  test('should validate mandatory checkout information fields', async ({ page }) => {
    await addProductsToCart(page);
    await page.click('.shopping_cart_link');
    await expect(page).toHaveURL(/cart.html/);
    await page.click('button[data-test="checkout"]');
    await expect(page).toHaveURL(/checkout-step-one.html/);

    await page.click('input[data-test="continue"]');
    await expect(page.locator('h3')).toHaveText('Error: First Name is required');

    await page.fill('#first-name', 'John');
    await page.click('input[data-test="continue"]');
    await expect(page.locator('h3')).toHaveText('Error: Last Name is required');

    await page.fill('#last-name', 'Doe');
    await page.click('input[data-test="continue"]');
    await expect(page.locator('h3')).toHaveText('Error: Postal Code is required');
  });

  test('should cancel checkout and return to cart without losing items', async ({ page }) => {
    await addProductsToCart(page);
    await page.click('.shopping_cart_link');
    await expect(page).toHaveURL(/cart.html/);
    await page.click('button[data-test="checkout"]');
    await expect(page).toHaveURL(/checkout-step-one.html/);

    await page.click('button[data-test="cancel"]');
    await expect(page).toHaveURL(/cart.html/);
    await expect(page.locator('.cart_item')).toHaveCount(2);
    await expect(page.locator('.shopping_cart_badge')).toHaveText('2');
  });
});
