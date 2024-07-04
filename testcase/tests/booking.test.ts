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
        await baseTest.VerifyComplete('Appointment booked successfully');
    });

    test('patient invalid date booking (past)', async ({ page }) => {
        const baseTest = new BaseTest(page);
        await baseTest.navigateToSignIn();
        await baseTest.login('test01@gmail.com' , "Test01");
        await baseTest.navigateTobooking();
        await baseTest.filldatabooking("Emma Considine" , "morning", '27' , 6 , '2023' , true);
        await baseTest.VerifyFail("Cannot book appointment in the past");
    })

    test('patient invalid date booking (data invalid)', async ({ page }) => {
        const baseTest = new BaseTest(page);
        await baseTest.navigateToSignIn();
        await baseTest.login('test01@gmail.com' , "Test01");
        await baseTest.navigateTobooking();
        await baseTest.filldatabooking("Emma Considine" , "morning", '99' , 99 , '9999' , true);
        await baseTest.VerifyFail("Failed to add appointment");
    })

    test('patient incomplete booking (Dentist)', async ({ page }) => {
        const baseTest = new BaseTest(page);
        await baseTest.navigateToSignIn();
        await baseTest.login('test01@gmail.com' , "Test01");
        await baseTest.navigateTobooking();
        await baseTest.filldatabooking(null , "morning", '27' , 6 , '2025' , true);
        await baseTest.VerifyIncomplete('Please select dentist');
    })

    
    test('patient incomplete booking (date)', async ({ page }) => {
        const baseTest = new BaseTest(page);
        await baseTest.navigateToSignIn();
        await baseTest.login('test01@gmail.com' , "Test01");
        await baseTest.navigateTobooking();
        await baseTest.filldatabooking("Emma Considine" ,"morning", null , null , null , true);
        await baseTest.VerifyIncomplete('Please select date for appointment')
    })

    
    test('patient incomplete booking (time)', async ({ page }) => {
        const baseTest = new BaseTest(page);
        await baseTest.navigateToSignIn();
        await baseTest.login('test01@gmail.com' , "Test01");
        await baseTest.navigateTobooking();
        await baseTest.filldatabooking("Emma Considine" , null, '27' , 6 , '2025' , true);
        await baseTest.VerifyIncomplete('Please select date for appointment')
    })

    
    test('patient incomplete booking (all)', async ({ page }) => {
        const baseTest = new BaseTest(page);
        await baseTest.navigateToSignIn();
        await baseTest.login('test01@gmail.com' , "Test01");
        await baseTest.navigateTobooking();
        await baseTest.filldatabooking(null , null,null ,null , null , true);
        await baseTest.VerifyIncomplete('Please select dentist')
    })

    //patien booking dentist and date that already exists
    test('patient booking dentist and date that already exists', async ({ page }) => {
        const baseTest = new BaseTest(page);
        await baseTest.navigateToSignIn();
        await baseTest.login('test02@gmail.com' , "Test01");
        await baseTest.navigateTobooking();
        await baseTest.filldatabooking("Emma Considine" , "morning", '27' , 6 , '2025' , false);
        await baseTest.VerifyFail("Appointment date and dentist already exists");
    })

    //patien can not booking more than 1 appointment 
    test('patient booking more than 1 appointment', async ({ page }) => {
        const baseTest = new BaseTest(page);
        await baseTest.navigateToSignIn();
        await baseTest.login('test01@gmail.com' , "Test01");
        await baseTest.navigateTobooking();
        await baseTest.filldatabooking("Emma Considine" , "morning", '27' , 7 , '2025' , false);
        await baseTest.VerifyFail("Cannot book more than 1 appointment");
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
