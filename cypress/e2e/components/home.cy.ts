describe('Displaying the header', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200');
  });

  it('The site should display the home component', () => {
    cy.get('.container').should('exist');
  });

  it('should display the header correctly', () => {
    cy.get('.card-header h5').should(
      'have.text',
      'Calculating area and Perimeter'
    );
  });

  it('should display the figure selection correctly', () => {
    cy.get('#figure').select('Square');
    cy.get('#figure').should('have.value', 'square');
  });

  it('should display the type of calculation selection correctly', () => {
    cy.get('#typeOfCalculation').select('Area');

    cy.get('#typeOfCalculation').should('have.value', 'Area');
  });

  it('should calculate and display the result correctly', () => {
    cy.get('#figure').select('square');
    cy.get('#typeOfCalculation').select('Area');
    cy.get('#attribute0').type('10');
    cy.get('.my-3 > .btn').click();
    cy.get('.result > .input-group > .input-group-text').should(
      'have.text',
      'Area = 100'
    );
  });
});
