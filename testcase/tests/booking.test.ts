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
        await baseTest.VerifyPatientAppointmentPage();
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

    test('patient see his appoinment', async ({ page }) => {
        const baseTest = new BaseTest(page);
        await baseTest.navigateToSignIn();
        await baseTest.login('test01@gmail.com' , "Test01");
        await baseTest.navigateToappointment();
        await baseTest.VerifyPatientAppointmentPage();
    });

    test('patient not see his appoinment (no appointment)', async ({ page }) => {
        const baseTest = new BaseTest(page);
        await baseTest.navigateToSignIn();
        await baseTest.login('test01@gmail.com' , "Test01");
        await baseTest.navigateToappointment();
        await expect(page.getByText('You don\'t have any appointment')).toBeVisible();
        await expect(page.getByText('We\'re waiting you for join us')).toBeVisible();
    });

    //dentist see all appoinment that select him as a doctor
    test('dentist see all appoinment that select him as a doctor', async ({ page }) => {
        const baseTest = new BaseTest(page);
        await baseTest.navigateToSignIn();
        await baseTest.login('dentist01@gmail.com' , "Test01");
        await baseTest.navigateToappointment();
        await baseTest.VerifyDentistOrAdminAppointment('dentist');
    });

    //dentist does not see appoinment (does not have any booking)
    test('dentist does not see appoinment (does not have any booking)', async ({ page }) => {
        const baseTest = new BaseTest(page);
        await baseTest.navigateToSignIn();
        await baseTest.login('dentist01@gmail.com' , "Test01");
        await baseTest.navigateToappointment();
        await expect(page.getByText('You don\'t have any appointment')).toBeVisible();
        await expect(page.getByRole('heading', { name: 'Appointments' })).toBeVisible();
    });

    //admin see all appoinment 
    test('admin see all appoinment', async ({ page }) => {
        const baseTest = new BaseTest(page);
        await baseTest.navigateToSignIn();
        await baseTest.login('admin@gmail.com' , '123456')
        await baseTest.navigateToappointment();
        await baseTest.VerifyDentistOrAdminAppointment('admin');
    });
    
});

//edit booking
test.describe('editBooking', () => {

    test('patient edit his appoinment', async ({ page }) => {
        const baseTest = new BaseTest(page);
        await baseTest.navigateToSignIn();
        await baseTest.login('test01@gmail.com' , "Test01");
        await baseTest.navigateToappointment();
        await baseTest.editAppointment('Emma Considine' , 'afternoon' , 27 , 7 , 2026 , false);
        await baseTest.VerifyCompleteBooking(true);
    });

    // /patient invalid edit his appoinment( dentist and date that already exists)
    test('patient invalid edit his appoinment( dentist and date that already exists)', async ({ page }) => {
        const baseTest = new BaseTest(page);
        await baseTest.navigateToSignIn();
        await baseTest.login('test01@gmail.com' , "Test01");
        await baseTest.navigateToappointment();
        await baseTest.editAppointment('Emma Considine' , 'afternoon' , 28 , 6 , 2025 , false);
        await baseTest.VerifyFailBooking("exist");
    });

    //patient invalid edit his appoinment( past )
    test('patient invalid edit his appoinment( past )', async ({ page }) => {
        const baseTest = new BaseTest(page);
        await baseTest.navigateToSignIn();
        await baseTest.login('test01@gmail.com' , "Test01");
        await baseTest.navigateToappointment();
        await baseTest.editAppointment('Emma Considine' , 'afternoon' , 27 , 6 , 2023 , true);
        await baseTest.VerifyFailBooking("past");
    });

    //patient invalid edit his appoinment( doesn't change data)
    test('patient invalid edit his appoinment( doesn\'t change data )', async ({ page }) => {
        const baseTest = new BaseTest(page);
        await baseTest.navigateToSignIn();
        await baseTest.login('test01@gmail.com' , "Test01");
        await baseTest.navigateToappointment();
        await baseTest.page.getByRole('button', { name: 'Edit Appointment' }).click();
        await baseTest.page.getByRole('button', { name: 'Submit Changes' }).click();
        await baseTest.VerifyFailBooking("does not change");
    });

    //admin can edit all appoinment(valid)
    test('admin can edit all appoinment(valid)', async ({ page }) => {
        const baseTest = new BaseTest(page);
        await baseTest.navigateToSignIn();
        await baseTest.login('admin@gmail.com' , '123456')
        await baseTest.navigateToappointment();
        await page.getByRole('link', { name: 'Edit', exact: true }).click();
        await baseTest.filldatabooking("Emma Considine" , "morning", '27' , 12 , '2025' , false);
        await baseTest.VerifyCompleteBooking(true);
        
    });

    //admin invalid edit appoinment( dentist and date that already exists)
    test('admin invalid edit appoinment( dentist and date that already exists)', async ({ page }) => {
        const baseTest = new BaseTest(page);
        await baseTest.navigateToSignIn();
        await baseTest.login('admin@gmail.com' , '123456')
        await baseTest.navigateToappointment();
        await page.getByRole('link', { name: 'Edit', exact: true }).click();
        await baseTest.filldatabooking("Emma Considine" , "morning", '29' , 6 , '2025' , false);
        await baseTest.VerifyFailBooking("exist");
    });

    //admin invalid edit his appoinment( past )
    test('admin invalid edit his appoinment( past )', async ({ page }) => {
        const baseTest = new BaseTest(page);
        await baseTest.navigateToSignIn();
        await baseTest.login('admin@gmail.com' , '123456')
        await baseTest.navigateToappointment();
        await page.getByRole('link', { name: 'Edit', exact: true }).click();
        await baseTest.filldatabooking("Emma Considine" , "morning", '27' , 12 , '2023' , true);
        await baseTest.VerifyFailBooking("past");
    });

    //admin invalid edit happoinment( doesn't change data)
    test('admin invalid edit happoinment( doesn\'t change data )', async ({ page }) => {
        const baseTest = new BaseTest(page);
        await baseTest.navigateToSignIn();
        await baseTest.login('admin@gmail.com' , '123456')
        await baseTest.navigateToappointment();
        await page.getByRole('link', { name: 'Edit', exact: true }).click();
        await baseTest.page.getByRole('button', { name: 'Submit Changes' }).click();
        await baseTest.VerifyFailBooking("does not change");
    });
});



test.describe('deleteBooking', () => {
    //patient delete his appoinment
    test('patient delete his appoinment', async ({ page }) => {
        const baseTest = new BaseTest(page);
        await baseTest.navigateToSignIn();
        await baseTest.login('test01@gmail.com' , "Test01");
        await baseTest.navigateToappointment();
        await baseTest.page.getByRole('button', { name: 'Cancel' }).click();
        await baseTest.Suretocancel(true)
        await baseTest.VerifyCancelAppointment();
    });

    //patient does not delete his appoinment
    test('patient does not delete his appoinment', async ({ page }) => {
        const baseTest = new BaseTest(page);
        await baseTest.navigateToSignIn();
        await baseTest.login('test01@gmail.com' , "Test01");
        await baseTest.navigateToappointment();
        await baseTest.page.getByRole('button', { name: 'Cancel' }).click();
        await baseTest.Suretocancel(false)
    });

    //admin can delete any appoinment
    test('admin can delete any appoinment', async ({ page }) => {
        const baseTest = new BaseTest(page);
        await baseTest.navigateToSignIn();
        await baseTest.login('admin@gmail.com' , '123456')
        await baseTest.navigateToappointment();
        await baseTest.page.getByRole('link', { name: 'Name : test01 case01 Dentist' }).click();
        await baseTest.page.getByRole('button', { name: 'Cancel' }).click();
        await baseTest.Suretocancel(true)
        await baseTest.VerifyCancelAppointment();
    });

    //admin does not delete his appoinment
    test('admin does not delete his appoinment', async ({ page }) => {
        const baseTest = new BaseTest(page);
        await baseTest.navigateToSignIn();
        await baseTest.login('admin@gmail.com' , '123456')
        await baseTest.navigateToappointment();
        await baseTest.page.getByRole('link', { name: 'Name : test01 case01 Dentist' }).click();
        await baseTest.page.getByRole('button', { name: 'Cancel' }).click();
        await baseTest.Suretocancel(false)
    });
});
