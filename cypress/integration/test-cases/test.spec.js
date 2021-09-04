/// <reference types="cypress" />

const TOTAL_ITEMS = 4;

describe('Test Items in basket', () => {
  before(() => {
    cy.visit('https://obscure-waters-60500.herokuapp.com/')
  })

  it('should be empty basket', () => {
    cy.get('.navbar-brand > .badge').should('have.text', 0);
  })

  it('should add all items to basket', () => {
    cy.get('.row .col-md-4 > .btn-secondary').click({ multiple: true })
  })

  it(`should be ${TOTAL_ITEMS} items in basket`, () => {
    cy.get('.navbar-brand > .badge').should('have.text', TOTAL_ITEMS);
  })
})

describe('Clear all items from basket', () => {
  before(() => {
    cy.visit('https://obscure-waters-60500.herokuapp.com/')
  })

  it('should be empty basket', () => {
    cy.get('.navbar-brand > .badge').should('have.text', 0);
  })

  it('should add all items to basket', () => {
    cy.get('.row .col-md-4 > .btn-secondary').click({ multiple: true })
  })

  it(`should be ${TOTAL_ITEMS} items in basket`, () => {
    cy.get('.navbar-brand > .badge').should('have.text', TOTAL_ITEMS);
  })

  it('should remove items from basket', () => {
    cy.get('.btn-success').click()
  })

  it('should be empty basket', () => {
    cy.get('.navbar-brand > .badge').should('have.text', 0);
  })

})


describe('Test Item counter', () => {
  before(() => {
    cy.visit('https://obscure-waters-60500.herokuapp.com/')
  })

  it('should be Zero in counter', () => {
    cy.get(':nth-child(3) > .row > .col-md-1 > .badge').should('have.text', 'Zero')
  })

  it('should increase item counter by 3', () => {
    for (let i = 0; i < 3; i++) {
      cy.get(':nth-child(3) > .row > .col-md-4 > .btn-secondary').click()
    }
  })

  it('should be 3 in counter', () => {
    cy.get(':nth-child(3) > .row > .col-md-1 > .badge').should('have.text', 3)
  })

  it('should decrease item counter by 3', () => {
    for (let i = 0; i < 3; i++) {
      cy.get(':nth-child(3) > .row > .col-md-4 > .btn-info').click()
    }
  })

  it('should be Zero', () => {
    cy.get(':nth-child(3) > .row > .col-md-1 > .badge').should('have.text', 'Zero')
  })

})


describe('Delete product from list', () => {
  before(() => {
    cy.visit('https://obscure-waters-60500.herokuapp.com/')
  })

  let remove_amount = 2;

  it(`should be ${TOTAL_ITEMS} items in list`, () => {
    cy.get('.row').should('have.length', TOTAL_ITEMS)
  })

  it(`should remove ${remove_amount} items`, () => {
    for (let i = 0; i < remove_amount; i++) {
      cy.get('.row > .col-md-4 > .btn-danger').last().click()
    }
  })

  it(`should be ${TOTAL_ITEMS - remove_amount} items`, () => {
    cy.get('.row').should('have.length', TOTAL_ITEMS - remove_amount)
  })

})


describe('Restart program button when empty list', () => {
  before(() => {
    cy.visit('https://obscure-waters-60500.herokuapp.com/')
  })

  it('restart button should be disabled', () => {
    cy.get('.btn-primary').should('be.disabled')
  })

  it('should remove all items', () => {
    cy.get('.row .col-md-4 > .btn-danger').click({ multiple: true })
  })

  it('restart button should be disabled', () => {
    cy.get('.btn-primary').should('not.be.disabled')
  })

  it('should click restart button', () => {
    cy.get('.btn-primary').click()
  })

  it('should be full list', () => {
    cy.get('.row').should('have.length', TOTAL_ITEMS)
  })
})