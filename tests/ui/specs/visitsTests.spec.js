import POManager from "../pages/POManager";
import { VisitsTestData } from "../data/uiTestData.json";
import { ownersFixture } from "../fixtures/baseFixtures";

// Test to add a new visit for a pet with valid data
ownersFixture.only("Add Pet Visit with valid data @Smoke", async ({ page, ownersSetup }) => {
  const pm = new POManager(page);
  const ownerOverviewPage = pm.getOwnerOverviewPage();
  const ownersPage = pm.getOwnersPage();
  const visitsPage = pm.getVisitsPage();

  // Select the owner from the list using a hardcoded name ('George' in this case)
  await ownersPage.selectAnOwnerFromListWithCriteria(VisitsTestData.ownerName);

  // Navigate to the Visits page
  await ownerOverviewPage.gotoVisitsPageWithPetName(VisitsTestData.petName);

  // Add new visit details using a description from VisitsTestData
  await visitsPage.addNewVisitDetails(VisitsTestData.description, VisitsTestData.date);

  // Navigate back to the Visits page to verify the new visit was added correctly
  await ownerOverviewPage.gotoVisitsPageWithPetName(VisitsTestData.petName);

  // Add the appropriate expectation here to validate the visit details
  await visitsPage.validateVisitDetailsRow(VisitsTestData.description);
});
