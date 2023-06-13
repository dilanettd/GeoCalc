describe('FiguresService Tests', () => {
  it('should retrieve all figures', () => {
    cy.request('GET', 'http://127.0.0.1:5000/api/figures').then((response) => {
      expect(response.status).to.equal(200);
    });
  });

  it('should retrieve all units', () => {
    cy.request('GET', 'http://127.0.0.1:5000/api/figures/units').then(
      (response) => {
        expect(response.status).to.equal(200);
      }
    );
  });

  it('should calculate perimeter', () => {
    const data = { id: 'square', values: [5] };

    cy.request(
      'POST',
      'http://127.0.0.1:5000/api/figures/perimeter',
      data
    ).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body).to.have.property('{"perimeter": 20}');
    });
  });

  it('should calculate area', () => {
    const data = { id: 'triangle', values: [5, 7] };

    cy.request('POST', 'http://127.0.0.1:5000/api/figures/area', data).then(
      (response) => {
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property('{area: 17.5}');
      }
    );
  });
});
