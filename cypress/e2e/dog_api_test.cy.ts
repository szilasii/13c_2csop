
/// <reference types="cypress" />
describe('GET /users végpont tesztelése', () => {
  it('visszaadja a felhasználók listáját', () => {
    cy.request('GET', '/dogs')
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('array');
        expect(response.body[0]).to.have.property('id');
      });
  });
});