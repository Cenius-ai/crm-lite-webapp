# Usage Guide

Once the development server is running (see [INSTALL.md](INSTALL.md)), open your browser and go to `http://localhost:4200`.

The application provides the following views, accessible through the navigation:

- **Dashboard** – overview of key metrics (if configured).
- **Companies** – list of all companies with ability to add and edit entries.
- **Contacts** – searchable list of contacts; add and edit contact details.
- **Deals** – manage deals, each associated with a company and contact.
- **Pipeline Board** – visual Kanban-style board showing deals grouped by stage: *lead*, *qualified*, *won*, *lost*. Drag-and-drop (if implemented) to move deals between stages.

Use the links and buttons in the interface to navigate, create new items, edit existing ones, and manage your CRM data. The application stores data locally in the browser (IndexedDB or localStorage via the `StorageService`).