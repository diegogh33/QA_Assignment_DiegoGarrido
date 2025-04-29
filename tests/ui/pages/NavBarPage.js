class NavBarPage {
  constructor(page) {
    this.page = page;
  }

  async goToHomePage() {
    await this.page.getByText("Home").click();
  }

  async goToAllOwnersPage() {
    await this.page.getByText("Owners").click();
    await this.page.getByText(" All").click();
  }

  async goToRegisterOwnersPage() {
    await this.page.getByText("Owners").click();
    await this.page.getByText(" Register").click();
  }

  async goToVetsPage() {
    await this.page.getByText("Veterinarians").click();
  }
}

export default NavBarPage;
