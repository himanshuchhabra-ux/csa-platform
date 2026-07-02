# CSA (Control Self-Assessment) Platform

This document outlines the structure, architecture, and user workflows for the CSA Platform.

## 1. Project Structure

The project is built as a front-end web application utilizing HTML, CSS, and vanilla JavaScript. It mocks role-based access and routing through `sessionStorage`.

### Core Files
- **`login.html`**: The entry point of the application. Handles authentication simulation and routes users to the appropriate dashboard based on their role (`ASSESSOR1` vs `CERTIFIER1`).
- **`dashboard.html`**: The main hub for the **Assessor** role. It includes views for managing controls and tracking assessment statuses.
- **`dashboard-certifier.html`**: The main hub for the **Certifier** role. It displays controls pending review and a master list of all assigned controls.
- **`view-control.html`**: A read-only page to view the details of a specific control.
- **`edit-control.html`**: The interface for an Assessor to modify the properties of an existing control.
- **`review-control.html`**: A specialized interface for Certifiers to review an "Effective" control. Allows for Approval or Rejection (with a mandatory rejection reason modal).
- **`script.js`**: Contains the global logic for page/view routing, modal toggling, and role-based simulation.
- **`styles.css`**: The global stylesheet defining the modern, Etihad-inspired design system (incorporating gold accents, clean layouts, and flexbox/grid structures).
- **`assets/images/logo.png`**: The primary branding logo used across the platform.

---

## 2. User Workflows & Flow

The platform relies on a split-role architecture to separate the creation/assessment of controls from their final certification.

### A. Authentication Flow
1. User arrives at `login.html`.
2. User enters an Employee ID (Mocked scenarios: `ASSESSOR1` triggers the Assessor role, `CERTIFIER1` triggers the Certifier role).
3. The system stores the active user details in `sessionStorage` and automatically routes the user to the correct dashboard (`dashboard.html` or `dashboard-certifier.html`).

### B. Assessor Workflow
1. **Dashboard**: The Assessor lands on `dashboard.html`. They can view their overall compliance metrics and assigned controls.
2. **Manage Controls**: Assessors can create new controls via the "Create Control" modal or edit existing ones (`edit-control.html`).
3. **Assessments**: Assessors evaluate controls and assign an Effectiveness Rating:
   - **Effective**: The control is submitted to the Certifier for final approval.
   - **Partially Effective / Not Effective**: The control is recorded in the system for auditing purposes but bypasses the Certifier approval queue, as certification is not mandatory for failing controls.

### C. Certifier Workflow
1. **Dashboard**: The Certifier lands on `dashboard-certifier.html`. Their view is restricted purely to reviewing controls, lacking the ability to directly edit them.
2. **Review Queue**: Controls marked as "Effective" by the Assessor appear in the "Controls Pending Review" queue.
3. **Review Action**: The Certifier clicks the "Review Control" action button, navigating to `review-control.html`.
4. **Decision**:
   - **Approve**: The control becomes Active. The Certifier is redirected back to their dashboard.
   - **Reject**: A modal prompts the Certifier for a mandatory "Reason for Rejection". Once submitted, the control is sent back to the Assessor.

---

## 3. Design System & Aesthetics
- **Color Palette**: Utilizes premium branding colors (`--etihad-dark`, `--etihad-brown`, `--etihad-gold`) to create a professional and clean interface.
- **Layouts**: Responsive CSS Grid and Flexbox are used heavily, keeping the interface contained within 100vh where applicable to prevent unnecessary scrolling.
- **Interactions**: Modals (`rejectModal`, `createControlModal`) and view-switching logic provide a dynamic, single-page application feel despite being multi-page HTML.
