const { expect } = require("@playwright/test");
import POManager from "../pages/POManager";
import { PetTestData } from "../data/uiTestData.json";
import { petFixture } from "../fixtures/baseFixtures"; // Imports petFixture

// Uses the petFixture in our test
petFixture("Add a new Pet @smoke", async ({ page, petSetup }) => {
  // const { pm } = petSetup; // Gets the POManager instance from the fixture
  const pm = new POManager(page);
  const ownerOverviewPage = pm.getOwnerOverviewPage();
  const ownersPage = pm.getOwnersPage();
  const petsPage = pm.getPetsPage();

  // Select the owner from the list using the owner name from PetTestData
  await ownersPage.selectAnOwnerFromListWithCriteria(PetTestData.ownerName);

  // Navigate to the Add New Pet page
  await ownerOverviewPage.gotoAddNewPetPage();

  // Add new pet details using PetTestData (name, type, birthdate)
  await petsPage.addNewPetDetails(
    PetTestData.ownerName,
    PetTestData.name,
    PetTestData.type,
    PetTestData.birthdate
  );

  // Validate the pet details on the Edit Pet page
  await ownerOverviewPage.validatePetDetails(
    PetTestData.ownerName,
    PetTestData.name,
    PetTestData.type
  );
});

petFixture("Edit a Pet @smoke", async ({ page, petSetup }) => {
  const pm = new POManager(page);
  const ownerOverviewPage = pm.getOwnerOverviewPage();
  const ownersPage = pm.getOwnersPage();
  const petsPage = pm.getPetsPage();

  // Select the owner from the list using the owner name from PetTestData
  await ownersPage.selectAnOwnerFromListWithCriteria(PetTestData.ownerName);

  // Navigate to the Add New Pet page
  await ownerOverviewPage.gotoEditPetPage();

  // Add new pet details using PetTestData (name, type, birthdate)
  await petsPage.addNewPetDetails(
    PetTestData.ownerName,
    PetTestData.name,
    PetTestData.type,
    PetTestData.birthdate
  );

  // Validate the pet details on the Edit Pet page
  await ownerOverviewPage.validatePetDetails(
    PetTestData.ownerName,
    PetTestData.name,
    PetTestData.type
  );
});
