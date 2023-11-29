const { Given, When, Then } = require('@wdio/cucumber-framework');
const { expect, $ } = require('@wdio/globals')

const LoginPage = require('../pageobjects/login.page');
const InventoryPage = require('../pageobjects/inventory.page');
const CartPage = require('../pageobjects/cart.page');

const standardUser = {
    username: 'standard_user',
    password: 'secret_sauce'
}

const pages = {
    login: LoginPage,
    inventory: InventoryPage,
    cart: CartPage
}

let productName;

Given(/^I am on the (\w+) page$/, async (page) => {
    await pages[page].open()
});

Given(/^I am logged in as a standard user$/, async () => {
    await LoginPage.open()
    await LoginPage.login(standardUser.username, standardUser.password)
});

When(/^I login with (\w+) and (.+)$/, async (username, password) => {
    await LoginPage.login(username, password)
});


Then(/^I should see inventory page$/, async () => {
    await expect(browser).toHaveUrl('https://www.saucedemo.com/inventory.html');
});

Then(/^I should see the 'Products' label$/, async () => {
    await expect(InventoryPage.pageLabel).toHaveText('Products');
});

Then(/^I should see shopping cart icon$/, async () => {
    await expect(InventoryPage.shoppingCart).toBeExisting();
});

Then(/^I should see more than 1 product$/, async () => {
    await expect(InventoryPage.products).toBeElementsArrayOfSize({ gte: 1 });
});

When(/^I add product to the cart$/, async () => {
    productName = await InventoryPage.products[0].$('.inventory_item_name').getText();
    await InventoryPage.products[0].$('.btn_inventory').click();
});

Then(/^I should see Shopping Cart icon contains the number of products added$/, async () =>{
    await expect(InventoryPage.shoppingCart.$('.shopping_cart_badge')).toHaveText('1');
});

Then(/^I should see the product in the cart$/, async () => {
    await InventoryPage.shoppingCart.click();
    await expect(CartPage.cartItems[0].$('.inventory_item_name')).toHaveText(productName);
});