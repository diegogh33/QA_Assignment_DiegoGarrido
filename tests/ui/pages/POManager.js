import NavBarPage from "../pages/NavBarPage";
import OwnersPage from "../pages/OwnersPage";
import OwnerInfoPage from "../pages/OwnerInfoPage";
import OwnerOverviewPage from "../pages/OwnerOverviewPage";
import PetsPage from "../pages/PetsPage";
import VisitsPage from "../pages/VisitsPage";

class POManager {
  constructor(page) {
    this.page = page;
    this.navBarPage = new NavBarPage(this.page);
    this.ownersPage = new OwnersPage(this.page);
    this.ownerInfoPage = new OwnerInfoPage(this.page);
    this.ownerOverviewPage = new OwnerOverviewPage(this.page);
    this.petsPage = new PetsPage(this.page);
    this.visitsPage = new VisitsPage(this.page);
  }

  getNavBarPage() {
    return this.navBarPage;
  }

  getOwnersPage() {
    return this.ownersPage;
  }

  getOwnerInfoPage() {
    return this.ownerInfoPage;
  }

  getOwnerOverviewPage() {
    return this.ownerOverviewPage;
  }

  getPetsPage() {
    return this.petsPage;
  }

  getVisitsPage() {
    return this.visitsPage;
  }
}

export default POManager;
