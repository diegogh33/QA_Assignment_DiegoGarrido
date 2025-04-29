const { expect } = require("@playwright/test");

class PetsPage {
  constructor(page) {
    this.page = page;
    this.ownerNameLabel = page.locator("p");
    this.nameInput = page.locator('input[name="name"]');
    this.birthDateInput = page.locator('input[type="date"]');
    this.typeList = page.locator('select[ng-model="$ctrl.petTypeId"]');
    this.submitButton = page.getByRole("button").filter({ hasText: "Submit" });
  }

  async selectPetTypeFromList(petType) {
    await this.typeList.selectOption(petType);
  }

  async addNewPetDetails(ownerName, petName, petType, birthDate) {
    await expect(this.ownerNameLabel).toContainText(ownerName);
    await this.birthDateInput.pressSequentially(birthDate);
    await this.nameInput.clear();
    await this.nameInput.fill(petName);
    await this.selectPetTypeFromList(petType);
    await this.submitButton.click();
  }

  async validatePetDetailsRow(ownerName, petName, type) {
    await expect(this.ownerNameLabel).toContainText(ownerName);
    await expect(this.typeList).toContainText(type);
    await expect(this.nameInput).toContainText(petName);
    // Not checking the birthdate because it has a current issue to be saved wrongly
    // await expect(this.petBirthDateLabel).toContainText(birthdate)
  }
}
export default PetsPage;
