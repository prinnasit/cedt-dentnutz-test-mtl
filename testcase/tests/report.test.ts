import { test , expect } from '@playwright/test';
import { BaseTest } from './Basetset.ts';


let id_for_report = '' ;
let url_update_report = '' ;

test.describe('create report', () => {



    //dentist can not create report (invalid treatment)
    test('dentist can not create report (invalid treatment)', async ({ page }) => {
        const baseTest = new BaseTest(page);
        await baseTest.navigateToSignIn();
        await baseTest.login('dentist01@gmail.com', 'Test01');
        await baseTest.navigateToappointment();

        await baseTest.ChooseAppointment('test01 case01')

        await baseTest.navigateTocreatereport();
        await baseTest.createReport('', "พารา", "นอน");
        
        await baseTest.VerifyIncomplete('Please enter treatment');
        id_for_report = await baseTest.page.url() ;
        console.log(id_for_report)
    });

     //dentist can not create report (invalid Medication)
     test('dentist can not create report (invalid Medication)', async ({ page }) => {
        const baseTest = new BaseTest(page);
        await baseTest.navigateToSignIn();
        await baseTest.login('dentist01@gmail.com', 'Test01');
        await baseTest.navigateToappointment();

        await baseTest.ChooseAppointment('test01 case01')

        await baseTest.navigateTocreatereport();
        await baseTest.createReport('อุดฟัน', '', "นอน");
        await baseTest.VerifyIncomplete('Please enter medication')
    });
     //dentist can not create report (invalid recommendation)
     test('dentist can not create report (invalid recommendation)', async ({ page }) => {
        const baseTest = new BaseTest(page);
        await baseTest.navigateToSignIn();
        await baseTest.login('dentist01@gmail.com', 'Test01');
        await baseTest.navigateToappointment();

        await baseTest.ChooseAppointment('test01 case01')

        await baseTest.navigateTocreatereport();
        await baseTest.createReport('อุดฟัน', "พารา", '');
        await baseTest.VerifyIncomplete('Please enter recommendation')
    });
     

    // patient valid booking 
    test('patient valid booking', async ({ page }) => {
        const baseTest = new BaseTest(page);
        await baseTest.navigateToSignIn();
        await baseTest.login('dentist01@gmail.com', 'Test01');
        await baseTest.navigateToappointment();

        await baseTest.ChooseAppointment('test01 case01')

        await baseTest.navigateTocreatereport();
        await baseTest.check_element_reportpage();
        await baseTest.createReport("อุดฟัน", "พารา", "นอน");
        await baseTest.VerifyComplete('Create report successfully')
        
    });

    //dentist can not create report before time (valid and not on time) 
    test('dentist can not create report before time (valid and not on time)', async ({ page }) => {
        const baseTest = new BaseTest(page);
        await baseTest.navigateToSignIn();
        await baseTest.login('dentist01@gmail.com', 'Test01');
        await baseTest.navigateToappointment();

        await baseTest.ChooseAppointment('test02 case02')

        await baseTest.navigateTocreatereport();
        await baseTest.check_element_reportpage();
        await baseTest.createReport("อุดฟัน", "พารา", "นอน");
        await baseTest.VerifyFail('Can not create report before appointment time')
        
    });

    // //admin can not create report
    // test('admin can not create report', async ({ page }) => {
    //     const baseTest = new BaseTest(page);
    //     await baseTest.navigateToSignIn();
    //     await baseTest.login('admin@gmail.com', '123456');
    //     // await baseTest.navigateToappointment();

    //     // await baseTest.ChooseAppointment('test02 case02')
    //     await baseTest.page.goto(id_for_report)
    //     expect(baseTest.page.url()).toBe('https://frontendsw-mtl.vercel.app/');
        
    // });



    // //patient can not create report
    // test('patient can not create report', async ({ page }) => {
    //     const baseTest = new BaseTest(page);
    //     await baseTest.navigateToSignIn();
    //     await baseTest.login('admin@gmail.com', '123456');
    //     // await baseTest.navigateToappointment();

    //     // await baseTest.ChooseAppointment('test02 case02')
    //     await baseTest.page.goto(id_for_report)
    //     expect(baseTest.page.url()).toBe('https://frontendsw-mtl.vercel.app/');
        
    // });
    
    
});

//view report
test.describe('view report', () => {

    test('patient can see his report (valid)', async ({ page }) => {
        const baseTest = new BaseTest(page);
        await baseTest.navigateToSignIn();
        await baseTest.login('test01@gmail.com', 'Test01');
        await baseTest.navigateToReport();
        await expect(baseTest.page.getByRole('heading', { name: 'Report' })).toBeVisible();
        await expect(baseTest.page.getByPlaceholder('search with patient or doctor')).toBeVisible();
        await expect(baseTest.page.getByRole('main').getByRole('button')).toBeVisible();
        await expect(baseTest.page.getByRole('link', { name: 'Doctor : Emma Considine Date' })).toBeVisible();
        await baseTest.PatientChoosereport('Emma Considine')
        await baseTest.check_datareport('Emma Considine' ,"อุดฟัน", "พารา", "นอน", '19 / 06 / 2024 ' , 'test01 case01' )
    });

    test('patient can not see report (dentist does not create)', async ({ page }) => {
        const baseTest = new BaseTest(page);
        await baseTest.navigateToSignIn();
        await baseTest.login('test02@gmail.com', 'Test01');
        await baseTest.navigateToReport();
        await expect(baseTest.page.getByRole('heading', { name: 'Report' })).toBeHidden();
        await expect(baseTest.page.getByPlaceholder('search with patient or doctor')).toBeHidden();
        await expect(baseTest.page.getByRole('main').getByRole('button')).toBeHidden();
        await expect(baseTest.page.getByText('You don\'t have any report')).toBeVisible();
        await expect(baseTest.page.getByText('View your reports on this')).toBeVisible();
    });

    test('admin can not see report', async ({ page }) => {
        const baseTest = new BaseTest(page);
        await baseTest.navigateToSignIn();
        await baseTest.login('admin@gmail.com', '123456');
        
        // Navigate to the report page
        await baseTest.page.goto('https://frontendsw-mtl.vercel.app/report');
        
        // Wait for the URL to change to home page URL
        await baseTest.page.waitForFunction(() => window.location.href === 'https://frontendsw-mtl.vercel.app/');
        
        // Check if the URL is redirected to the home page
        expect(baseTest.page.url()).toBe('https://frontendsw-mtl.vercel.app/');
    });
    


    test('dentist can see his patient report ', async ({ page }) => {
        const baseTest = new BaseTest(page);
        await baseTest.navigateToSignIn();
        await baseTest.login('dentist01@gmail.com', 'Test01');
        await baseTest.navigateToReport();
        await expect(baseTest.page.getByRole('heading', { name: 'Report' })).toBeVisible();
        await expect(baseTest.page.getByPlaceholder('search with patient or doctor')).toBeVisible();
        await expect(baseTest.page.getByRole('main').getByRole('button')).toBeVisible();
        // await expect(baseTest.page.getByRole('link', { name: 'Doctor : Kent Zemlak Date :' })).toBeVisible();
        // await expect(baseTest.page.getByRole('link', { name: 'Doctor : Emma Considine Date' })).toBeVisible();
        await baseTest.DentistChoosereport('test03 case03')
        await baseTest.check_datareport('Emma Considine' ,'เคลือบฟัน' ,'ยาถ่าน ' , 'กินเยอะๆ ' , '25 / 07 / 2023' , 'test03 case03' )
       
        await expect(page.getByRole('button', { name: 'Edit' })).toBeVisible();
        await baseTest.page.goto('https://frontendsw-mtl.vercel.app/report');
        
        await baseTest.DentistChoosereport('test01 case01')
        await baseTest.check_datareport('Emma Considine' ,"อุดฟัน", "พารา", "นอน", '19 / 06 / 2024 ' , 'test01 case01' )
        
        await expect(page.getByRole('button', { name: 'Edit' })).toBeVisible();
    });

})


test.describe('update report', () => {

    // test('admin can not update report', async ({ page }) => {
    //     const baseTest = new BaseTest(page);
    //     await baseTest.navigateToSignIn();
    //     await baseTest.login('admin@gmail.com', '123456');
    //       // Navigate to the report page
    //       await baseTest.page.goto('https://frontendsw-mtl.vercel.app/report');
        
    //       // Wait for the URL to change to home page URL
    //       await baseTest.page.waitForFunction(() => window.location.href === 'https://frontendsw-mtl.vercel.app/');
          
    //       // Check if the URL is redirected to the home page
    //       expect(baseTest.page.url()).toBe('https://frontendsw-mtl.vercel.app/');

    // });

    test('dentist can update  his patient report (valid)', async ({ page }) => {
        const baseTest = new BaseTest(page);
        await baseTest.navigateToSignIn();
        await baseTest.login('dentist01@gmail.com', 'Test01');
        await baseTest.navigateToReport();
        await baseTest.DentistChoosereport('test01 case01')
        await expect(baseTest.page.getByRole('button', { name: 'Edit' })).toBeVisible();
        await baseTest.page.getByRole('button', { name: 'Edit' }).click();
        url_update_report = await baseTest.page.url() ;
        await baseTest.updateReport('ผ่าฟัน'  ,'ลูกอม' ,'12333')
        await baseTest.VerifyComplete('Update report successfully')
       
        
        
        await baseTest.logout();
        await baseTest.navigateToSignIn();
        await baseTest.login('test01@gmail.com', 'Test01');
        await baseTest.navigateToReport();
        await baseTest.PatientChoosereport('Emma Considine');
        await baseTest.check_datareport('Emma Considine' ,'ผ่าฟัน'  ,'ลูกอม' ,'12333', '19 / 06 / 2024 ' , 'test01 case01' )
        
    });
    
    

    test('dentist can not update report (invalid treatment)', async ({ page }) => {
        const baseTest = new BaseTest(page);
        await baseTest.navigateToSignIn();
        await baseTest.login('dentist01@gmail.com', 'Test01');
        await baseTest.navigateToReport();
        await baseTest.DentistChoosereport('test01 case01');
        await baseTest.page.getByRole('button', { name: 'Edit' }).click();
        await baseTest.updateReport('' , 'sdf ' , 'sdf');
        await baseTest.VerifyIncomplete('Please enter treatment');
    });

    test('dentist can not update report(invalid Medication)  ', async ({ page }) => {
        const baseTest = new BaseTest(page);
        await baseTest.navigateToSignIn();
        await baseTest.login('dentist01@gmail.com', 'Test01');
        await baseTest.navigateToReport();
        await baseTest.DentistChoosereport('test01 case01');
        await baseTest.page.getByRole('button', { name: 'Edit' }).click();
        await baseTest.updateReport('asfe' , '' , 'adsf ');
        await baseTest.VerifyIncomplete('Please enter medication');
       
    });

    test('dentist can not update report (invalid Recommendation)  ', async ({ page }) => {
        const baseTest = new BaseTest(page);
        await baseTest.navigateToSignIn();
        await baseTest.login('dentist01@gmail.com', 'Test01');
        await baseTest.navigateToReport();
        await baseTest.DentistChoosereport('test01 case01');
        await baseTest.page.getByRole('button', { name: 'Edit' }).click();
        await baseTest.updateReport('asdfasdff' , 'afdasdf ' , '');
        await baseTest.VerifyIncomplete('Please enter recommendation');
        
    });

    test('patient can not update his report', async ({ page }) => {
        const baseTest = new BaseTest(page);
        await baseTest.navigateToSignIn();
        await baseTest.login('test01@gmail.com', 'Test01');
        await baseTest.navigateToReport();
        await expect(baseTest.page.getByRole('heading', { name: 'Report' })).toBeVisible();
        await expect(baseTest.page.getByPlaceholder('search with patient or doctor')).toBeVisible();
        await expect(baseTest.page.getByRole('main').getByRole('button')).toBeVisible();
        await expect(baseTest.page.getByRole('link', { name: 'Doctor : Emma Considine Date' })).toBeVisible();
        await baseTest.PatientChoosereport('Emma Considine')
        await expect(baseTest.page.getByRole('button', { name: 'Edit' })).toBeHidden();
    });

    
})


test.describe('delete report', () => {

    //auto  delete มีการ mock report ให้มี อายุเกิิน5 ปี
    test('auto delete report', async ({ page }) => {
        const baseTest = new BaseTest(page);
        await baseTest.navigateToSignIn();
        await baseTest.login('test01@gmail.com' , 'Test01');
        await baseTest.navigateToReport();
        await expect(baseTest.page.getByRole('link', { name: `Doctor :  Date :` })).toBeHidden();
        
    });

  

})
