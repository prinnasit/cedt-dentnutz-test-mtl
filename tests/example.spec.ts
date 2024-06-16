import { test, expect } from '@playwright/test';
import { beforeEach } from 'node:test';


test.beforeEach(async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc');
});



test.describe('register Tests', () => {

  test('has element', async ({ page }) => {
  
    await expect(page.locator('label[for="firstName"]')).toBeVisible();
    await expect(page.locator('label[for="lastName"]')).toBeVisible();
    await expect(page.locator('label[for="email"]')).toBeVisible();
    await expect(page.locator('label[for="password"]')).toBeVisible();
    await expect(page.locator('label[for="confirmPassword"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeHidden();
  });

test('test valid input', async ({ page }) => {

  await page.getByLabel('First Name *').fill('test01');
  await page.getByLabel('Last Name *').fill('case01');
  await page.getByLabel('Email Address *').fill('test01@gmail.com');
  await page.getByLabel('Telephone Number *').fill('80 111 2222');
  await page.getByLabel('Password *', { exact: true }).fill('Test01');
  await page.getByLabel('Confirm Password *').fill('Test01');

  
  await expect(page.locator('button[type="submit"]')).toBeVisible();

});

test('test null first name', async ({ page }) => {

  await page.getByLabel('Last Name *').fill('case01');
  await page.getByLabel('Email Address *').fill('test01@gmail.com');
  await page.getByLabel('Telephone Number *').fill('80 111 2222');
  await page.getByLabel('Password *', { exact: true }).fill('Test01');
  await page.getByLabel('Confirm Password *').fill('Test01');

  
  await expect(page.locator('button[type="submit"]')).toBeHidden();

});
test('test null Last  Name', async ({ page }) => {

  await page.getByLabel('First Name *').fill('test01');
  await page.getByLabel('Email Address *').fill('test01@gmail.com');
  await page.getByLabel('Telephone Number *').fill('80 111 2222');
  await page.getByLabel('Password *', { exact: true }).fill('Test01');
  await page.getByLabel('Confirm Password *').fill('Test01');

  
  await expect(page.locator('button[type="submit"]')).toBeHidden();

});

test('test null Telephone Number', async ({ page }) => {

  await page.getByLabel('First Name *').fill('test01');
  await page.getByLabel('Email Address *').fill('test01@gmail.com');
  await page.getByLabel('Password *', { exact: true }).fill('Test01');
  await page.getByLabel('Confirm Password *').fill('Test01');


  await expect(page.locator('button[type="submit"]')).toBeHidden();

});

test('test invalid Telephone Number', async ({ page }) => {

  await page.getByLabel('First Name *').fill('test01');
  await page.getByLabel('Last Name *').fill('case01');
  await page.getByLabel('Email Address *').fill('test01@gmail.com');
  await page.getByLabel('Telephone Number *').fill('123456789011');
  await page.getByLabel('Password *', { exact: true }).fill('Test01');
  await page.getByLabel('Confirm Password *').fill('Test01');

  
  await expect(page.locator('button[type="submit"]')).toBeHidden();

});

test('test null Email Address', async ({ page }) => {
  await page.getByLabel('First Name *').fill('test01');
  await page.getByLabel('Last Name *').fill('case01');
  await page.getByLabel('Telephone Number *').fill('123456789011');
  await page.getByLabel('Password *', { exact: true }).fill('Test01');
  await page.getByLabel('Confirm Password *').fill('Test01');

  
  await expect(page.locator('button[type="submit"]')).toBeHidden();
});

test('test invalid Email Address', async ({ page }) => {

  await page.getByLabel('First Name *').fill('test01');
  await page.getByLabel('Last Name *').fill('case01');
  await page.getByLabel('Email Address *').fill('testcase');
  await page.getByLabel('Telephone Number *').fill('80 111 2222');
  await page.getByLabel('Password *', { exact: true }).fill('Test01');
  await page.getByLabel('Confirm Password *').fill('Test01');

  
  await expect(page.locator('button[type="submit"]')).toBeHidden();

});
test('test null Password', async ({ page }) => {

  await page.getByLabel('First Name *').fill('test01');
  await page.getByLabel('Last Name *').fill('case01');
  await page.getByLabel('Email Address *').fill('test01@gmail.com');
  await page.getByLabel('Telephone Number *').fill('80 111 2222');
  await page.getByLabel('Confirm Password *').fill('Test01');

  
  await expect(page.locator('button[type="submit"]')).toBeHidden();

});
test('test invalid Password no uppercase letter', async ({ page }) => {

  await page.getByLabel('First Name *').fill('test01');
  await page.getByLabel('Last Name *').fill('case01');
  await page.getByLabel('Email Address *').fill('test01@gmail.com');
  await page.getByLabel('Telephone Number *').fill('80 111 2222');
  await page.getByLabel('Password *', { exact: true }).fill('test01');
  await page.getByLabel('Confirm Password *').fill('Test01');

  
  await expect(page.locator('button[type="submit"]')).toBeHidden();

});

  });
