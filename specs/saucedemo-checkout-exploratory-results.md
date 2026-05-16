# SauceDemo Checkout Exploratory Results

## Summary
Manual exploratory testing was performed for the SauceDemo checkout flow using `standard_user` / `secret_sauce`.
The workflow was validated from product selection through order confirmation.

## Findings

### Login and Cart Setup
- Successfully logged in at `https://www.saucedemo.com`
- Added `Sauce Labs Backpack` and `Sauce Labs Bike Light` to cart
- Cart badge updated to `2`
- Cart page displayed both items with names, descriptions, quantity, price, and a visible checkout button

### Checkout Information Page
- Navigated to `checkout-step-one.html`
- The page presented required inputs: `First Name`, `Last Name`, `Zip/Postal Code`
- Leaving all fields empty and clicking `Continue` produced `Error: First Name is required`
- Filling first name only produced continued validation for missing last name and postal code
- Entered invalid characters in first name (`!@#`) and an incomplete postal code (`12`)
- The application did not block invalid characters or partial postal code values; only non-empty validation was enforced

### Order Overview Page
- After valid checkout data, navigated to `checkout-step-two.html`
- Order overview displayed selected items, payment information, shipping information, item total, tax, and total
- `Payment Information` text was `SauceCard #31337`
- `Shipping Information` text was `Free Pony Express Delivery!`
- Cancel and Finish buttons were visible

### Order Confirmation Page
- Clicking `Finish` redirected to `checkout-complete.html`
- Confirmation text `Thank you for your order!` was visible
- `Back Home` button returned the user to the product inventory page

## Issues / Gaps
- AC5 expectation for invalid data handling was not fully implemented by the application: special characters and short postal code were accepted as long as fields were non-empty
- No evidence of explicit validation for invalid formats beyond required-field checks

## Selectors Used
- `#user-name`, `#password`, `#login-button`
- `button[data-test='add-to-cart-sauce-labs-backpack']`
- `button[data-test='add-to-cart-sauce-labs-bike-light']`
- `a.shopping_cart_link`
- `button[data-test='checkout']`
- `#first-name`, `#last-name`, `#postal-code`
- `input[data-test='continue']`
- `button[data-test='finish']`
- `button[data-test='back-to-products']`
