# SauceDemo Checkout Test Plan

## Overview
This test plan covers the SCRUM-101 e-commerce checkout workflow for Sauce Demo at `https://www.saucedemo.com`.
The plan validates cart review, checkout information entry, order overview, order completion, and error handling.

## Application Details
- URL: https://www.saucedemo.com
- Test credentials:
  - Username: `standard_user`
  - Password: `secret_sauce`

## Scope
- Cart contents and pricing review
- Checkout information page validations
- Checkout overview summary and total calculation
- Order completion confirmation
- Checkout cancellation and navigation flow
- Validation of mandatory fields and required error messages

## Test Cases

### TC01: Cart Review
**Title:** Verify cart review displays items, price details, and checkout options

**Preconditions:** User is logged in and has products added to cart

**Steps:**
1. Navigate to `https://www.saucedemo.com`
2. Login with `standard_user` / `secret_sauce`
3. Add `Sauce Labs Backpack` and `Sauce Labs Bike Light` to the cart
4. Click the cart icon

**Expected Results:**
- Cart page loads with the selected items
- Each item shows name, description, quantity, and price
- The cart total is displayed as `Item total: $39.98`
- Checkout and Continue Shopping buttons are visible

### TC02: Checkout Information Required Fields
**Title:** Validate that checkout information fields are mandatory

**Preconditions:** User is on the cart page with items in cart

**Steps:**
1. Click `Checkout`
2. On the checkout information page, click `Continue` with all fields empty
3. Observe the error message
4. Fill only `First Name` and click `Continue`
5. Fill only `First Name` and `Last Name` and click `Continue`

**Expected Results:**
- Error message appears: `Error: First Name is required`
- After filling first name only, error updates to `Error: Last Name is required`
- After filling first name and last name only, error updates to `Error: Postal Code is required`

### TC03: Order Overview Display
**Title:** Verify order overview page shows items, payment, shipping, and totals

**Preconditions:** Valid checkout information entered

**Steps:**
1. Complete checkout information with valid data
2. Click `Continue`

**Expected Results:**
- Page redirects to `checkout-step-two.html`
- The order overview includes the selected items and quantity
- Payment information is displayed as `SauceCard #31337`
- Shipping information is displayed as `Free Pony Express Delivery!`
- Subtotal, tax, and total amounts are shown
- Cancel and Finish buttons are visible

### TC04: Order Completion
**Title:** Verify order completion success message and back navigation

**Preconditions:** User is on the order overview page

**Steps:**
1. Click `Finish`
2. Verify the confirmation page
3. Click `Back Home`

**Expected Results:**
- Redirect to `checkout-complete.html`
- Confirmation text `Thank you for your order!` is visible
- The `Back Home` button is visible and returns user to products page
- Cart count resets or no longer contains the previous order items

### TC05: Checkout Cancellation
**Title:** Verify cancel action returns user to cart from checkout information

**Preconditions:** User is on the checkout information page

**Steps:**
1. Click `Cancel`

**Expected Results:**
- User returns to the cart page
- Cart contents remain unchanged

### TC06: Invalid Checkout Data Handling
**Title:** Validate error handling for invalid checkout input data

**Preconditions:** User is on the checkout information page

**Steps:**
1. Enter invalid values such as `!@#` for First Name and `12` for Postal Code
2. Click `Continue`

**Expected Results:**
- Appropriate validation error messages are displayed for invalid data
- User cannot proceed until all fields are valid

## Test Data
- First Name: `John`
- Last Name: `Doe`
- Postal Code: `12345`
- Products: `Sauce Labs Backpack`, `Sauce Labs Bike Light`

## Notes
- Use stable selectors such as data-test attributes and input IDs
- Execute across Chrome, Firefox, and Safari
- Record any deviations from acceptance criteria
- Capture page screenshots during checkout and confirmation
