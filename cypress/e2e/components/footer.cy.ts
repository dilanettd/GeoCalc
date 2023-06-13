describe('Displaying the header', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200');
  });

  it('The site should display the footer', () => {
    cy.get('.footer').should('exist');
  });

  it('Should be the secondary color of the site', () => {
    cy.get('.header')
      .should('have.css', 'background-color')
      .and('eq', 'rgba(163, 203, 236, 0.808)');
  });

  it('Should Display text copy right', () => {
    cy.get('.pt-4')
      .contains('Copyright Dilano.Dev© 2023. All rights reserved.')
      .should('exist');
  });
});
