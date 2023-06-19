/// <reference types="Cypress" />


describe('Central de Atendimento ao Cliente TAT', function() {
  beforeEach(function(){
    cy.visit('./src/index.html')
  })
    it('verifica o título da aplicação', function() {
      cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })
    it('preenche os campos obrigatorios e envia o formulario', function()  {
      cy.get('#firstName').type('Gabriel')
      cy.get('#lastName').type('Tanaka')
      cy.get('#email').type('gabrieltnk763@gmail.com')
      cy.get('#open-text-area').type('Meu primeiro teste com Cypress', { delay: 0})
      cy.contains('button', 'Enviar').click()

      cy.get('.success').should('be.visible')
    })
    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
      cy.get('#firstName').type('Gabriel')
      cy.get('#lastName').type('Tanaka')
      cy.get('#email').type('gabrieltnk763@gmail,com')
      cy.get('#open-text-area').type('Meu primeiro teste com Cypress', { delay: 0})
      cy.get('.button').click()

      cy.get('.error').should('be.visible')
    })
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
      cy.get('#firstName').type('Gabriel')
      cy.get('#lastName').type('Tanaka')
      cy.get('#email').type('gabrieltnk763@gmail.com')
      cy.get('#phone-checkbox').click()
      cy.get('#open-text-area').type('Meu primeiro teste com Cypress', { delay: 0})
      cy.contains('button', 'Enviar').click()

      cy.get('.error').should('be.visible')
    })
    it('preenche e limpa os campos nome, sobrenome, email e telefone', function(){
      cy.get('#firstName').type('Gabriel')
      .should('have.value', 'Gabriel')
      .clear()
      cy.get('#lastName').type('Tanaka')
      .should('have.value', 'Tanaka')
      .clear()
      cy.get('#email').type('gabrieltnk763@gmail.com')
      .should('have.value', 'gabrieltnk763@gmail.com')
      .clear()
      cy.get('#phone').type('92984849561')
      .should('have.value', '92984849561')
      .clear()
      cy.get('#open-text-area').type('Meu primeiro teste com Cypress', { delay: 0})
      .should('have.value', 'Meu primeiro teste com Cypress')
      .clear()
      cy.get('.button').click()

      cy.get('.error').should('be.visible')
    })
    it('exibe mensagem de erro ao submeter o formulário sem preen cher os campos obrigatórios', function(){
      cy.get('.button').click()

      cy.get('.error').should('be.visible')
    })
    it('envia o formuário com sucesso usando um comando customizado', function(){
      cy.fillMandatoryFieldsAndSubmit()

      cy.get('.success').should('be.visible')
    })
    it(' seleciona um produto (YouTube) por seu texto', function(){
      cy.get('select').select('YouTube').should('have.value', 'youtube')
    })
    it('seleciona um produto (Mentoria) por seu valor (value)',function(){
      cy.get('select').select('blog').should('have.value', 'blog')
    })
    it('seleciona um produto (Blog) por seu índice', function(){
      cy.get('select').select(1).should('have.value', 'blog')
    })
    it('marca o tipo de atendimento "Feedback"', function(){
      cy.get('input[type="radio"][value="feedback"]').check()
    })
    it('marca cada tipo de atendimento', function(){
      cy.get('input[type="radio"]')
      .should('have.length', 3)
      .each(function($radio){
        cy.wrap($radio).check()
        cy.wrap($radio).should('be.checked')
      })
    })
    it('marca ambos checkboxes, depois desmarca o último', function(){
      cy.get('input[type="checkbox"]').check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked')
     
    })
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
      cy.get('#phone-checkbox').check()
      .should('be.checked')
      cy.get('.button').click()

      cy.get('.error').should('be.visible')
    })
    it('seleciona um arquivo da pasta fixtures', function(){
      cy.get('input[type="file"]')
      .should('not.have.value')
      cy.get('input[type="file"]').selectFile('cypress/fixtures/example.json')
      .should(function($input){
        //verificar o nome do arquivo que foi adicionado
        //console.log($input) e ver no console do devtools  
        expect($input[0].files[0].name).to.equal('example.json')
      })
    })
    it('seleciona um arquivo simulando um drag-and-drop', function(){
      cy.get('input[type="file"]')
      .should('not.have.value')
      cy.get('input[type="file"]').selectFile('cypress/fixtures/example.json', {action: 'drag-drop'}) // arrasta o arquivo
      .should(function($input){
        //verificar o nome do arquivo que foi adicionado
        //console.log($input) e ver no console do devtools  
        expect($input[0].files[0].name).to.equal('example.json')
      })
    })
    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function(){
      cy.fixture('example.json').as('sampleFile')
      cy.get('input[type="file"]')
      .selectFile('@sampleFile')
      .should(function($input){
        expect($input[0].files[0].name).to.equal('example.json')
      })
    })
    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
      cy.get('#privacy a')
      .invoke('removeAttr', 'target')
      .click()
    })
    it  ('acessa a página da política de privacidade removendo o target e então clicando no link', function(){
      cy.get('#privacy a')
      .invoke('removeAttr', 'target')
      .click()
      cy.contains('Talking About Testing').should('be.visible')
    })
  })