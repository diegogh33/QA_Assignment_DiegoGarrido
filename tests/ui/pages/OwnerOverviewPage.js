const { expect } = require("@playwright/test");

class OwnerOverviewPage {
  constructor(page) {
    this.page = page;
    this.ownerNameText = page.getByRole("row").filter({ hasText: "Name" }).locator("b");
    this.ownerAddressText = page.getByRole("row").filter({ hasText: "Address" }).locator("td");
    this.ownerCityText = page.getByRole("row").filter({ hasText: "City" }).locator("td");
    this.ownerTelephoneText = page
      .getByRole("row")
      .filter({ hasText: "Telephone" })
      .locator("td");
    this.editOwnerButton = page.getByRole("link").filter({ hasText: "Edit Owner" });
    this.addNewPetButton = page.getByRole("link").filter({ hasText: "Add New Pet" });
    this.petdetailsRow = page
      .locator("table.table.table-striped")
      .nth(1)
      .locator("tr")
      .first();
    this.editPetLink = this.petdetailsRow.locator("a").filter({ hasText: "Edit Pet" });
    this.addVisitLink = this.petdetailsRow.locator("a").filter({ hasText: "Add Visit" });
  }

  async gotoOwnerInfoPage() {
    await this.editOwnerButton.click();
  }

  async gotoAddNewPetPage() {
    await this.addNewPetButton.click();
  }

  async gotoEditPetPage() {
    await this.editPetLink.click();
  }
  async gotoEditPetPageWithPetName(petName) {
    const petDetailsRow = this.page
      .locator("table.table.table-striped")
      .nth(1)
      .locator("tr")
      .filter({ hasText: petName })
      .first();
    await petDetailsRow.locator("a").filter({ hasText: "Edit Pet" }).click();
  }

  async gotoVisitsPage() {
    await this.addVisitLink.click();
  }

  async gotoVisitsPageWithPetName(petName) {
    const petDetailsRow = this.page
      .locator("table.table.table-striped")
      .nth(1)
      .locator("tr")
      .filter({ hasText: petName })
      .first();
    await petDetailsRow.locator("a").filter({ hasText: "Add Visit" }).click();
  }

  async validateOwnerDetails(firstName, lastName, address, city, telephone) {
    await expect(this.ownerNameText).toContainText(firstName);
    await expect(this.ownerNameText).toContainText(lastName);
    await expect(this.ownerAddressText).toContainText(address);
    await expect(this.ownerCityText).toContainText(city);
    await expect(this.ownerTelephoneText).toContainText(telephone);
  }

  async validatePetDetails(ownerName, petName, type) {
    await expect(this.ownerNameText).toContainText(ownerName);
    const petDetailsRow = this.page
      .locator("table.table.table-striped")
      .nth(1)
      .locator("tr")
      .filter({ hasText: petName })
      .first();
    const petNameLabel = petDetailsRow.getByRole("link").first();
    await expect(petNameLabel).toContainText(petName);
    const petTypeLabel = petDetailsRow.locator("dd").nth(2);
    await expect(petTypeLabel).toContainText(type);
    const petBirthDateLabel = petDetailsRow.locator("dd").nth(1);
    // await expect(petBirthDateLabel).toContainText(birthDate)
  }
}

export default OwnerOverviewPage;
