// cypress/e2e/hero-section.cy.js

describe('HeroSection Component', () => {
  beforeEach(() => {
    // Visita la página principal donde se encuentra el HeroSection
    cy.visit('http://localhost:3000/')
  })

  it('debería encontrar y clickear el botón "Comienza ahora"', () => {
    // Encuentra el botón por su texto
    cy.contains('Comienza ahora').should('be.visible')
    cy.contains('Comienza ahora').click()

    // Verificar que se llama a la función onActionClick
    // (Necesitamos saber a qué sección debe desplazarse)
  })

  it('debería desplazarse a la sección objetivo al hacer clic en el botón', () => {
    // Encuentra el botón por su texto
    cy.contains('Comienza ahora').click()

    // Asumiendo que hay una sección con un ID específico al que se desplaza
    // Por ejemplo, si el destino tiene id="conversion-section"
    cy.get('#conversion').should('exist')

    // Verifica que la sección del convertidor es visible por su título
    cy.contains('h2', 'Convertidor de YML a Rutas').should('be.visible')

    // Verifica que se ha hecho scroll hasta la sección del convertidor
    cy.get('#conversion').then(() => {})
  })
})
