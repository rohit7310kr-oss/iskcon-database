# iskcon-database

## Repository Structure

```
iskcon-database/
├── backend/
│   ├── config/
│   │   ├── db.js
│   │   └── redis.js
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   └── devotees.controller.js
│   ├── middleware/
│   │   ├── allowRoles.js
n│   │   ├── authMiddleware.js
│   │   ├── catchAsyncHandler.js
│   │   └── errorHandler.js
│   ├── models/
│   │   ├── Devotee.model.js
│   │   └── User.model.js
│   ├── routes/
│   │   ├── devotee.routes.js
│   │   └── user.routes.js
│   ├── index.js
│   ├── package.json
│   └── package-lock.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── appRoutes/
│   │   │   └── AppRoutes.jsx
│   │   ├── assets/
│   │   ├── config/
│   │   │   └── config.js
│   │   ├── constants/
│   │   │   └── formConfig.js
│   │   ├── features/
│   │   │   ├── app/
│   │   │   │   ├── addNewDevotee/AddNewDevotee.jsx
│   │   │   │   ├── dashboard/Dashboard.jsx
│   │   │   │   ├── editDevotee/EditDevotee.jsx
│   │   │   │   ├── hooks/
│   │   │   │   │   ├── useAddFormHandler.js
│   │   │   │   │   ├── useEditFormHandler.js
│   │   │   │   │   ├── useFilterHandler.js
│   │   │   │   │   └── useGetAllDevoteeHandler.js
│   │   │   │   ├── layout/
│   │   │   │   ├── newDevotee/NewDevotee.jsx
│   │   │   │   ├── service/
│   │   │   │   ├── shared/
│   │   │   │   │   ├── DatePicker.jsx
│   │   │   │   │   ├── InputGroup.jsx
│   │   │   │   │   ├── ModalLayout.jsx
│   │   │   │   │   └── Toast.jsx
│   │   │   │   └── viewDevotee/
│   │   │   │       ├── ExpandedTable.jsx
│   │   │   │       ├── TableRow.jsx
│   │   │   │       └── ViewDevotee.jsx
│   │   │   ├── auth/
│   │   │   │   ├── Form/Form.jsx
│   │   │   │   ├── login/Login.jsx
│   │   │   │   ├── register/Register.jsx
│   │   │   │   └── services/userApi.js
│   │   │   ├── context/userContext.jsx
│   │   │   └── shared/
│   │   │       ├── Loader.jsx
│   │   │       └── MyTagInput.jsx
│   │   ├── lib/utils.js
│   │   ├── services/axios.js
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .env.development
│   ├── .env.production
│   ├── .gitignore
│   ├── components.json
│   ├── eslint.config.js
│   ├── index.html
│   ├── jsconfig.json
│   ├── package.json
│   ├── package-lock.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   ├── vercel.json
│   ├── vite.config.js
│   └── README.md
└── README.md
```

## Notes and Suggested Improvements

- Add a top-level project README with:
  - setup steps for backend and frontend
  - required environment variables
  - install and run commands
  - any shared ports or API base URL details
- Add `.env.example` files for both backend and frontend to document required secrets while keeping real env values out of source control.
- Consider moving or excluding `frontend/uploads/` from Git tracking if it contains generated or user-uploaded files; large upload directories are usually better stored outside the repository or in dedicated object storage.
- Verify the `frontend/svg]:rotate-180` entry; it looks like an accidental file artifact and may not belong in the repository.
- Add lint/test scripts and documentation for easier onboarding and quality checks.
- If the backend is meant to be a monorepo, consider adding root-level package scripts to run both services from one place.
- Ensure `node_modules/` and environment files are ignored in `.gitignore` for both packages.

## Quick Judgment

The repository is organized into a clear backend/frontend split with a sensible feature-based frontend structure. The main improvement opportunity is documentation: the current README is minimal, and adding setup instructions plus env examples would make the project much easier to use and maintain.
