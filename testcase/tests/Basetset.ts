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

    async navigateToappointment() {
        await this.page.goto('https://frontendsw-mtl.vercel.app/');
        await this.page.getByRole('link', { name: 'Appointment' }).click();
        // await this.page.reload();
    }

    async navigateToReport(){
        await this.page.goto('https://frontendsw-mtl.vercel.app/');
        await this.page.getByRole('link', { name: 'Report' }).click();
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
    
    
    async filldatabooking( doctername , time : "morning" | "afternoon" | null , day , month , year , fillwithkeyborad : boolean) {
        let timeValue;
        if (time === "afternoon") {
           timeValue = "15.00";
        }
        else if(time === "morning") {
           timeValue = "09.00";
        }
        else if(time === null){
            timeValue = null;
        }
        else{
            throw new Error("time must be morning or afternoon")
        }

        if(doctername !== null){
            await this.page.getByLabel('dentist').click();
            await this.page.getByRole('option', { name: doctername }).click();
        }
        
        if(!fillwithkeyborad){
            await this.page.getByLabel('Choose date').click();
            await this.page.getByLabel('calendar view is open, switch').click();
            await this.page.getByRole('button', { name: year }).click();
            for (let i = 1; i < month; i++) {
                await this.page.getByRole('button', { name: 'Next month' }).click();
            }
            const dayLocator = `button[role="gridcell"]:has-text("${day}")`;
            await this.page.locator(dayLocator).first().click();
        }
        else{ 
            if(month !== null){
                const strmonth = month.toString();
            }
            await this.page.getByPlaceholder('mm/dd/yyyy').fill(day + '/' + month + '/' + year);
        }
        
        if(time !== null){
            await this.page.getByLabel('Time').click();
            await this.page.getByRole('option', { name: timeValue }).click();
        }
       
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
        await expect(this.page.locator('//div[@class="MuiPickersFadeTransitionGroup-root css-1bx5ylf"]')).toBeVisible();
        await expect(this.page.getByLabel('calendar view is open, switch')).toBeVisible();
        await expect(this.page.locator('.MuiPickersArrowSwitcher-root')).toBeVisible();
    }

    async VerifyIncomplete(msg : string) {
        await expect(this.page.locator('div').filter({ hasText: '!' }).nth(2)).toBeVisible();
        await expect(this.page.getByLabel('Incomplete')).toBeVisible();
        await expect(this.page.getByRole('heading', { name: 'Incomplete' })).toBeVisible();
        // if(Incomplete === "date"){
        //     await expect(this.page.getByText('Please select date for appointment')).toBeVisible();
        // }
        // else if(Incomplete === "time"){
        //     await expect(this.page.getByText('Please select date for appointment')).toBeVisible();
        // }
        // else if(Incomplete === "dentist"){
        //     await expect(this.page.getByText('Please select dentist')).toBeVisible();
        // }
        // else if(Incomplete === "all"){
        //     await expect(this.page.getByText('Please select dentist')).toBeVisible();
        // }

        await expect(this.page.getByText(msg)).toBeVisible();
      
        await expect(this.page.getByRole('button', { name: '👍 OK!' })).toBeVisible();
        await this.page.getByRole('button', { name: '👍 OK!' }).click();
    }

    async VerifyFail (msg) {
        await expect(this.page.locator('div').filter({ hasText: '!' }).nth(2)).toBeVisible();
        await expect(this.page.getByRole('heading', { name: 'Failed' })).toBeVisible();
        await expect(this.page.getByText(msg)).toBeVisible();
        // if(type === "past"){
        //     await expect(this.page.getByText('Cannot book appointment in the past')).toBeVisible();
        // }
        // else if(type === "invalid"){
        //     await expect(this.page.getByText('Failed to add appointment')).toBeVisible();
        // }
        // else if(type === "exist"){
        //     await expect(this.page.getByText('Appointment date and dentist already exists')).toBeVisible();
        // }
        // else if(type === "morethan1"){
        //     await expect(this.page.getByText('You can only have one appointment at a time')).toBeVisible();
        // }
        // else if(type === "does not change"){
        //     await expect(this.page.getByText('No changes were made')).toBeVisible();
        // }
        await expect(this.page.getByRole('button', { name: '👍 OK!' })).toBeVisible();
        await this.page.getByRole('button', { name: '👍 OK!' }).click();
    }



    async VerifyComplete(msg) {
        await expect(this.page.locator('div').filter({ hasText: '!' }).nth(2)).toBeVisible();
        await expect(this.page.getByRole('heading', { name: 'Successfully' })).toBeVisible();

        // if(update){
        //     await expect(this.page.getByText('Update appointment')).toBeVisible();
        // }
        // else{
        //     await expect(this.page.getByText('Appointment booked successfully')).toBeVisible();
        // }
        
        await expect(this.page.getByText(msg)).toBeVisible();
        await expect(this.page.getByRole('button', { name: '👍 OK!' })).toBeVisible();
        await this.page.getByRole('button', { name: '👍 OK!' }).click();
    }

    async VerifyPatientAppointmentPage() {
        await expect(this.page.getByRole('heading', { name: 'Patient Appointments' })).toBeVisible();
        await expect(this.page.getByText('Patient : test01 case01Dentist : Doctor Emma ConsidineAppointment Date : 27 /')).toBeVisible();
        await expect(this.page.locator('.text-lg').first()).toBeVisible();
        await expect(this.page.getByText('Patient : test01 case01')).toBeVisible();
        await expect(this.page.getByText('Dentist : Doctor Emma')).toBeVisible();
        await expect(this.page.getByText('Appointment Date : 27 / 07 /')).toBeVisible();
        await expect(this.page.getByRole('button', { name: 'Cancel' })).toBeVisible();
        await expect(this.page.getByRole('button', { name: 'Edit Appointment' })).toBeVisible();
    };

    async VerifyDentistOrAdminAppointment(role : "dentist" | "admin") {
        await expect(this.page.getByRole('link', { name: 'Name : test01 case01 Dentist' })).toBeVisible();
        await expect(this.page.getByRole('link', { name: 'Name : test02 case02 Dentist' })).toBeVisible();
        await expect(this.page.getByRole('link', { name: 'Name : test03 case03 Dentist' })).toBeVisible();
        
        //click on the first appointment
        // if(role === "admin"){
        //     await expect(this.page.getByRole('link', { name: 'Edit', exact: true })).toBeVisible();
        // }
        await this.page.getByRole('link', { name: 'Name : test01 case01 Dentist' }).click();
        await expect(this.page.url()).toBe('https://frontendsw-mtl.vercel.app/appointment/');
        await expect(this.page.getByRole('heading', { name: 'Patient Appointments' })).toBeVisible();
        await expect(this.page.getByText('Patient : test01 case01Dentist : Doctor Emma ConsidineAppointment Date : 27 /')).toBeVisible();
        await expect(this.page.getByText('Patient : test01 case01')).toBeVisible();
        await expect(this.page.getByText('Dentist : Doctor Emma')).toBeVisible();
        await expect(this.page.getByText('Appointment Date : 27 / 06 /')).toBeVisible();
        await expect(this.page.locator('.text-lg').first()).toBeVisible();
        if(role === "dentist"){
            await expect(this.page.getByRole('button', { name: 'Create Report' })).toBeVisible();
        }
        else if(role === "admin"){
            await expect(this.page.getByRole('button', { name: 'Edit Appointment' })).toBeVisible();
            await expect(this.page.getByRole('button', { name: 'Cancel' })).toBeVisible();
        }

        await this.page.goto('https://frontendsw-mtl.vercel.app/appointment');

        //click on the second appointment
        // if(role === "admin"){
        //     await expect(this.page.getByRole('link', { name: 'Edit', exact: true })).toBeVisible();
        // }
        await this.page.getByRole('link', { name: 'Name : test02 case02 Dentist' }).click();
        await expect(this.page.getByText('Patient : test02 case02')).toBeVisible();
        await expect(this.page.getByText('Dentist : Doctor Emma')).toBeVisible();
        await expect(this.page.getByText('Patient : test02 case02Dentist : Doctor Emma ConsidineAppointment Date : 28 /')).toBeVisible();
        await expect(this.page.getByText('Appointment Date : 28 / 06 /')).toBeVisible();
        await expect(this.page.getByRole('button', { name: 'Create Report' })).toBeVisible();
        if(role === "dentist"){
            await expect(this.page.getByRole('button', { name: 'Create Report' })).toBeVisible();
        }
        else if(role === "admin"){
            await expect(this.page.getByRole('button', { name: 'Edit Appointment' })).toBeVisible();
            await expect(this.page.getByRole('button', { name: 'Cancel' })).toBeVisible();
        }
    } 

    async editAppointment(doctername , time : "morning" | "afternoon" | null , day , month , year , fillwithkeyborad : boolean) {
        await this.page.getByRole('button', { name: 'Edit Appointment' }).click();
        this.filldatabooking(doctername , time , day , month ,year , fillwithkeyborad);
        await this.page.getByRole('button', { name: 'Submit Changes' }).click();
    }

    async Suretocancel(Sure : boolean) {
        if(Sure)
        {
            await this.page.getByRole('button', { name: 'Yes, Confirm' })
        }
        else
        {
            await this.page.getByRole('button', { name: 'No, Cancel' })
        }

    }

    async VerifySuretocancel() {
        await expect(this.page.getByLabel('Are you sure?')).toBeVisible();
        await expect(this.page.locator('div').filter({ hasText: '!' }).nth(2)).toBeVisible();
        await expect(this.page.getByRole('heading', { name: 'Are you sure?' })).toBeVisible();
        await expect(this.page.getByText('Cancel this appointment')).toBeVisible();
        await expect(this.page.getByRole('button', { name: 'Yes, Confirm' })).toBeVisible();
        await expect(this.page.getByRole('button', { name: 'No, Cancel' })).toBeVisible();
    }

    async VerifyCancelAppointment() {
        await expect(this.page.locator('div').filter({ hasText: '!' }).nth(2)).toBeVisible();
        await expect(this.page.getByRole('heading', { name: 'Successfully' })).toBeVisible();
        await expect(this.page.getByText('Appointment canceled')).toBeVisible();
        await expect(this.page.getByRole('button', { name: '👍 OK!' })).toBeVisible();
        await this.page.getByRole('button', { name: '👍 OK!' }).click();
    }
    async ChooseAppointment(name_patient : string)
    {
        await this.page.getByRole('link', { name: `Name : ${name_patient} Dentist` }).click();

    }

    async PatientChoosereport(doctor_name : string)
    {
        await this.page.getByRole('link', { name: `Doctor : ${doctor_name} Date :` }).click();

    }

    async navigateTocreatereport(){
        // await this.page.waitForSelector('button[name="Create Report"]');
        await this.page.getByRole('button', { name: 'Create Report' }).click();
    } 
   
   
    //create reprot
    async createReport(Treatment,   Medication , Recommendation ) {
        
        await this.page.getByRole('textbox').first().fill(Treatment);
        await this.page.getByRole('textbox').nth(1).fill(Medication);
        await this.page.locator('textarea').fill(Recommendation);
        await this.page.getByRole('button', { name: 'Create Report' }).click()
    }

    async check_element_reportpage()
    {
        await expect(this.page.getByText('TreatmentMedicationRecommendation:Create Report')).toBeVisible();
        await expect(this.page.getByRole('heading', { name: 'Create Report' })).toBeVisible();
        await expect(this.page.getByText('Treatment', { exact: true })).toBeVisible();
        await expect(this.page.getByRole('textbox').first()).toBeVisible();
        await expect(this.page.getByText('Medication')).toBeVisible();
        await expect(this.page.getByRole('textbox').nth(1)).toBeVisible();
        await expect(this.page.getByText('Recommendation:')).toBeVisible();
        await expect(this.page.locator('textarea')).toBeVisible();
        await expect(this.page.getByRole('button', { name: 'Create Report' })).toBeVisible();
    }

    async check_datareport(doctorName, treatment, medication, recommendation, date, patientName) {
        await expect(this.page.getByText(`Report By ${doctorName}`)).toBeVisible();
        await expect(this.page.getByRole('img', { name: 'Description' })).toBeVisible();
        await expect(this.page.getByText(`Patient Name ${patientName}`)).toBeVisible();
        await expect(this.page.getByText(treatment)).toBeVisible();
        await expect(this.page.getByText(medication)).toBeVisible();
        await expect(this.page.getByText(`Recommend ${recommendation}`)).toBeVisible();
        await expect(this.page.getByText(`Date ${date}`)).toBeVisible();
    }
    
    async DentistChoosereport(patientname)
    {
        await this.page.getByRole('link', { name: 'Edit Patient : test01 case01' }).click();
    }


}
