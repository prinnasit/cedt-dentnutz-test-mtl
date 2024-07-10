import { test , expect } from '@playwright/test';
import { BaseTest } from './Basetset.ts';


test.describe('view Profile', () => {

    test('patient can see  Profile', async ({ page }) => {
        const baseTest = new BaseTest(page);
        await baseTest.navigateToSignIn();
        await baseTest.login('test01@gmail.com' , "Test01");
        await baseTest.navigateToProfile();
        await baseTest.check_data_profile('test01 case01','test01@gmail.com', '080-111-2222')

    });


    test('check elements in Profile', async ({ page }) => {
        const baseTest = new BaseTest(page);
        await baseTest.navigateToSignIn();
        await baseTest.login('test01@gmail.com' , "Test01");
        await baseTest.navigateToProfile();
        await expect(baseTest.page.getByRole('table')).toBeVisible();
        await expect(baseTest.page.getByRole('cell', { name: 'Name :' })).toBeVisible();
        await expect(baseTest.page.getByRole('cell', { name: 'Email :' })).toBeVisible();
        await expect(baseTest.page.getByRole('cell', { name: 'Tel :' })).toBeVisible();
});

    test('admin can see  Profile', async ({ page }) => {
    
        const baseTest = new BaseTest(page);
        await baseTest.navigateToSignIn();
        await baseTest.login('admin@gmail.com' , "123456");
        await baseTest.navigateToProfile();
        await baseTest.check_data_profile( 'admin01'  , 'admin@gmail.com' ,'945-529-8211')
    })

    test('dentist can not see  Profile', async ({ page }) => {
        const baseTest = new BaseTest(page);
        await baseTest.navigateToSignIn();
        await baseTest.login('dentist01@gmail.com' , "Test01");
        await baseTest.navigateToProfile();
        await baseTest.check_data_profile('Emma Considine' , 'dentist01@gmail.com' , '012-346-5444' )
    });


    test('unsign can not see  Profile', async ({ page }) => {
        const baseTest = new BaseTest(page);
        await baseTest.page.goto('https://frontendsw-mtl.vercel.app/myaccount');        
        await baseTest.page.waitForFunction(() => window.location.href === 'https://frontendsw-mtl.vercel.app/api/auth/signin?callbackUrl=%2Fmyaccount');
        
        // Check if the URL is redirected to the signin page
        expect(baseTest.page.url()).toBe('https://frontendsw-mtl.vercel.app/api/auth/signin?callbackUrl=%2Fmyaccount');
    });

});