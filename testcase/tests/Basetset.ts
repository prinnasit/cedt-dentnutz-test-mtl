import {Page, expect } from '@playwright/test';




export class BaseTest {
    page: Page;

    constructor(page) {
        this.page = page;
    }

    async navigateToSignIn() {
        await this.page.goto('https://frontendsw-mtl.vercel.app/');
        await this.page.getByRole('link', { name: 'Sign in' }).click();
    }

    async navigateTobooking() {
        await this.page.goto('https://frontendsw-mtl.vercel.app/');
        await this.page.getByRole('link', { name: 'Booking' }).click();
    }

    async login(email, password) {
        await this.page.getByPlaceholder('email').fill(email);
        await this.page.getByLabel('Password').fill(password);
        await this.page.getByRole('button', { name: 'Sign in with Credentials' }).click();
    }

    async verifyLogout() {
        await expect(this.page.url()).toBe('https://frontendsw-mtl.vercel.app/');
        await expect(this.page.locator('a').filter({ hasText: 'Not signed-in' })).toBeVisible();
        await expect(this.page.getByRole('link', { name: 'Register' })).toBeVisible();
        await expect(this.page.getByRole('link', { name: 'Sign in' })).toBeVisible();
    }

    async logout() {
        await this.page.reload();
        await this.page.getByRole('button', { name: 'Open user menu' }).click();
        await this.page.getByRole('menuitem', { name: 'Sign out' }).click();
        await expect(this.page.url()).toBe('https://frontendsw-mtl.vercel.app/api/auth/signout');
        await expect(this.page.getByText('SignoutAre you sure you want')).toBeVisible();
        await expect(this.page.getByRole('button', { name: 'Sign out' })).toBeEnabled();
        await this.page.getByRole('button', { name: 'Sign out' }).click();
        await this.verifyLogout();
    }
    //can you meake time parameter have only two value "morning" or "afternoon"
    
    
    async filldatabooking( doctername , time : "morning" | "afternoon") {
        let timeValue;
        if (time === "afternoon") {
           timeValue = "15.00";
        }
        else if(time === "morning") {
           timeValue = "09.00";
        }
        else{
            throw new Error("time must be morning or afternoon")
        }


        await this.page.getByLabel('dentist').click();
        await this.page.getByRole('option', { name: doctername }).click();
        await this.page.getByLabel('Choose date').click();
        await this.page.getByLabel('calendar view is open, switch').click();
        await this.page.getByRole('button', { name: '2025' }).click();
        await this.page.getByRole('gridcell', { name: '27' }).click();
        await this.page.getByLabel('Time').click();
        await this.page.getByRole('option', { name: timeValue }).click();
        await this.page.getByRole('button', { name: 'Create Appointment' }).click();

    }

    async verifyBookingPage() {
        await expect(this.page.getByText('Create AppointmentDentist :')).toBeVisible();
        await expect(this.page.getByText('Dentist : Doctor')).toBeVisible();
        await expect(this.page.getByLabel('dentist')).toBeVisible();
        await expect(this.page.getByText('Appointment date :')).toBeVisible();
        await expect(this.page.getByPlaceholder('mm/dd/yyyy')).toBeVisible();
        await expect(this.page.getByLabel('Choose date')).toBeVisible();
        await expect(this.page.getByLabel('Time')).toBeVisible();
        await expect(this.page.getByRole('button', { name: 'Create Appointment' })).toBeVisible
        await this.page.getByLabel('Choose date').click();
        await expect(this.page.locator('//div[@role="dialog"]/div/div')).toBeVisible();
        await expect(this.page.getByText('June 2024SMTWTFS123456789101112131415161718192021222324252627282930')).toBeVisible()
        await expect(this.page.getByLabel('calendar view is open, switch')).toBeVisible();
        await expect(this.page.locator('.MuiPickersArrowSwitcher-root')).toBeVisible();
    }

    async VerifyIncompleteBooking() {
        await expect(this.page.locator('div').filter({ hasText: '!' }).nth(2)).toBeVisible();
        await expect(this.page.getByLabel('Incomplete')).toBeVisible();
        await expect(this.page.getByRole('heading', { name: 'Incomplete' })).toBeVisible();
        await expect(this.page.getByText('Please select date for')).toBeVisible();
        await expect(this.page.getByRole('button', { name: '👍 OK!' })).toBeVisible();
        await this.page.getByRole('button', { name: '👍 OK!' }).click();
    }

    async VerifyCompleteBooking() {
        await expect(this.page.locator('div').filter({ hasText: '!' }).nth(2)).toBeVisible();
        await expect(this.page.getByLabel('Complete')).toBeVisible();
        await expect(this.page.getByRole('heading', { name: 'Complete' })).toBeVisible();
        await expect(this.page.getByText('Your appointment has been booked')).toBeVisible();
        await expect(this.page.getByRole('button', { name: '👍 OK!' })).toBeVisible();
        await this.page.getByRole('button', { name: '👍 OK!' }).click();
    }
}
