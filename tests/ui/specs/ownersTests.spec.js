const { expect } = require("@playwright/test");
import POManager from "../pages/POManager";
import { OwnerTestData, NewOwnerTestData, EditOwnerTestData } from "../data/uiTestData.json";
import { ownersFixture, registerFixture } from "../fixtures/baseFixtures";

registerFixture("Add a new Owner with valid data @smoke", async ({ page, registerSetup }) => {
  const pm = new POManager(page);
  const ownerInfoPage = pm.getOwnerInfoPage();
  const ownerOverviewPage = pm.getOwnerOverviewPage();
  const ownersPage = pm.getOwnersPage();

  // Register a new owner using valid data from NewOwnerTestData
  await ownerInfoPage.registerNewOwner(
    NewOwnerTestData.firstName,
    NewOwnerTestData.lastName,
    NewOwnerTestData.address,
    NewOwnerTestData.city,
    NewOwnerTestData.telephone
  );

  // Select the newly created owner from the list based on first name
  await ownersPage.selectAnOwnerFromListWithCriteria(NewOwnerTestData.firstName);

  // Validate that the owner details match the data entered
  await ownerOverviewPage.validateOwnerDetails(
    NewOwnerTestData.firstName,
    NewOwnerTestData.lastName,
    NewOwnerTestData.address,
    NewOwnerTestData.city,
    NewOwnerTestData.telephone
  );
});

registerFixture("Add a new owner without First Name", async ({ page, registerSetup }) => {
  const pm = new POManager(page);
  const ownerInfoPage = pm.getOwnerInfoPage();

  // Attempt to register a new owner without the first name
  await ownerInfoPage.registerNewOwner(
    "", // Empty first name to test validation
    NewOwnerTestData.lastName,
    NewOwnerTestData.address,
    NewOwnerTestData.city,
    NewOwnerTestData.telephone
  );

  await expect(ownerInfoPage.firstNameInput).toHaveAttribute("required", "");
});

registerFixture("Add a new owner without Last Name", async ({ page, registerSetup }) => {
  const pm = new POManager(page);
  const ownerInfoPage = pm.getOwnerInfoPage();

  // Attempt to register a new owner without the last name
  await ownerInfoPage.registerNewOwner(
    NewOwnerTestData.firstName,
    "", // Empty last name to test validation
    NewOwnerTestData.address,
    NewOwnerTestData.city,
    NewOwnerTestData.telephone
  );

  await expect(ownerInfoPage.lastNameInput).toHaveAttribute("required", "");
});

ownersFixture("Edit Owner First Name @smoke", async ({ page, ownersSetup }) => {
  const pm = new POManager(page);
  const ownerInfoPage = pm.getOwnerInfoPage();
  const ownerOverviewPage = pm.getOwnerOverviewPage();
  const ownersPage = pm.getOwnersPage();

  // Select the owner based on the current first name from EditOwnerTestData
  await ownersPage.selectAnOwnerFromListWithCriteria(EditOwnerTestData.firstName);

  // Navigate to the Owner Info page to edit the owner's details
  await ownerOverviewPage.gotoOwnerInfoPage();

  // Update the first name field with the new name from EditOwnerTestData
  await ownerInfoPage.updateOwnerfield(
    "First Name",
    EditOwnerTestData.new_firstName,
    EditOwnerTestData.firstName
  );

  // Validate that the new first name is correctly displayed
  await expect(ownerOverviewPage.ownerNameText).toContainText(EditOwnerTestData.new_firstName);

  // Revert the first name to its original value to maintain data integrity
  await ownerOverviewPage.gotoOwnerInfoPage();
  await ownerInfoPage.updateOwnerfield(
    "First Name",
    EditOwnerTestData.firstName,
    EditOwnerTestData.new_firstName
  );
  await expect(ownerOverviewPage.ownerNameText).toContainText(EditOwnerTestData.firstName);
});

ownersFixture("Edit Owner Last Name @smoke", async ({ page, ownersSetup }) => {
  const pm = new POManager(page);
  const ownerInfoPage = pm.getOwnerInfoPage();
  const ownerOverviewPage = pm.getOwnerOverviewPage();
  const ownersPage = pm.getOwnersPage();

  // Select the owner based on the current last name from EditOwnerTestData
  await ownersPage.selectAnOwnerFromListWithCriteria(EditOwnerTestData.lastName);

  // Navigate to the Owner Info page to edit the owner's details
  await ownerOverviewPage.gotoOwnerInfoPage();

  // Update the last name field with the new name from EditOwnerTestData
  await ownerInfoPage.updateOwnerfield(
    "Last Name",
    EditOwnerTestData.new_lastName,
    EditOwnerTestData.lastName
  );

  // Validate that the new last name is correctly displayed
  await expect(ownerOverviewPage.ownerNameText).toContainText(EditOwnerTestData.new_lastName);

  // Revert the last name to its original value to maintain data integrity
  await ownerOverviewPage.gotoOwnerInfoPage();
  await ownerInfoPage.updateOwnerfield(
    "Last Name",
    EditOwnerTestData.lastName,
    EditOwnerTestData.new_lastName
  );
  await expect(ownerOverviewPage.ownerNameText).toContainText(EditOwnerTestData.lastName);
});

ownersFixture("View Owner details @smoke", async ({ page, ownersSetup }) => {
  const pm = new POManager(page);
  const ownerOverviewPage = pm.getOwnerOverviewPage();
  const ownersPage = pm.getOwnersPage();

  // Select the owner based on the current first name from OwnerTestData
  await ownersPage.selectAnOwnerFromListWithCriteria(OwnerTestData.firstName);

  // Validate that the owner details match the data entered
  await ownerOverviewPage.validateOwnerDetails(
    OwnerTestData.firstName,
    OwnerTestData.lastName,
    OwnerTestData.address,
    OwnerTestData.city,
    OwnerTestData.telephone
  );
});
