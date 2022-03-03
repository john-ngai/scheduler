describe('Appointments', () => {
  beforeEach(() => {
    // Reset the server state before running the test.
    cy.request("GET", "/api/debug/reset");

    cy.visit("/");
    cy.contains("Monday");
  });

  it('should book an interview', () => {
    // Clicks the add button for the empty appointment.
    cy.get('[alt=Add]')
      .first() // first() is used because there are two Add buttons.
      .click();

    // Type the name "Lydia Miller-Jones" into the student input field.
    cy.get('[data-testid=student-name-input]').type('Lydia Miller-Jones');

    // Select the interviewer with the name 'Sylvia Palmer'.
    cy.get("[alt='Sylvia Palmer']").click();

    // Click the save button.
    cy.contains('Save').click();

    // Verify that the student's name & selected interviewer are showing.
    cy.contains('.appointment__card--show', 'Lydia Miller-Jones');
    cy.contains('.appointment__card--show', 'Sylvia Palmer');
  });

  it('should edit an interview', () => {
    cy.get("[alt=Edit]")
      .first()
      .click({ force: true });

    cy.get('[data-testid=student-name-input]').clear().type('Lydia Miller-Jones');
    cy.get("[alt='Tori Malcolm']").click();

    cy.contains('Save').click();

    cy.contains('.appointment__card--show', 'Lydia Miller-Jones');
    cy.contains('.appointment__card--show', 'Tori Malcolm');
  });

  it('should click the cancel button', () => {
    cy.get("[alt=Edit]")
      .first()
      .click({ force: true });

    cy.contains('Cancel').click();

    cy.contains('.appointment__card--show', 'Archie Cohen');
    cy.contains('.appointment__card--show', 'Sylvia Palmer');
  })

  it('should click the delete button', () => {
    cy.get("[alt=Delete]")
      .first()
      .click({ force: true });
  })

  it('should click the confirm button', () => {
    cy.get("[alt=Delete]")
      .first()
      .click({ force: true });

      cy.contains("Confirm").click();
  });

  it('should cancel an interview', () => {
    cy.get("[alt=Delete]")
      .click({ force: true });

    cy.contains("Confirm").click();

    cy.contains("Deleting").should("exist");
    cy.contains("Deleting").should("not.exist");

    cy.contains(".appointment__card--show", "Archie Cohen")
      .should("not.exist");
  });
});