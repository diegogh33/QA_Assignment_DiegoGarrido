# 🧪 QA Automation Assignment – PetClinic

## 📖 Overview

This project is an automated test framework developed for the [Spring PetClinic](https://github.com/spring-projects/spring-petclinic) web application. It combines modern testing technologies and best practices to validate UI and API functionalities.

**Tech Stack:**

- [Playwright](https://playwright.dev/) for UI and API automation
- [Docker](https://www.docker.com/) for local environment provisioning
- [Node.js](https://nodejs.org/)
- [GitHub Actions](https://docs.github.com/en/actions) for CI pipelines

The test framework uses a Behavior-Driven Development (BDD) approach to ensure clear communication of test scenarios and expected behaviors.

---

## 📂 Project Structure

```bash
QA_ASSIGMENT_DIEGOGARRIDO/
├── .github/                              # GitHub Actions workflows
│   └── workflows/                        # CI/CD pipelines
│       ├── API_SmokeTests.yml            # Workflow for API smoke tests
│       ├── UI_SmokeTests_Chromium.yml    # Workflow for UI smoke tests using Chromium
│       └── UI_SmokeTests_Firefox.yml     # Workflow for UI smoke tests using Firefox
├── tests/
│   ├── ui/                               # UI tests
│   │   ├── data/
│   │   │   └── uiTestData.json           # UI test data
│   │   ├── fixtures/
│   │   │   └── baseFixtures.js           # Base fixture with common initialization
│   │   ├── pages/
│   │   │   ├── NavBarPage.js             # NavBar Page Object
│   │   │   ├── OwnerInfoPage.js          # Owner Info Page Object
│   │   │   ├── OwnerOverviewPage.js      # Owner Overview Page Object
│   │   │   ├── OwnersPage.js             # Owners Page Object
│   │   │   ├── PetsPage.js               # Pets Page Object
│   │   │   ├── POManager.js              # Page Manager for handling all Page Objects
│   │   │   └── VisitsPage.js             # Visits Page Object
│   │   ├── specs/
│   │   │   ├── ownersTests.spec.js       # UI test cases
│   │   │   ├── petsTests.spec.js
│   │   │   └── visitsTests.spec.js
│
│   ├── api/                              # API tests
│   │   ├── data/
│   │   │   ├── ownerData.json            # Owner API test data
│   │   │   └── petData.json              # Pet API test data
│   │   ├── fixtures/
│   │   │   ├── schemaSetup.js            # JSON Schema setup for API tests
│   │   │   └── testSetup.js              # API test setup
│   │   ├── schemas/
│   │   │   ├── ownerSchema.json          # Owner API response schema
│   │   │   ├── petSchema.json            # Pet API response schema
│   │   │   └── restErrorSchema.json      # Error response schema
│   │   ├── tests/
│   │   │   ├── owners/
│   │   │   │   ├── GET_owners.test.js    # Get Owner API test cases
│   │   │   │   ├── POST_owners.test.js   # Create Owner API test cases
│   │   │   │   └── PUT_owners.test.js    # Edit Owner API test cases
│   │   │   ├── pets/
│   │   │   │   ├── GET_pets.test.js      # Get Pet API test cases
│   │   │   │   ├── POST_pets.test.js     # Create Pet API test cases
│   │   │   │   └── PUT_pets.test.js      # Edit Pet API test cases
│   │   ├── utils/
│   │   │       ├── endpoints.js          # API Endpoints definitions
│   │   │       ├── requestUtils.js       # Utility functions for API requests
│   │   │       ├── responseUtils.js      # Utility functions for API responses
│   │   │       └── schemaValidator.js    # JSON Schema validator utility
├── .gitignore
├── docker-compose.yml                    # Docker configuration
├── openapi.yml                           # OpenAPI specification for the tested API
├── package-lock.json                     # Automatically generated dependency tree (NPM)
├── package.json                          # Project metadata and scripts
├── playwright.config.js                  # Playwright config file
└── README.md                             # Project documentation
```

---

## ✅ Prerequisites

Ensure the following tools are installed on your system:

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [Docker](https://www.docker.com/get-started)
- [npm](https://www.npmjs.com/)

Then, install project dependencies:

```bash
npm install
```

- **Install Playwright**

```bash
npm init playwright@latest
```

---

## 🐳 Running with Docker

To launch the PetClinic application locally:

```bash
docker-compose up -d
```

This runs the application at: `http://localhost:8080`

---

## 🚀 How to Run Tests

You don't need to know TypeScript or Playwright to run the tests.

### Run All Tests (UI + API)

```bash
npm run tests
```

### Run Only UI Tests

```bash
npm run ui_tests
```

### Run Only API Tests

```bash
npm run api_tests
```

---

## 📊 Accessing Test Reports

After executing any test suite, a report will be generated in:

```
playwright-report/index.html
```

Open this file in your browser to view the full test execution report.

---

## 👀 Headless Mode (UI Tests)

By default, Playwright runs in **headless mode**.

To run tests with the browser UI visible (headed mode), modify the `playwright.config.js`:

```ts
use: {
  headless: false,
  ...
}
```

You can also set it dynamically using an environment variable in the config file.

---

## 🔁 Continuous Integration with GitHub Actions

The project includes a GitHub Actions workflow at:

```
.github/workflows/API_SmokeTests.yml
.github/workflows/UI_SmokeTests_Chromium.yml
.github/workflows/UI_SmokeTests_Firefox.yml
```

It will:

- Install dependencies
- Launch Playwright and install browsers
- Run UI and API tests
- Generate the HTML report
- Upload the report and screenshots (if failures) as artifacts

To test CI in your branch, push to a branch that matches:

```yaml
on:
  push:
    branches: [main]
```

---

## 🐞 Known Bugs (Expected Failures)

Some scenarios are marked with the `@BUG` tag and are **expected to fail**, representing known issues.

### 🧪 API Test Bugs

| Scenario                            | Reason                                    |
| ----------------------------------- | ----------------------------------------- |
| Listing all pet owners              | Looks the service is not found            |
| Looking up a non-existent pet owner | API does not return proper response       |
| Creating a new pet for an owner     | Internal server error                     |
| Updating an existing pet’s details  | API does not return proper response       |
| Updating a pet owner without ID     | API does not return proper response       |

### 🧪 UI Test Bugs

| Scenario                                          | Reason                                                                |
| ------------------------------------------------- | --------------------------------------------------------------------- |
| Searching for an existing owner                   | Owners are not showed when entering name + surname in the search form |
| Attempting to add a pet with a future birth date  | It is possible to create a pet with future date of birth              |

---

## 📝 Manual Test Cases

Manual test cases are documented in:

```
/manual-tests-cases/
```

You’ll find `.xlsx` files describing tests not yet automated, edge cases, or exploratory test ideas.

---

## 👤 Author

This project was developed by **@diegogh33** as part of a QA assignment.

---

Feel free to fork, clone, and improve this project!


