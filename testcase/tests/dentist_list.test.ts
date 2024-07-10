import { Page, test, expect } from '@playwright/test';
import { BaseTest } from './Basetset.ts'



//patient can see  Dentist list
// admin can see  Dentist list
// dentist can not see  Dentist list
// un singin can see  Dentist list
// patient can click on   Dentist list to see more detail
test.describe('view Dentist list', () => { 

    test('patient can see  Dentist list', async ({ page }) => {
        const baseTest = new BaseTest(page);
        await baseTest.navigateToSignIn();
        await baseTest.login('test01@gmail.com' , "Test01");
        await baseTest.navigateToDentistList();
        await baseTest.chcek_detiest_list();
    });

    test('admin can see  Dentist list', async ({ page }) => {
        const baseTest = new BaseTest(page);
        await baseTest.navigateToSignIn();
        await baseTest.login('admin@gmail.com' , "123456");
        await baseTest.navigateToDentistList();
        await baseTest.chcek_detiest_list();
    });

    test('dentist can not see  Dentist list', async ({ page }) => {
        const baseTest = new BaseTest(page);
        await baseTest.navigateToSignIn();
        await baseTest.login('dentist@gmail.com' , 'Test01');
        await baseTest.page.goto('https://frontendsw-mtl.vercel.app/dentist');
        
        await baseTest.page.waitForFunction(() => window.location.href === 'https://frontendsw-mtl.vercel.app/');
        
        // Check if the URL is redirected to the home page
        expect(baseTest.page.url()).toBe('https://frontendsw-mtl.vercel.app/');
    });

    test('un singin can see  Dentist list', async ({ page }) => {
        const baseTest = new BaseTest(page);
        await baseTest.navigateToDentistList();
        await baseTest.chcek_detiest_list();
        
    });




 });


//  patient can click on   Dentist list to see more detail
// dentist can not  click on   Dentist list to see more detail
// admin can click on   Dentist list to see more detail
// un singin can click on Dentist list to see more detail


test.describe('view Dentist list', () => { 

    test('patient can click on   Dentist list to see more detail', async ({ page }) => {
        const baseTest = new BaseTest(page);
        await baseTest.navigateToSignIn();
        await baseTest.login('test01@gmail.com' , "Test01");
        await baseTest.navigateToDentistList();
        await baseTest.Chooes_dentsit_list('Emma Considine');
        await baseTest.check_dentist_detail("Emma Considine" , '5 Yesr' , 'ถอนฟัน');
        await baseTest.page.goto('https://frontendsw-mtl.vercel.app/dentist');
        await baseTest.Chooes_dentsit_list('Kent Zemlak')
        await baseTest.check_dentist_detail('Kent Zemlak' , '6 Yesr' , 'อุดฟัน')
        
    });

    test('admin can click on  Dentist list to see more detail', async ({ page }) => {
        const baseTest = new BaseTest(page);
        await baseTest.navigateToSignIn();
        await baseTest.login('admin@gmail.com' , '123456');
        await baseTest.navigateToDentistList();
        await baseTest.Chooes_dentsit_list('Emma Considine');
        await baseTest.check_dentist_detail("Emma Considine" , '5 Yesr' , 'ถอนฟัน');
        await baseTest.page.goto('https://frontendsw-mtl.vercel.app/dentist');
        await baseTest.Chooes_dentsit_list('Kent Zemlak')
        await baseTest.check_dentist_detail('Kent Zemlak' , '6 Yesr' , 'อุดฟัน')

    });

    test('dentist can not click on  Dentist list to see more detail', async ({ page }) => {
        const baseTest = new BaseTest(page);
        const url  = await baseTest.GetUrlOfDentist('Emma Considine');
        await baseTest.navigateToSignIn();
        await baseTest.login('dentist01@gmail.com' , 'Test01');
        await baseTest.page.goto(url);

        await baseTest.page.waitForFunction(() => window.location.href === 'https://frontendsw-mtl.vercel.app/');
        
        // Check if the URL is redirected to the home page
        expect(baseTest.page.url()).toBe('https://frontendsw-mtl.vercel.app/');
    });


    test('un singin can click on Dentist list to see more detail', async ({ page }) => {
        const baseTest = new BaseTest(page);
        await baseTest.navigateToDentistList();
        await baseTest.Chooes_dentsit_list('Emma Considine');
        await baseTest.check_dentist_detail("Emma Considine" , '5 Yesr' , 'ถอนฟัน');
        await baseTest.page.goto('https://frontendsw-mtl.vercel.app/dentist');
        await baseTest.Chooes_dentsit_list('Kent Zemlak')
        await baseTest.check_dentist_detail('Kent Zemlak' , '6 Yesr' , 'อุดฟัน')
    });

});



// patient  can click to make appoinment 
// admin can  not click to make appoinment 
// dentist can  not click to make appoinment 
// unsign can  not click to make appoinment 

test.describe('booking from dentist list', () => {

    test('patient  can click to make appoinment ', async ({ page }) => {
        const baseTest = new BaseTest(page);
        await baseTest.navigateToSignIn();
        await baseTest.login('test01@gmail.com' , 'Test01');
        await baseTest.navigateToDentistList();
        await baseTest.Chooes_dentsit_list('Emma Considine');
        await expect(page.getByRole('button', { name: 'Select' })).toBeVisible();
        //chekc data ต่อย่าลืม
    
    });

    test('admin can not clikck to make appoinment'  , async ({ page }) => {
        const baseTest = new BaseTest(page);
        await baseTest.navigateToSignIn();
        await baseTest.login('admin@gmail.com' , '123456');
        await baseTest.navigateToDentistList();
        await baseTest.Chooes_dentsit_list('Emma Considine');
        await expect(page.getByRole('button', { name: 'Select' })).toBeHidden();
    });

    test('dentist can not clikck to make appoinment'  , async ({ page }) => {
        const baseTest = new BaseTest(page);
        await baseTest.navigateToSignIn();
        await baseTest.login('dentist01@gmail.com' , 'Test01');
        await baseTest.navigateToDentistList();
        await baseTest.Chooes_dentsit_list('Emma Considine');
        await expect(page.getByRole('button', { name: 'Select' })).toBeHidden();
    });

    test('unsign can not clikck to make appoinment'  , async ({ page }) => {
        const baseTest = new BaseTest(page);
        await baseTest.navigateToDentistList();
        await baseTest.Chooes_dentsit_list('Emma Considine');
        await expect(page.getByRole('button', { name: 'Select' })).toBeHidden();
    });

});


