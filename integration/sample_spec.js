describe('This will verify the basic manage settings functionality', () => {
    
    Cypress.on('uncaught:exception', (err, runnable) => {
        return false
    })
    Cypress.config('defaultCommandTimeout', 8000);

    beforeEach(() => {
        //Executes Login Command
        cy.login('0466134574','AWqasde321')
        //Navigates to Amaysim Dashboard
        cy.log('####   Navigates to Amaysim settings dashboard   ####')
        cy.get('a[class="sc-jtRfpW evmUcX"]').contains('Manage plan')
        .should('be.visible')
        cy.visit('https://www.amaysim.com.au/my-account/my-amaysim/dashboards?pid=2904945')
        cy.get('div[class="ama-page-header"]')
            .should('be.visible')
        //Check if popup window is displayed
        cy.get('body').then((body) => {
            if (body.find('div[class="road-blocker-container"]').length > 0) {
                cy.contains('We need to confirm some details').type('{esc}')
            }
        })
        //Navigates to Amaysim Settings page
        cy.wait(2000)
        cy.get('a[href="/my-account/my-amaysim/settings"]').contains('Settings')
            .should('be.visible')    
            .click()
        cy.get('a[id="edit_settings_phone_label"]', { timeout: 25000 })
            .contains('Edit')
            .should('be.visible')
            .log('####   Settings page is loaded successfully   ####')
    })

    it('Validates Manage settings functionality', () => {
        
        //#########################//
        //Verify SIM Nickname field//
        //#########################//
        cy.log('####   Verify SIM Nickname field   ####')
        cy.get('a[id="edit_settings_phone_label"]').contains('Edit').click()
        cy.get('div[class="loading-spinner"]').should("be.visible")
        cy.get('div[class="loading-spinner"]', { timeout: 50000 }).should("not.be.visible")
        //Verify that SIM Nickname text field will only accept alphanumeric characters and space
        cy.log('####   Verify that SIM Nickname value will only accept alphanumeric characters and space   ####')
        cy.get('input[id="my_amaysim2_setting_phone_label"]')
            .should('have.attr', 'pattern', "^[\\s0-9A-Za-z\\-_\\.,\\-']+$")
        //Verify that SIM Nickname text field will only accept 40 characters
        cy.log('####   Verify that SIM Nickname value will only accept 40 characters   ####')
        cy.get('input[id="my_amaysim2_setting_phone_label"]')
            .should('have.attr', 'maxlength', "40")
        //Verify that SIM Nickname text field will show an error for invalid input
        cy.log('####   Verify that SIM Nickname field will show an error for invalid input   ####')
        cy.get('input[id="my_amaysim2_setting_phone_label"]').clear()
        cy.get('input[id="my_amaysim2_setting_phone_label"]').type('!@#$%^&*()')
        cy.get('input[id="my_amaysim2_setting_phone_label"]', { timeout: 2500 })
            .should('have.attr', 'aria-invalid', "true")
        cy.get('small[class="error end"]').should("be.visible")
        //Verify that the value is saved
        cy.log('####   Verify that the value is saved   ####')
        const randomVal = Math.floor(1000 + Math.random() * 9000)
        const randomInput = 'Test ' + randomVal
        cy.get('input[id="my_amaysim2_setting_phone_label"]').clear()
        cy.get('input[id="my_amaysim2_setting_phone_label"]').type(randomInput)
        cy.get('input[type="submit"]').click()
        cy.get('div[class="loading-spinner"]').should("be.visible")
        cy.get('div[class="loading-spinner"]', { timeout: 50000 }).should("not.be.visible")
        cy.get('div[class="small-12 columns margin-top-half bold setting-option-details-text"]', { timeout: 1000 })
            .contains(randomInput)

        //#########################//
        //Verify Recharge PIN field//
        //#########################//
        cy.log('####   Verify Recharge PIN field   ####')
        cy.get('a[id="edit_settings_recharge_pin"]').contains('Edit').click()
        cy.get('div[class="loading-spinner"]').should("be.visible")
        cy.get('div[class="loading-spinner"]', { timeout: 50000 }).should("not.be.visible")
        //Verify that Recharge PIN text field will only accept numeric characters
        cy.log('####   Verify that Recharge PIN text field will only accept numeric characters   ####')
        cy.get('input[id="my_amaysim2_setting_topup_pw"]')
            .should('have.attr', 'pattern', "^[0-9]+$")
        //Verify that Recharge PIN text field will only accept 40 characters
        cy.log('####   Verify that Recharge PIN value will only accept 4 characters   ####')
        cy.get('input[id="my_amaysim2_setting_topup_pw"]')
            .should('have.attr', 'maxlength', "4")
        //Verify that Recharge PIN text field will show an error for invalid input
        cy.log('####   Verify that Recharge PIN field will show an error for invalid input   ####')
        cy.get('input[id="my_amaysim2_setting_topup_pw"]').clear()
        cy.get('input[id="my_amaysim2_setting_topup_pw"]').type('a!@#')
        cy.get('input[id="my_amaysim2_setting_topup_pw"]', { timeout: 2500 })
            .should('have.attr', 'aria-invalid', "true")
        cy.get('small[class="error end"]').should("be.visible")
        //Verify that the value is saved
        cy.log('####   Verify that the value is saved   ####')
        const randomPIN = Math.floor(1000 + Math.random() * 9000)
        cy.get('input[id="my_amaysim2_setting_topup_pw"]').clear()
        cy.get('input[id="my_amaysim2_setting_topup_pw"]').type(randomPIN)
        cy.get('input[type="submit"]').click()
        cy.get('div[class="loading-spinner"]').should("be.visible")
        cy.get('div[class="loading-spinner"]', { timeout: 50000 }).should("not.be.visible")
        cy.get('div[class="small-12 columns margin-top-half bold setting-option-details-text"]', { timeout: 1000 })
            .contains(randomPIN)

        //#########################//
        //Verify Caller ID checkbox//
        //#########################//
        cy.log('####   Verify Caller ID checkbox   ####')
        cy.get('input[id="my_amaysim2_setting_caller_id_out"]').click({ force: true })
        cy.get('div[class="loading-spinner"]').should("be.visible")
        cy.get('div[class="loading-spinner"]', { timeout: 50000 }).should("not.be.visible")
        cy.wait(300)
        cy.get('p[class="popup-content"]', { timeout: 10000 })
            .contains('We have successfully updated your SIM settings.')
            .log('####   Caller ID is updated successfully   ####')
        cy.wait(300)

        //############################//
        //Verify Call Waiting checkbox//
        //############################//
        cy.log('####   Verify Call Waiting checkbox   ####')
        cy.reload()
        cy.get('input[id="my_amaysim2_setting_caller_waiting"]', { timeout: 25000 }).click({ force: true })
        cy.get('div[class="loading-spinner"]').should("be.visible")
        cy.get('div[class="loading-spinner"]', { timeout: 50000 }).should("not.be.visible")
        cy.wait(300)
        cy.get('p[class="popup-content"]', { timeout: 10000 })
            .contains('We have successfully updated your SIM settings.')
            .log('####   Call Waiting is updated successfully   ####')
        cy.wait(300)

        //#########################//
        //Verify Voicemail checkbox//
        //#########################//
        cy.log('####   Verify Voicemail checkbox   ####')
        cy.reload()
        cy.get('input[id="my_amaysim2_setting_voice_mail"]', { timeout: 25000 }).click({ force: true })
        cy.get('div[class="loading-spinner"]').should("be.visible")
        cy.get('div[class="loading-spinner"]', { timeout: 50000 }).should("not.be.visible")
        cy.wait(300)
        cy.get('p[class="popup-content"]', { timeout: 10000 })
            .contains('We have successfully updated your SIM settings.')
            .log('####   Voicemail is updated successfully   ####')
        cy.wait(300)
        
        //###########################//
        //Verify Usage Alert checkbox//
        //###########################//
        cy.log('####   Verify Usage Alert checkbox   ####')
        cy.reload()
        cy.get('input[id="my_amaysim2_setting_usage_alert"]', { timeout: 25000 }).click({ force: true })
        cy.get('body').then((body) => {
            if (body.find('h1[class="ama-hero-heading popup-confirm white"]', { timeout: 1000 }).length > 0) {
                cy.get('a[id="confirm_popup_yes"]')
                .contains('Yes')
                .click({ force: true })
            }
        })
        cy.get('div[class="loading-spinner"]').should("be.visible")
        cy.get('div[class="loading-spinner"]', { timeout: 50000 }).should("not.be.visible")
        cy.wait(300)
        cy.get('p[class="popup-content"]', { timeout: 10000 })
            .contains('We have successfully updated your SIM settings.')
            .log('####   Usage Alerts is updated successfully   ####')
        cy.wait(300)
        
        //############################//
        //Verify Intl Roaming checkbox//
        //############################//
        cy.log('####   Verify Intl Roaming checkbox   ####')
        cy.reload()
        cy.get('input[id="my_amaysim2_setting_intl_roaming"]', { timeout: 25000 }).click({ force: true })
        cy.get('body').then((body) => {
            if (body.find('h1[class="ama-hero-heading popup-confirm white"]', { timeout: 1000 }).length > 0) {
                cy.get('a[id="confirm_popup_yes"]')
                .contains('Yes')
                .click({ force: true })
            }
        })  
        cy.get('div[class="loading-spinner"]').should("be.visible")
        cy.get('div[class="loading-spinner"]', { timeout: 50000 }).should("not.be.visible")
        cy.wait(300)
        cy.get('p[class="popup-content"]', { timeout: 10000 })
            .contains('We have successfully updated your SIM settings.')
            .log('####   International Roaming is updated successfully   ####')
        cy.wait(300)
        
        //#######################//
        //Verify Call Forwarding //
        //#######################//
        cy.log('####   Verify Call Forwarding   ####')
        cy.reload()
        cy.get('a[id="edit_settings_call_forwarding"]', { timeout: 25000 }).contains('Edit').click()
        cy.get('div[class="loading-spinner"]').should("be.visible")
        cy.get('div[class="loading-spinner"]', { timeout: 50000 }).should("not.be.visible")
        cy.get('body').then((body) => {
            if (body.find('h1[class="ama-hero-heading popup-confirm row white"]', { timeout: 1000 }).length > 0) {
                cy.get('a[class="confirm_popup_confirm button-green-action small-12 columns text-center"]')
                .contains('Confirm')
                .click({ force: true })
            }
        }) 
        //Verify when NO radio button is selected
        cy.log('####   Verify when NO radio button is selected   ####')
        cy.get('input[id="my_amaysim2_setting_call_divert_false"]', { timeout: 25000 }).click({ force: true })
        cy.get('input[id="my_amaysim2_setting_call_divert_number"]').should("not.be.visible")
            .log('####   Call Divert text field is not visible   ####')
        cy.get('input[type="submit"]').click()
        cy.get('div[class="loading-spinner"]').should("be.visible")
        cy.get('div[class="loading-spinner"]', { timeout: 50000 }).should("not.be.visible")
        cy.wait(300)
        cy.get('p[class="popup-content"]', { timeout: 10000 })
            .contains('We have successfully updated your SIM settings.')
            .log('####   Call forwarding switched to NO   ####')
        //Verify Call Forwarding state after refresh
        cy.log('####   Verify Call Forwarding state after refresh   ####')
        cy.reload()
        cy.get('div[class="small-1 medium-2 large-1 columns bold text-right setting-option-value-text"]', { timeout: 25000 })
            .contains('No')
            .should("be.visible")
            .log('####   Call forwarding is displaying NO   ####')

        //Verify when YES radio button is selected
        cy.log('####   Verify when YES radio button is selected   ####')
        cy.get('a[id="edit_settings_call_forwarding"]', { timeout: 25000 }).contains('Edit').click()
        cy.get('div[class="loading-spinner"]').should("be.visible")
        cy.get('div[class="loading-spinner"]', { timeout: 50000 }).should("not.be.visible")
        cy.get('body').then((body) => {
            if (body.find('h1[class="ama-hero-heading popup-confirm row white"]', { timeout: 1000 }).length > 0) {
                cy.get('a[class="confirm_popup_confirm button-green-action small-12 columns text-center"]')
                .contains('Confirm')
                .click({ force: true })
            }
        }) 
        //Verify that Call Divert text field is visible when YES radio button is selected
        cy.get('input[id="my_amaysim2_setting_call_divert_true"]', { timeout: 25000 }).click({ force: true })
        cy.get('input[id="my_amaysim2_setting_call_divert_number"]').should("be.visible")
            .log('####   Call Divert text field is visible   ####')
        
        //Verify Call Divert text field behavior when symbols are entered
        cy.log('####   Verify Call Divert text field behavior when symbols are entered  ####')
        cy.get('input[id="my_amaysim2_setting_call_divert_number"]').clear()
        cy.get('input[id="my_amaysim2_setting_call_divert_number"]').type('!@#$%^&*()')
       
        cy.get('input[id="my_amaysim2_setting_call_divert_number"]', { timeout: 2500 })
            .invoke('attr', 'aria-invalid')
            .then(state => {
                if (state == 'true'){
                    cy.log('####   PASS: Error warning is set to ' + state + ' when invalid value is entered   ####')
                }
                else{
                    cy.log('####   FAIL: Error warning is set to ' + state + ' when invalid value is entered   ####')
                } 
            })

         cy.get('input[type="submit"]').click()
         cy.get('div[class="loading-spinner"]').should("be.visible")
         cy.get('div[class="loading-spinner"]', { timeout: 50000 }).should("not.be.visible")
         cy.wait(300)
         
         cy.get('input[id="my_amaysim2_setting_call_divert_number"]', { timeout: 2500 })
         .invoke('attr', 'aria-invalid')
         .then(state => {
             if (state == 'true'){
                 cy.log('####   PASS: Error warning is set to ' + state + ' after Saving   ####')
             }
             else{
                 cy.log('####   FAIL: Error warning is set to ' + state + ' after Saving   ####')
             } 
         })
         cy.get('span[class="error small-12 medium-6 medium-push-4 end columns margin-none"]').should("be.visible")
 
        //Verify Call Divert text field behavior when non-numeric is entered
        cy.log('####   Verify Call Divert text field behavior when non-numeric is entered  ####')
        cy.get('input[id="my_amaysim2_setting_call_divert_number"]').clear()
        cy.get('input[id="my_amaysim2_setting_call_divert_number"]').type('asdasd')
       
        cy.get('input[id="my_amaysim2_setting_call_divert_number"]', { timeout: 2500 })
            .invoke('attr', 'aria-invalid')
            .then(state => {
                if (state == 'true'){
                    cy.log('####   PASS: Error warning is set to ' + state + ' when invalid value is entered   ####')
                }
                else{
                    cy.log('####   FAIL: Error warning is set to ' + state + ' when invalid value is entered   ####')
                } 
            })

        cy.get('input[type="submit"]').click()
        cy.get('div[class="loading-spinner"]').should("be.visible")
        cy.get('div[class="loading-spinner"]', { timeout: 50000 }).should("not.be.visible")
        cy.wait(300)
        
        cy.get('input[id="my_amaysim2_setting_call_divert_number"]', { timeout: 2500 })
        .invoke('attr', 'aria-invalid')
        .then(state => {
            if (state == 'true'){
                cy.log('####   PASS: Error warning is set to ' + state + ' after Saving   ####')
            }
            else{
                cy.log('####   FAIL: Error warning is set to ' + state + ' after Saving   ####')
            } 
        })
        cy.get('span[class="error small-12 medium-6 medium-push-4 end columns margin-none"]').should("be.visible")
        cy.wait(300)

        //Verify Call Divert text field behavior when invalid Phone Number is entered
        cy.log('####   Verify Call Divert text field behavior when invalid Phone Number is entered  ####')
        const randomNum = Math.floor(1000000 + Math.random() * 9000000)
        cy.get('input[id="my_amaysim2_setting_call_divert_number"]').clear()
        cy.get('input[id="my_amaysim2_setting_call_divert_number"]').type(randomNum)
       
        cy.get('input[id="my_amaysim2_setting_call_divert_number"]', { timeout: 2500 })
            .invoke('attr', 'aria-invalid')
            .then(state => {
                if (state == 'true'){
                    cy.log('####   PASS: Error warning is set to ' + state + ' when invalid value is entered   ####')
                }
                else{
                    cy.log('####   FAIL: Error warning is set to ' + state + ' when invalid value is entered   ####')
                } 
             })

        cy.get('input[type="submit"]').click()
        cy.get('div[class="loading-spinner"]').should("be.visible")
        cy.get('div[class="loading-spinner"]', { timeout: 50000 }).should("not.be.visible")
        cy.wait(300)
        
        cy.get('input[id="my_amaysim2_setting_call_divert_number"]', { timeout: 2500 })
        .invoke('attr', 'aria-invalid')
        .then(state => {
            if (state == 'true'){
                cy.log('####   PASS: Error warning is set to ' + state + ' after Saving   ####')
            }
            else{
                cy.log('####   FAIL: Error warning is set to ' + state + ' after Saving   ####')
            } 
        })
        cy.get('span[class="error small-12 medium-6 medium-push-4 end columns margin-none"]').should("be.visible")

        //Verify Call Divert text field behavior when valid Phone Number is entered
        cy.log('####   Verify Call Divert text field behavior when valid Phone Number is entered  ####')
        cy.get('input[id="my_amaysim2_setting_call_divert_number"]').clear()
        cy.get('input[id="my_amaysim2_setting_call_divert_number"]').type('0412345677')
       
        cy.get('input[id="my_amaysim2_setting_call_divert_number"]', { timeout: 2500 })
            .invoke('attr', 'aria-invalid')
            .then(state => {
                if ((state == 'false') || (state == undefined)){
                    cy.log('####   PASS: Error warning is set to ' + state + ' when valid value is entered   ####')
                }
                else{
                    cy.log('####   FAIL: Error warning is set to ' + state + ' when valid value is entered   ####')
                } 
             })
        
        cy.get('input[type="submit"]').click()
        cy.get('div[class="loading-spinner"]').should("be.visible")
        cy.get('div[class="loading-spinner"]', { timeout: 50000 }).should("not.be.visible")
        cy.wait(300)
        
        cy.get('p[class="popup-content"]', { timeout: 10000 })
            .contains('We have successfully updated your SIM settings.')
            .log('####   Call Waiting is updated successfully   ####')
        cy.wait(300)
        
        cy.get('div[class="small-12 columns bold setting-option-details-text"]')
            .contains('Forward calls to 0412345677')
            .should("be.visible")
            .log('####   Number is successfully updated    ####')
        cy.wait(300)

        //#########################//
        //Verify Premium SMS limit //
        //#########################//
        cy.log('####   Verify Premium SMS limit   ####')
        cy.reload()
        cy.get('a[id="edit_settings_premium_sms_limit"]', { timeout: 25000 }).contains('Edit').click()
        cy.get('div[class="loading-spinner"]').should("be.visible")
        cy.get('div[class="loading-spinner"]', { timeout: 50000 }).should("not.be.visible")
        
        cy.get('select[id="my_amaysim2_setting_psms_spend"]').select('$80')
        cy.get('input[type="submit"]').click()
        cy.get('div[class="loading-spinner"]').should("be.visible")
        cy.get('div[class="loading-spinner"]', { timeout: 50000 }).should("not.be.visible")
        cy.get('div[class="small-1 medium-2 large-1 columns bold text-right setting-option-value-text"]', { timeout: 1000 })
            .contains('$80')
            .should("be.visible")
            .log('####   Premium SMS limit is successfully updated    ####')
        cy.wait(300)
        cy.get('a[id="edit_settings_premium_sms_limit"]', { timeout: 25000 }).contains('Edit').click()
        cy.get('div[class="loading-spinner"]').should("be.visible")
        cy.get('div[class="loading-spinner"]', { timeout: 50000 }).should("not.be.visible")    
       
        cy.get('select[id="my_amaysim2_setting_psms_spend"]').select('$40')
        cy.get('input[type="submit"]').click()
        cy.get('div[class="loading-spinner"]').should("be.visible")
        cy.get('div[class="loading-spinner"]', { timeout: 50000 }).should("not.be.visible")
        cy.get('div[class="small-1 medium-2 large-1 columns bold text-right setting-option-value-text"]', { timeout: 1000 })
            .contains('$40')
            .should("be.visible")
            .log('####   Premium SMS limit is successfully updated    ####')
        cy.wait(300)

        //##########################//
        //Verify Auto credit top-up //
        //##########################//
        cy.log('####   Verify Auto credit top-up   ####')
        cy.reload()
        cy.get('a[id="edit_settings_auto_recharge"]', { timeout: 25000 }).contains('Edit').click()
        cy.get('div[class="loading-spinner"]').should("be.visible")
        cy.get('div[class="loading-spinner"]', { timeout: 50000 }).should("not.be.visible")
        
        //Verify when NO radio button is selected
        cy.log('####   Verify when NO radio button is selected   ####')
        cy.get('input[id="my_amaysim2_setting_auto_topup_false"]', { timeout: 25000 }).click({ force: true })
        cy.get('select[id="my_amaysim2_setting_auto_topup_min_balance"]').should("not.be.visible")
        cy.get('select[id="my_amaysim2_setting_auto_topup_amount"]').should("not.be.visible")
        
        cy.get('input[type="submit"]').click()
        cy.get('div[class="loading-spinner"]').should("be.visible")
        cy.get('div[class="loading-spinner"]', { timeout: 50000 }).should("not.be.visible")
        cy.get('div[class="small-1 medium-2 large-1 columns bold text-right setting-option-value-text"]')
            .contains('No')
            .should("be.visible")
            .log('####   Auto credit top-up is successfully updated to NO   ####')
        
        //Verify when YES radio button is selected
        cy.log('####   Verify when YES radio button is selected   ####')
        cy.get('a[id="edit_settings_auto_recharge"]', { timeout: 25000 }).contains('Edit').click()
        cy.get('div[class="loading-spinner"]').should("be.visible")
        cy.get('div[class="loading-spinner"]', { timeout: 50000 }).should("not.be.visible")
         
        cy.get('input[id="my_amaysim2_setting_auto_topup_true"]', { timeout: 25000 }).click({ force: true })
        cy.get('select[id="my_amaysim2_setting_auto_topup_min_balance"]').should("be.visible")
            .select('$10')
        cy.get('select[id="my_amaysim2_setting_auto_topup_amount"]').should("be.visible")
            .select('$20')
        
        cy.get('input[type="submit"]').click()
        cy.get('div[class="loading-spinner"]').should("be.visible")
        cy.get('div[class="loading-spinner"]', { timeout: 50000 }).should("not.be.visible")
        cy.wait(300)
        
        cy.get('div[class="small-12 columns bold setting-option-details-text"]')
            .contains('Automatically top up my mobile service with')
            .should("be.visible")
            .log('####   Auto credit top-up is successfully updated    ####')
        cy.wait(300)
   
    })
})

