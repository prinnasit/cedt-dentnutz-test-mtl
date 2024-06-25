import { test, expect } from '@playwright/test';


test.beforeEach(async ({ page }) => {
  await page.goto('https://frontendsw-mtl.vercel.app/');
  await page.getByRole('link', { name: 'Register' }).click();
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

  
  expect(page.getByRole('button', { name: 'Sign In' })).toBeEnabled();
  await page.getByRole('button', { name: 'Sign In' }).click();
  
  await expect(page.getByLabel('Registration successful!')).toBeEnabled(); 
  await expect(page.getByRole('heading', { name: 'Registration successful!' })).toBeVisible();
  await page.getByRole('button', { name: '👍 OK!' }).click();
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
  await page.getByLabel('Confirm Password *').fill('test01');

  
  await expect(page.locator('button[type="submit"]')).toBeHidden();

});

test('test invalid Password no lowwer letter', async ({ page }) => {

  await page.getByLabel('First Name *').fill('test01');
  await page.getByLabel('Last Name *').fill('case01');
  await page.getByLabel('Email Address *').fill('test01@gmail.com');
  await page.getByLabel('Telephone Number *').fill('80 111 2222');
  await page.getByLabel('Password *', { exact: true }).fill('TEST01');
  await page.getByLabel('Confirm Password *').fill('TEST01');

  
  await expect(page.locator('button[type="submit"]')).toBeHidden();

});

test('test invalid Password no number ', async ({ page }) => {

  await page.getByLabel('First Name *').fill('test01');
  await page.getByLabel('Last Name *').fill('case01');
  await page.getByLabel('Email Address *').fill('test01@gmail.com');
  await page.getByLabel('Telephone Number *').fill('80 111 2222');
  await page.getByLabel('Password *', { exact: true }).fill('Testcase');
  await page.getByLabel('Confirm Password *').fill('Tasecase');

  
  await expect(page.locator('button[type="submit"]')).toBeHidden();

});

test('test invalid Password less than 6  ', async ({ page }) => {

  await page.getByLabel('First Name *').fill('test01');
  await page.getByLabel('Last Name *').fill('case01');
  await page.getByLabel('Email Address *').fill('test01@gmail.com');
  await page.getByLabel('Telephone Number *').fill('80 111 2222');
  await page.getByLabel('Password *', { exact: true }).fill('Test0');
  await page.getByLabel('Confirm Password *').fill('Test0');

  
  await expect(page.locator('button[type="submit"]')).toBeHidden();

});

test('test null confirm password  ', async ({ page }) => {

  await page.getByLabel('First Name *').fill('test01');
  await page.getByLabel('Last Name *').fill('case01');
  await page.getByLabel('Email Address *').fill('test01@gmail.com');
  await page.getByLabel('Telephone Number *').fill('80 111 2222');
  await page.getByLabel('Password *', { exact: true }).fill('Test01');

  
  await expect(page.locator('button[type="submit"]')).toBeHidden();

});

test('test invalid confirm password   ', async ({ page }) => {

  await page.getByLabel('First Name *').fill('test01');
  await page.getByLabel('Last Name *').fill('case01');
  await page.getByLabel('Email Address *').fill('test01@gmail.com');
  await page.getByLabel('Telephone Number *').fill('80 111 2222');
  await page.getByLabel('Password *', { exact: true }).fill('Test01');
  await page.getByLabel('Confirm Password *').fill('Test012');

  
  await expect(page.locator('button[type="submit"]')).toBeHidden();

});


test('test null confirm password', async ({ page }) => {

  await page.getByLabel('First Name *').fill('test01');
  await page.getByLabel('Last Name *').fill('case01');
  await page.getByLabel('Email Address *').fill('test01@gmail.com');
  await page.getByLabel('Telephone Number *').fill('80 111 2222');
  await page.getByLabel('Password *', { exact: true }).fill('Test01');

  
  await expect(page.locator('button[type="submit"]')).toBeHidden();

});

test('test null Telephone Number', async ({ page }) => {

  await page.getByLabel('First Name *').fill('test01');
  await page.getByLabel('Email Address *').fill('test01@gmail.com');
  await page.getByLabel('Password *', { exact: true }).fill('Test01');
  await page.getByLabel('Confirm Password *').fill('Test01');


  await expect(page.locator('button[type="submit"]')).toBeHidden();

});

test('test  Telephone Number (another nation)', async ({ page }) => {

  await page.getByLabel('First Name *').fill('test01');
  await page.getByLabel('Last Name *').fill('case01');
  await page.getByLabel('Email Address *').fill('test01@gmail.com');
  await page.getByLabel('Telephone Number *').fill('80 111 2222');
  await page.getByLabel('Select country').click();
  await page.getByTestId('option-NL').getByText('Netherlands').click();
  await page.getByLabel('Password *', { exact: true }).fill('Test01');
  await page.getByLabel('Confirm Password *').fill('Test01');

  
  await expect(page.locator('button[type="submit"]')).toBeEnabled();

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
test('test telephone number already exists', async ({ page }) => {

  await page.getByLabel('First Name *').fill('test01');
  await page.getByLabel('Last Name *').fill('case01');
  await page.getByLabel('Email Address *').fill('test02@gmail.com');
  await page.getByLabel('Telephone Number *').fill('80 111 2222');
  await page.getByLabel('Password *', { exact: true }).fill('Test01');
  await page.getByLabel('Confirm Password *').fill('Test01');

  expect(page.getByRole('button', { name: 'Sign In' })).toBeEnabled();
  await page.getByRole('button', { name: 'Sign In' }).click();

  
  

  await expect(page.getByRole('heading', { name: 'Registration successful!' })).toBeVisible();
  await page.getByRole('button', { name: '👍 OK!' }).click();

  await expect(page.getByLabel('Failed')).toBeEnabled();
  await expect(page.getByText('telephone number already in use')).toBeVisible();
  await expect(page.getByRole('button', { name: '👍 OK!' })).toBeEnabled();
});


test('test email already exists', async ({ page }) => {

  await page.getByLabel('First Name *').fill('test01');
  await page.getByLabel('Last Name *').fill('case01');
  await page.getByLabel('Email Address *').fill('test01@gmail.com');
  await page.getByLabel('Telephone Number *').fill('80 111 2222');
  await page.getByLabel('Password *', { exact: true }).fill('Test01');
  await page.getByLabel('Confirm Password *').fill('Test01');



  expect(page.getByRole('button', { name: 'Sign In' })).toBeEnabled();
  await page.getByRole('button', { name: 'Sign In' }).click();

  
  await expect(page.getByLabel('Failed')).toBeEnabled();
  await expect(page.getByRole('heading', { name: 'Failed' })).toBeVisible();
  await expect(page.getByText('Email already in use')).toBeVisible();
  await page.getByRole('button', { name: '👍 OK!' }).click();
});



});
