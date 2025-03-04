import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000', // La URL base de tu aplicación Next.js
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    viewportWidth: 1280,
    viewportHeight: 720,
    video: false, // Cambiar a true si quieres grabar videos de las pruebas
    screenshotOnRunFailure: true,
    supportFile: 'cypress/support/e2e.js' // Para comandos personalizados
  }
})
