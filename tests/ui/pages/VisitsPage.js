const { expect } = require("@playwright/test");
class VisitsPage {
  constructor(page) {
    this.page = page;
    this.descriptionInput = page.locator('textarea[ng-model="$ctrl.desc"]');
    this.dateInput = page.locator('input[type="date"]');
    this.addNewVisitButton = page.getByRole("button").filter({ hasText: "Add New Visit" });
    this.visitDescriptionText = page.locator(".table tr:nth-child(1) td:nth-child(2)");
    this.visitDateText = page
      .getByRole("table")
      .getByRole("row")
      .first()
      .getByRole("cell")
      .first();
  }

  async addNewVisitDetails(description, date) {
    await this.descriptionInput.fill(description);
    await this.dateInput.clear();
    await this.dateInput.pressSequentially(date);
    await this.addNewVisitButton.click();
  }

  async validateVisitDetailsRow(visitDescripton) {
    await this.addNewVisitButton.waitFor();
    await expect(this.visitDescriptionText).toContainText(visitDescripton);
  }
}
export default VisitsPage;
