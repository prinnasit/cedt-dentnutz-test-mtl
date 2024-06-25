import { test, expect } from '@playwright/test';



test.beforeEach(async ({ page }) => {
  await page.goto('https://frontendsw-mtl.vercel.app/');
});




test.describe('Login Logout Test', () => {

    test('check element ', async ({ page }) => {
        await page.getByRole('link', { name: 'Sign in' }).click();
        await expect(page.locator('div').filter({ hasText: 'EmailPasswordSign in with' }).nth(2)).toBeVisible();
        await expect(page.getByPlaceholder('email')).toBeVisible();
        await expect(page.getByLabel('Password')).toBeVisible();
        await expect(page.getByRole('button', { name: 'Sign in with Credentials' })).toBeEnabled();
    });
    

    test('admin login', async ({ page }) => {
        await page.goto('https://frontendsw-mtl.vercel.app/');
        await page.getByRole('link', { name: 'Sign in' }).click();
        await page.getByPlaceholder('email').fill('admin@gmail.com');
        await page.getByLabel('Password').fill('123456');
        await page.getByRole('button', { name: 'Sign in with Credentials' }).click();
        
        await expect(page.url()).toBe('https://frontendsw-mtl.vercel.app/');
        await expect(page.locator('a').filter({ hasText: 'admin' })).toBeVisible();
        await expect(page.getByRole('link', { name: 'Dentist' })).toBeVisible();
        await expect(page.getByRole('link', { name: 'Appointment'})).toBeVisible();
        await expect(page.getByRole('link', { name: 'Schedule' })).toBeVisible();
        await expect(page.getByRole('link', { name: 'Report' })).toBeHidden();
        await expect(page.getByRole('link', { name: 'Booking'})).toBeHidden();
        await expect(page.getByText('Our DentistsDoctor Emma')).toBeVisible();
        await expect(page.locator('div').filter({ hasText: 'Doctor Emma' }).first()).toBeVisible();
        await expect(page.getByText('DentnutzTeeth')).toBeVisible();
        await expect(page.locator('div').filter({ hasText: 'About UsAt our CUD Dentist' }).first()).toBeVisible();
        await expect(page.getByRole('button', { name: 'Open user menu' })).toBeVisible();
    })


    test('patient Login ', async ({ page }) => {
        await page.goto('https://frontendsw-mtl.vercel.app/');
        await page.getByRole('link', { name: 'Sign in' }).click();
        await page.getByPlaceholder('email').fill('test01@gmail.com');
        await page.getByLabel('Password').fill('Test01');
        await page.getByRole('button', { name: 'Sign in with Credentials' }).click();
        
        await expect(page.url()).toBe('https://frontendsw-mtl.vercel.app/');
        await expect(page.locator('a').filter({ hasText: 'patient' })).toBeVisible();
        await expect(page.getByRole('link', { name: 'Dentist' })).toBeVisible();
        await expect(page.getByRole('link', { name: 'Appointment'})).toBeVisible();
        await expect(page.getByRole('link', { name: 'Booking'})).toBeVisible();
        await expect(page.getByRole('link', { name: 'Schedule' })).toBeHidden();
        await expect(page.getByRole('link', { name: 'Report' })).toBeVisible();
        await expect(page.getByText('Our DentistsDoctor Emma')).toBeVisible();
        await expect(page.locator('div').filter({ hasText: 'Doctor Emma' }).first()).toBeVisible();
        await expect(page.getByText('DentnutzTeeth')).toBeVisible();
        await expect(page.locator('div').filter({ hasText: 'About UsAt our CUD Dentist' }).first()).toBeVisible();
        await expect(page.getByRole('button', { name: 'Open user menu' })).toBeVisible();
    })



    test('dentist Login ', async ({ page }) => {
        await page.goto('https://frontendsw-mtl.vercel.app/');
        await page.getByRole('link', { name: 'Sign in' }).click();
        await page.getByPlaceholder('email').fill('dentist01@gmail.com');
        await page.getByLabel('Password').fill('Test01');
        await page.getByRole('button', { name: 'Sign in with Credentials' }).click();
        
        await expect(page.url()).toBe('https://frontendsw-mtl.vercel.app/');
        await expect(page.locator('a').filter({ hasText: 'dentist' })).toBeVisible();
        await expect(page.getByRole('link', { name: 'Dentist' })).toBeHidden();
        await expect(page.getByRole('link', { name: 'Appointment'})).toBeVisible();
        await expect(page.getByRole('link', { name: 'Schedule' })).toBeVisible();
        await expect(page.getByRole('link', { name: 'Report' })).toBeVisible();
        await expect(page.getByText('Our DentistsDoctor Emma')).toBeHidden();
        await expect(page.locator('div').filter({ hasText: 'Doctor Emma' }).first()).toBeHidden();
        await expect(page.getByText('Your Schedule')).toBeVisible();
        await expect(page.locator('div').filter({ hasText: 'About UsAt our CUD Dentist' }).first()).toBeVisible();
        await expect(page.getByRole('button', { name: 'Open user menu' })).toBeVisible();
    })

    test('invalid email Login', async ({ page }) => {
        await page.goto('https://frontendsw-mtl.vercel.app/');
        await page.getByRole('link', { name: 'Sign in' }).click();
        await page.getByPlaceholder('email').fill('haha@gmail.com');
        await page.getByLabel('Password').fill('123456');
        await page.getByRole('button', { name: 'Sign in with Credentials' }).click();
        
        await expect(page.getByRole('heading', { name: 'Error' })).toBeVisible();
        await expect(page.getByText('Errorfrontendsw-mtl.vercel.app')).toBeVisible();
    })

    test('invalid password Login ', async ({ page }) => {
        await page.goto('https://frontendsw-mtl.vercel.app/');
        await page.getByRole('link', { name: 'Sign in' }).click();
        await page.getByPlaceholder('email').fill('admin@gmail.com');
        await page.getByLabel('Password').fill('000000');
        await page.getByRole('button', { name: 'Sign in with Credentials' }).click();
        
        await expect(page.getByRole('heading', { name: 'Error' })).toBeVisible();
        await expect(page.getByText('Errorfrontendsw-mtl.vercel.app')).toBeVisible();
    })
    
    
})

test.describe('Login Logout Test', () => {
test('admin Logout ', async ({ page }) => {
    await page.goto('https://frontendsw-mtl.vercel.app/');
    await page.getByRole('link', { name: 'Sign in' }).click();
    await page.getByPlaceholder('email').fill('admin@gmail.com');
    await page.getByLabel('Password').fill('123456');
    await page.getByRole('button', { name: 'Sign in with Credentials' }).click();


    await page.goto('https://frontendsw-mtl.vercel.app/');
    await page.getByRole('button', { name: 'Open user menu' }).click();
    await page.getByRole('menuitem', { name: 'Sign out' }).click();
    
    await expect(page.url()).toBe('https://frontendsw-mtl.vercel.app/api/auth/signout');
    await expect(page.getByText('SignoutAre you sure you want')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Sign out' })).toBeEnabled();
    await page.getByRole('button', { name: 'Sign out' }).click();

    await expect(page.url()).toBe('https://frontendsw-mtl.vercel.app/');
    await expect(page.locator('a').filter({ hasText: 'Not signed-in' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Register' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Sign in' })).toBeVisible();

    await expect(page.getByRole('link', { name: 'Dentist' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Appointment'})).toBeVisible();
    await expect(page.getByRole('link', { name: 'Schedule' })).toBeHidden();
    await expect(page.getByRole('link', { name: 'Report' })).toBeHidden();
    await expect(page.getByText('Our DentistsDoctor Emma')).toBeHidden();
    await expect(page.locator('div').filter({ hasText: 'Doctor Emma' }).first()).toBeHidden();
    await expect(page.getByText('Care Your Teeth')).toBeVisible();
    await expect(page.locator('div').filter({ hasText: 'About UsAt our CUD Dentist' }).first()).toBeVisible();
})

test('dentist Logout ', async ({ page }) => {
    await page.goto('https://frontendsw-mtl.vercel.app/');
    await page.getByRole('link', { name: 'Sign in' }).click();
    await page.getByPlaceholder('email').fill('dentist01@gmail.com');
    await page.getByLabel('Password').fill('Test01');
    await page.getByRole('button', { name: 'Sign in with Credentials' }).click();

    
    await page.goto('https://frontendsw-mtl.vercel.app/');
    await page.getByRole('button', { name: 'Open user menu' }).click();
    await page.getByRole('menuitem', { name: 'Sign out' }).click();
    
    await expect(page.url()).toBe('https://frontendsw-mtl.vercel.app/api/auth/signout');
    await expect(page.getByText('SignoutAre you sure you want')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Sign out' })).toBeEnabled();
    await page.getByRole('button', { name: 'Sign out' }).click();

    await expect(page.url()).toBe('https://frontendsw-mtl.vercel.app/');
    await expect(page.locator('a').filter({ hasText: 'Not signed-in' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Register' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Sign in' })).toBeVisible();

    await expect(page.getByRole('link', { name: 'Dentist' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Appointment'})).toBeVisible();
    await expect(page.getByRole('link', { name: 'Schedule' })).toBeHidden();
    await expect(page.getByRole('link', { name: 'Report' })).toBeHidden();
    await expect(page.getByText('Our DentistsDoctor Emma')).toBeHidden();
    await expect(page.locator('div').filter({ hasText: 'Doctor Emma' }).first()).toBeHidden();
    await expect(page.getByText('Care Your Teeth')).toBeVisible();
    await expect(page.locator('div').filter({ hasText: 'About UsAt our CUD Dentist' }).first()).toBeVisible();
})

test('patient Logout ', async ({ page }) => {
    await page.goto('https://frontendsw-mtl.vercel.app/');
    await page.getByRole('link', { name: 'Sign in' }).click();
    await page.getByPlaceholder('email').fill('test01@gmail.com');
    await page.getByLabel('Password').fill('Test01');
    await page.getByRole('button', { name: 'Sign in with Credentials' }).click();


    await page.getByRole('button', { name: 'Open user menu' }).click();
    await page.getByRole('menuitem', { name: 'Sign out' }).click();
    
    await expect(page.url()).toBe('https://frontendsw-mtl.vercel.app/api/auth/signout');
    await expect(page.getByText('SignoutAre you sure you want')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Sign out' })).toBeEnabled();
    await page.getByRole('button', { name: 'Sign out' }).click();

    await expect(page.url()).toBe('https://frontendsw-mtl.vercel.app/');
    await expect(page.locator('a').filter({ hasText: 'Not signed-in' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Register' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Sign in' })).toBeVisible();

    await expect(page.getByRole('link', { name: 'Dentist' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Appointment'})).toBeVisible();
    await expect(page.getByRole('link', { name: 'Schedule' })).toBeHidden();
    await expect(page.getByRole('link', { name: 'Report' })).toBeHidden();
    await expect(page.getByText('Our DentistsDoctor Emma')).toBeHidden();
    await expect(page.locator('div').filter({ hasText: 'Doctor Emma' }).first()).toBeHidden();
    await expect(page.getByText('Care Your Teeth')).toBeVisible();
    await expect(page.locator('div').filter({ hasText: 'About UsAt our CUD Dentist' }).first()).toBeVisible();
})




})



// import { Page, test as base, expect } from '@playwright/test';

// class BaseTest {
//     page: Page;

//     constructor(page) {
//         this.page = page;
//     }

//     async navigateToSignIn() {
//         await this.page.goto('https://frontendsw-mtl.vercel.app/');
//         await this.page.getByRole('link', { name: 'Sign in' }).click();
//     }

//     async login(email, password) {
//         await this.page.getByPlaceholder('email').fill(email);
//         await this.page.getByLabel('Password').fill(password);
//         await this.page.getByRole('button', { name: 'Sign in with Credentials' }).click();
//     }

//     async verifyLogout() {
//         await expect(this.page.url()).toBe('https://frontendsw-mtl.vercel.app/');
//         await expect(this.page.locator('a').filter({ hasText: 'Not signed-in' })).toBeVisible();
//         await expect(this.page.getByRole('link', { name: 'Register' })).toBeVisible();
//         await expect(this.page.getByRole('link', { name: 'Sign in' })).toBeVisible();
//     }

//     async logout() {
//         await this.page.getByRole('button', { name: 'Open user menu' }).click();
//         await this.page.getByRole('menuitem', { name: 'Sign out' }).click();
//         await expect(this.page.url()).toBe('https://frontendsw-mtl.vercel.app/api/auth/signout');
//         await expect(this.page.getByText('SignoutAre you sure you want')).toBeVisible();
//         await expect(this.page.getByRole('button', { name: 'Sign out' })).toBeEnabled();
//         await this.page.getByRole('button', { name: 'Sign out' }).click();
//         await this.verifyLogout();
//     }
// }

// class AdminTest extends BaseTest {
//     async verifyAdminDashboard() {
//         await expect(this.page.url()).toBe('https://frontendsw-mtl.vercel.app/');
//         await expect(this.page.locator('a').filter({ hasText: 'admin' })).toBeVisible();
//         await expect(this.page.getByRole('link', { name: 'Dentist' })).toBeVisible();
//         await expect(this.page.getByRole('link', { name: 'Appointment'})).toBeVisible();
//         await expect(this.page.getByRole('link', { name: 'Schedule' })).toBeVisible();
//         await expect(this.page.getByRole('link', { name: 'Report' })).toBeHidden();
//         await expect(this.page.getByRole('link', { name: 'Booking'})).toBeHidden();
//         await expect(this.page.getByText('Our DentistsDoctor Emma')).toBeVisible();
//         await expect(this.page.locator('div').filter({ hasText: 'Doctor Emma' }).first()).toBeVisible();
//         await expect(this.page.getByText('DentnutzTeeth')).toBeVisible();
//         await expect(this.page.locator('div').filter({ hasText: 'About UsAt our CUD Dentist' }).first()).toBeVisible();
//         await expect(this.page.getByRole('button', { name: 'Open user menu' })).toBeVisible();
//     }
// }

// class PatientTest extends BaseTest {
//     async verifyPatientDashboard() {
//         await expect(this.page.url()).toBe('https://frontendsw-mtl.vercel.app/');
//         await expect(this.page.locator('a').filter({ hasText: 'patient' })).toBeVisible();
//         await expect(this.page.getByRole('link', { name: 'Dentist' })).toBeVisible();
//         await expect(this.page.getByRole('link', { name: 'Appointment'})).toBeVisible();
//         await expect(this.page.getByRole('link', { name: 'Booking'})).toBeVisible();
//         await expect(this.page.getByRole('link', { name: 'Schedule' })).toBeHidden();
//         await expect(this.page.getByRole('link', { name: 'Report' })).toBeVisible();
//         await expect(this.page.getByText('Our DentistsDoctor Emma')).toBeVisible();
//         await expect(this.page.locator('div').filter({ hasText: 'Doctor Emma' }).first()).toBeVisible();
//         await expect(this.page.getByText('DentnutzTeeth')).toBeVisible();
//         await expect(this.page.locator('div').filter({ hasText: 'About UsAt our CUD Dentist' }).first()).toBeVisible();
//         await expect(this.page.getByRole('button', { name: 'Open user menu' })).toBeVisible();
//     }
// }

// class DentistTest extends BaseTest {
//     async verifyDentistDashboard() {
//         await expect(this.page.url()).toBe('https://frontendsw-mtl.vercel.app/');
//         await expect(this.page.locator('a').filter({ hasText: 'dentist' })).toBeVisible();
//         await expect(this.page.getByRole('link', { name: 'Dentist' })).toBeHidden();
//         await expect(this.page.getByRole('link', { name: 'Appointment'})).toBeVisible();
//         await expect(this.page.getByRole('link', { name: 'Schedule' })).toBeVisible();
//         await expect(this.page.getByRole('link', { name: 'Report' })).toBeVisible();
//         await expect(this.page.getByText('Our DentistsDoctor Emma')).toBeHidden();
//         await expect(this.page.locator('div').filter({ hasText: 'Doctor Emma' }).first()).toBeHidden();
//         await expect(this.page.getByText('Your Schedule')).toBeVisible();
//         await expect(this.page.locator('div').filter({ hasText: 'About UsAt our CUD Dentist' }).first()).toBeVisible();
//         await expect(this.page.getByRole('button', { name: 'Open user menu' })).toBeVisible();
//     }
// }

// const test = base.extend({
//     admin: async ({ page }, use) => {
//         const adminTest = new AdminTest(page);
//         await use(adminTest);
//     },
//     patient: async ({ page }, use) => {
//         const patientTest = new PatientTest(page);
//         await use(patientTest);
//     },
//     dentist: async ({ page }, use) => {
//         const dentistTest = new DentistTest(page);
//         await use(dentistTest);
//     }
// });

// test.describe('Login Logout Test', () => {

//     test('check element', async ({ page }) => {
//         await page.goto('https://frontendsw-mtl.vercel.app/');
//         await page.getByRole('link', { name: 'Sign in' }).click();
//         await expect(page.locator('div').filter({ hasText: 'EmailPasswordSign in with' }).nth(2)).toBeVisible();
//         await expect(page.getByPlaceholder('email')).toBeVisible();
//         await expect(page.getByLabel('Password')).toBeVisible();
//         await expect(page.getByRole('button', { name: 'Sign in with Credentials' })).toBeEnabled();
//     });

//     test('admin login', async ({ admin }) => {
//         await admin.navigateToSignIn();
//         await admin.login('admin@gmail.com', '123456');
//         await admin.verifyAdminDashboard();
//     });

//     test('patient login', async ({ patient }) => {
//         await patient.navigateToSignIn();
//         await patient.login('test01@gmail.com', 'Test01');
//         await patient.verifyPatientDashboard();
//     });

//     test('dentist login', async ({ dentist }) => {
//         await dentist.navigateToSignIn();
//         await dentist.login('dentist01@gmail.com', 'Test01');
//         await dentist.verifyDentistDashboard();
//     });

//     test('invalid email login', async ({ page }) => {
//         await page.goto('https://frontendsw-mtl.vercel.app/');
//         await page.getByRole('link', { name: 'Sign in' }).click();
//         await page.getByPlaceholder('email').fill('haha@gmail.com');
//         await page.getByLabel('Password').fill('123456');
//         await page.getByRole('button', { name: 'Sign in with Credentials' }).click();

//         await expect(page.getByRole('heading', { name: 'Error' })).toBeVisible();
//         await expect(page.getByText('Errorfrontendsw-mtl.vercel.app')).toBeVisible();
//     });

//     test('invalid password login', async ({ page }) => {
//         await page.goto('https://frontendsw-mtl.vercel.app/');
//         await page.getByRole('link', { name: 'Sign in' }).click();
//         await page.getByPlaceholder('email').fill('admin@gmail.com');
//         await page.getByLabel('Password').fill('000000');
//         await page.getByRole('button', { name: 'Sign in with Credentials' }).click();

//         await expect(page.getByRole('heading', { name: 'Error' })).toBeVisible();
//         await expect(page.getByText('Errorfrontendsw-mtl.vercel.app')).toBeVisible();
//     });

//     test('admin logout', async ({ admin }) => {
//         await admin.navigateToSignIn();
//         await admin.login('admin@gmail.com', '123456');
//         await admin.logout();
//     });

//     test('dentist logout', async ({ dentist }) => {
//         await dentist.navigateToSignIn();
//         await dentist.login('dentist01@gmail.com', 'Test01');
//         await dentist.logout();
//     });

//     test('patient logout', async ({ patient }) => {
//         await patient.navigateToSignIn();
//         await patient.login('test01@gmail.com', 'Test01');
//         await patient.page.getByRole('button', { name: 'Open user menu' }).click(); 
//         await patient.page.getByRole('button', { name: 'Open user menu' }).click();
//         await patient.page.getByRole('button', { name: 'Open user menu' }).click(); 
//         await patient.page.getByRole('button', { name: 'Open user menu' }).click();
//         await patient.page.getByRole('menuitem', { name: 'Sign out' }).click();
//         await expect(patient.page.url()).toBe('https://frontendsw-mtl.vercel.app/api/auth/signout');
//         await expect(patient.page.getByText('SignoutAre you sure you want')).toBeVisible();
//         await expect(patient.page.getByRole('button', { name: 'Sign out' })).toBeEnabled();
//         await patient.page.getByRole('button', { name: 'Sign out' }).click();
//         await patient.verifyLogout();
//     });

// });
