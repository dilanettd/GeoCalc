describe('Displaying the header', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200');
  });

  it('The site should display the header', () => {
    cy.get('.header').should('exist');
  });

  it('Should be the primary color of the site', () => {
    cy.get('.header')
      .should('have.css', 'background-color')
      .and('eq', 'rgba(25, 118, 210, 0.808)');
  });

  it('should display the app name in the header', () => {
    cy.get('[ng-reflect-router-link="/"] > span')
      .contains('GeoCalc')
      .should('exist');
  });

  it('should have a navigation button about', () => {
    cy.get('.header > .btn').should('exist');
  });

  it('should have a logo in the header', () => {
    cy.get('[ng-reflect-router-link="/"] > img')
      .should('have.attr', 'src')
      .and('include', 'logo.png');
  });
});

describe('Clicking on links', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200');
  });

  it('should navigate towards the home page', () => {
    cy.get('[ng-reflect-router-link="/"]').click();
    cy.location('pathname').should('eq', '/');
  });
  it('should navigate towards the about page', () => {
    cy.get('.header > .btn').click();
    cy.location('pathname').should('eq', '/about');
  });
});
