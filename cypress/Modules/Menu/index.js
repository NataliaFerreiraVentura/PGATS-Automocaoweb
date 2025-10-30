class Menu{
    navegarParaMenuLogin() {
       cy.get('a[href="/login"]').should('be.visible').click()
    }  
    
    efetuarLogout() {
       cy.get('a[href="/logout"]').should('be.visible').click()
    }

    navegarParaMenuContato() {
        cy.get('a[href="/contact_us"]').should('be.visible').click();
    }

}

export default new Menu();