describe('Test site loading locally', () => {
  it('Successfully loads', () => {
    cy.visit('http://localhost:4200');
  });
});
