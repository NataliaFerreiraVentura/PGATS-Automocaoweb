class Menu{
    navegarParaMenuLogin() {
       cy.get('a[href="/login"]').should('be.visible').click()
    }  
    
    efetuarLogout() {
       cy.get('a[href="/logout"]').should('be.visible').click()
    }

}

export default new Menu();