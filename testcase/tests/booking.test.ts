import { Page, test, expect } from '@playwright/test';
import { BaseTest } from './Basetset.ts'


test.describe('addBookin', () => {


    test('patient valid booking', async ({ page }) => {
        const baseTest = new BaseTest(page);
        await baseTest.navigateToSignIn();
        await baseTest.login('test01@gmail.com' , "Test01");
        await baseTest.navigateTobooking();
        await baseTest.verifyBookingPage();
        await baseTest.filldatabooking("Emma Considine" , "afternoon");
        await baseTest.VerifyCompleteBooking();
    });

    test('patient invalid date booking (past)', async ({ page }) => {
        const baseTest = new BaseTest(page);
        await baseTest.navigateToSignIn();
        await baseTest.login('test01@gmail.com' , "Test01");
        await baseTest.navigateTobooking();
        await baseTest.verifyBookingPage();
        await baseTest.filldatabooking("Emma Considine" , "morning");
    })
});
