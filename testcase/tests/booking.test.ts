import { Page, test, expect } from '@playwright/test';
import { BaseTest } from './Basetset.ts'


test.describe('addBookin', () => {


    test('patient valid booking', async ({ page }) => {
        const baseTest = new BaseTest(page);
        await baseTest.navigateToSignIn();
        await baseTest.login('test01@gmail.com' , "Test01");
        await baseTest.navigateTobooking();
        await baseTest.verifyBookingPage();
        await baseTest.filldatabooking("Emma Considine" , "morning" , '27' , 6 , '2025' , false);
        await baseTest.VerifyCompleteBooking();
    });

    test('patient invalid date booking (past)', async ({ page }) => {
        const baseTest = new BaseTest(page);
        await baseTest.navigateToSignIn();
        await baseTest.login('test01@gmail.com' , "Test01");
        await baseTest.navigateTobooking();
        await baseTest.filldatabooking("Emma Considine" , "morning", '27' , 6 , '2023' , true);
        await baseTest.VerifyFailBooking("past");
    })

    test('patient invalid date booking (data invalid)', async ({ page }) => {
        const baseTest = new BaseTest(page);
        await baseTest.navigateToSignIn();
        await baseTest.login('test01@gmail.com' , "Test01");
        await baseTest.navigateTobooking();
        await baseTest.filldatabooking("Emma Considine" , "morning", '99' , 99 , '9999' , true);
        await baseTest.VerifyFailBooking("invalid");
    })

    test('patient incomplete booking (Dentist)', async ({ page }) => {
        const baseTest = new BaseTest(page);
        await baseTest.navigateToSignIn();
        await baseTest.login('test01@gmail.com' , "Test01");
        await baseTest.navigateTobooking();
        await baseTest.filldatabooking(null , "morning", '27' , 6 , '2025' , true);
        await baseTest.VerifyIncompleteBooking("dentist");
    })

    
    test('patient incomplete booking (date)', async ({ page }) => {
        const baseTest = new BaseTest(page);
        await baseTest.navigateToSignIn();
        await baseTest.login('test01@gmail.com' , "Test01");
        await baseTest.navigateTobooking();
        await baseTest.filldatabooking("Emma Considine" ,"morning", null , null , null , true);
        await baseTest.VerifyIncompleteBooking("date")
    })

    
    test('patient incomplete booking (time)', async ({ page }) => {
        const baseTest = new BaseTest(page);
        await baseTest.navigateToSignIn();
        await baseTest.login('test01@gmail.com' , "Test01");
        await baseTest.navigateTobooking();
        await baseTest.filldatabooking("Emma Considine" , null, '27' , 6 , '2025' , true);
        await baseTest.VerifyIncompleteBooking("time")
    })

    
    test('patient incomplete booking (all)', async ({ page }) => {
        const baseTest = new BaseTest(page);
        await baseTest.navigateToSignIn();
        await baseTest.login('test01@gmail.com' , "Test01");
        await baseTest.navigateTobooking();
        await baseTest.filldatabooking(null , null,null ,null , null , true);
        await baseTest.VerifyIncompleteBooking("all")
    })

    //patien booking dentist and date that already exists
    test('patient booking dentist and date that already exists', async ({ page }) => {
        const baseTest = new BaseTest(page);
        await baseTest.navigateToSignIn();
        await baseTest.login('test02@gmail.com' , "Test01");
        await baseTest.navigateTobooking();
        await baseTest.filldatabooking("Emma Considine" , "morning", '27' , 6 , '2025' , false);
        await baseTest.VerifyFailBooking("exist");
    })

    //patien can not booking more than 1 appointment 
    test('patient booking more than 1 appointment', async ({ page }) => {
        const baseTest = new BaseTest(page);
        await baseTest.navigateToSignIn();
        await baseTest.login('test01@gmail.com' , "Test01");
        await baseTest.navigateTobooking();
        await baseTest.filldatabooking("Emma Considine" , "morning", '27' , 7 , '2025' , false);
        await baseTest.VerifyFailBooking("morethan1");
    });

    //admin can not booking
    test('admin can not booking', async ({ page }) => {
        const baseTest = new BaseTest(page);
        await baseTest.navigateToSignIn();
        await baseTest.login('admin@gmail.com' , '123456')
        await baseTest.page.goto('https://frontendsw-mtl.vercel.app/makeappointment');
        await baseTest.page.waitForURL('https://frontendsw-mtl.vercel.app/');
        expect(baseTest.page.url()).toBe('https://frontendsw-mtl.vercel.app/');
    });

   // dentist can not booking
    test('dentist can not booking', async ({ page }) => {
        const baseTest = new BaseTest(page);
        await baseTest.navigateToSignIn();
        await baseTest.login('dentist01@gmail.com' , 'Test01')
        await baseTest.page.goto('https://frontendsw-mtl.vercel.app/makeappointment');
        await baseTest.page.waitForURL('https://frontendsw-mtl.vercel.app/');
        expect(baseTest.page.url()).toBe('https://frontendsw-mtl.vercel.app/');
    });


}); 

test.describe('viewBooking', () => {

    test('check element', async ({ page }) => {
        const baseTest = new BaseTest(page);
        await baseTest.navigateToSignIn();
        await baseTest.login('test01@gmail.com' , "Test01");
        await baseTest.navigateToappointment();
        await baseTest.VerifyAppointmentPage();
    });
});
