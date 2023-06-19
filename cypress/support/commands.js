Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
    cy.get('#firstName').type('Gabriel')
    cy.get('#lastName').type('Tanaka')
    cy.get('#email').type('gabrieltnk763@gmail.com')
    cy.get('#open-text-area').type('Meu primeiro teste com Cypress', { delay: 0})
    cy.contains('button', 'Enviar').click()
})