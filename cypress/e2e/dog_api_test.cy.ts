
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

describe('API fájlfeltöltés', () => {

  it('feltölt egy fájlt multipart/form-data kéréssel', () => {
    
    const fileName = 'cica.jpg'

    cy.fixture(fileName, 'binary')
      .then(Cypress.Blob.binaryStringToBlob)
      .then((fileContent) => {
        
        const formData = new FormData();
        formData.append('avatar', fileContent, fileName);

        cy.request({
          method: 'POST',
          url: '/user/avatar',
          body: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        }).then((response) => {
          expect(response.status).to.eq(200)
        })
      })
  })
})