class OwnersPage {
  constructor(page) {
    this.page = page;
    this.searchTextBox = page.getByPlaceholder("Search Filter");
  }

  async searchForAnOwner(searchWord) {
    await this.searchTextBox.fill(searchWord);
  }

  async selectAnOwnerFromListWithCriteria(searchWord) {
    await this.searchForAnOwner(searchWord);
    await this.page
      .locator('a:has-text("' + searchWord + '")')
      .first()
      .click();
  }
}

export default OwnersPage;
