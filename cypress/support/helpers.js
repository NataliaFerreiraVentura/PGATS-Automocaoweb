import { faker, fakerPT_BR } from '@faker-js/faker';
import staticData from '../fixtures/testData.json';

// ========== DATA GENERATION FUNCTIONS ==========
// Funções para geração de dados dos testes

export function getUserData() {
  return {
    name: fakerPT_BR.person.fullName(),
    firstName: fakerPT_BR.person.firstName(),
    lastName: fakerPT_BR.person.lastName(),
    password: fakerPT_BR.internet.password({ length: 8 }),
    phone: fakerPT_BR.phone.number(),
    address: fakerPT_BR.location.streetAddress(),
    city: fakerPT_BR.location.city(),
    state: fakerPT_BR.location.state(),
    zipcode: fakerPT_BR.location.zipCode(),
    country: 'Canada',
    company: faker.company.name()
  };
}

export function getRandomEmail() {
  return fakerPT_BR.internet.email({firstName: 'QATesterPGATS'});
}

export function createNewUserData() {
    const dynamicData = getUserData();
    return {
      name: dynamicData.name,
      email: getRandomEmail(),
      password: dynamicData.password,
      firstName: dynamicData.firstName,
      lastName: dynamicData.lastName,
      company: dynamicData.company,
      address: dynamicData.address,
      city: dynamicData.city,
      state: dynamicData.state,
      zipcode: dynamicData.zipcode,
      mobile: dynamicData.phone
    };
}

export function validateRegistrationSuccess(userName) {
  cy.get('[data-qa="account-created"]')
    .should('be.visible')
    .and('contain', 'Account Created!');
  
  cy.get('.btn-primary')
    .should('contain', 'Continue')
    .click();
  
  cy.get('b').should('contain', userName);
}

export function validateLoginSuccess() {
  cy.get('b').should('be.visible');
  cy.get('.fa-user').should('exist');
}

export function validateLoginError() {
  cy.get('[style="color: red;"]')
    .should('be.visible')
    .and('contain', 'Your email or password is incorrect!');
}