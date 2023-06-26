// C1 Freedompay iframe issue

const card_num = "4012 0000 3333 0026";
const exp_date = "0330";
const cvv = "123";
const zip_code = "10003";

describe("Reservation widget - ", () => {
  beforeEach(() => {
    cy.intercept("GET", "**/api-yoa/availability/dates*").as("venue_dates");

    cy.visit(
      "https://payments-786-dot-sevenrooms-secure-qa.appspot.com/reservations/qa-automation-freedompay"
    );
  });

  it("C1 Freedompay iframe issue", function () {
    // cy.step("Enter search criteria and click search");
    cy.wait("@venue_dates");
    cy.get(
      '[data-test="sr-calendar-date"] [data-test="sr-increment-arrow"]'
    ).click();

    cy.get('[data-test="sr-guest-count"] div>span')
      .last()
      .click()
      .get("#sr-" + 5 + " > button")
      .scrollIntoView()
      .click({ force: true });
    cy.contains("Search").click();
    cy.contains("Save card").click();
    cy.get('[data-test="sr-time-slot-popup-modal-select-button"]').click();

    // cy.step("Continue as guest");
    cy.get('[data-test="sr-login-button-guest"]').click();

    // cy.step("Fill in guest info and click sumbit");
    cy.get('[aria-label="First Name"]').type("Auto");
    cy.get('[aria-label="Last Name"]').type("Tester");
    cy.get('[aria-label="Email"]').type("tester@gmail.com");
    cy.get('[aria-label="Phone Number"]').type("9296325555");
    cy.contains("Cancellation Policy *").click();
    cy.get('[data-test="sr-submit-button"]').click();

    // At this point when the modal is displayed we should observe two endpoint being triggered as within manual flow begin_payment and init to cardinal
    // No init endpoint is triggered
    // At this point you can enter payment info manually, but no request will ever be made
    cy.wait(15000);
    cy.pause();
  });
});
