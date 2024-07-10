import { Page, test, expect } from '@playwright/test';
import { BaseTest } from './Basetset.ts'



// schedule page can see on day , week , month
// patient can see  his appoinment in schedule page 
// admin can see all appoinment in schedule page
// unsignin can not view schedule 
// dentist can see his patient appoinment in schedule page

test.describe('view appointment in schedule', () => {
    
        test('schedule page can see on day , week , month', async ({ page }) => {
            const baseTest = new BaseTest(page);
            await baseTest.navigateToSignIn();
            await baseTest.login('admin@gmail.com' , "123456");
            await baseTest.navigateToSchedule();
            await baseTest.check_schedule();
            await await expect(baseTest.page.getByText('Month')).toBeVisible();
            await baseTest.page.getByText('Month').click();
            await baseTest.page.getByRole('option', { name: 'Week' }).click();
            
            await expect(baseTest.page.getByText('Week')).toBeVisible();
            await baseTest.page.getByText('Week').click();
            await baseTest.page.getByRole('option', { name: 'Day' }).click();
            await expect(baseTest.page.getByText('Day')).toBeVisible();


            //chekc day weel month 
        });


        test('patient can see  his appoinment in schedule page', async ({ page }) => {
            const baseTest = new BaseTest(page);
            await baseTest.navigateToSignIn();
            await baseTest.login('test01@gmail.com' , "Test01");
            await baseTest.page.goto('https://frontendsw-mtl.vercel.app/schedule');
        });

        test('admin can see all appoinment in schedule page', async ({ page }) => {
            const baseTest = new BaseTest(page);
            await baseTest.navigateToSignIn();
            await baseTest.login('admin@gmail.com ' , "123456");
            await baseTest.navigateToSchedule();
            await baseTest.check_schedule();
            await baseTest.check_appointment_schedule();
        });

        test('unsignin can not view schedule', async ({ page }) => {
            const baseTest = new BaseTest(page);

            
        });



});
