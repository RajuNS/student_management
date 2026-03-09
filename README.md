# 🎓 Student Management System

A **production-quality** React.js application for managing student records — featuring full CRUD operations, real-time search & filter, Excel export, and a stunning modern dark-mode UI.

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green)

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| **Add Student** | Create new student records with validated form |
| **Edit Student** | Pre-filled form for seamless editing |
| **Delete Student** | Confirmation dialog before removal |
| **Search & Filter** | Real-time search by name or email |
| **Excel Export** | Download filtered rows or full dataset as `.xlsx` |
| **Persistent Data** | Records saved to `localStorage` |
| **Loading State** | Simulated loading spinner on app mount |
| **Responsive** | Fully responsive design for all devices |

---

## 🛠️ Tech Stack

- **React 18** — Functional components with Hooks
- **Vite 7** — Lightning-fast dev server & build
- **Lucide React** — Beautiful, consistent icons
- **SheetJS (xlsx)** — Excel file generation
- **Vanilla CSS** — Custom dark-mode design system

---

## 📂 Project Structure

```
src/
├── components/
│   ├── StudentTable.jsx      # Data table with row actions
│   ├── StudentForm.jsx       # Add / Edit form with validations
│   ├── ConfirmDialog.jsx     # Reusable delete confirmation modal
│   ├── SearchBar.jsx         # Search input with icon
│   └── Loader.jsx            # Animated loading overlay
├── utils/
│   └── excelExport.js        # xlsx export utility
├── data/
│   └── studentsData.js       # Seed / sample data
├── App.jsx                   # Root component (CRUD + state logic)
├── index.css                 # Global styles & design system
└── main.jsx                  # Entry point
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/student-management-system.git
cd student-management-system

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
npm run preview   # Preview the production build locally
```

---

## 📦 Required Packages

| Package | Purpose |
|---------|---------|
| `react` | UI library |
| `react-dom` | DOM rendering |
| `xlsx` | Excel file export |
| `lucide-react` | Icon library |
| `vite` | Build tool (dev dependency) |

All dependencies are listed in `package.json` and installed via `npm install`.

---

## 🌐 Deployment

### Deploy to Vercel

1. **Push** your project to a GitHub / GitLab / Bitbucket repository.
2. Go to [vercel.com](https://vercel.com) and click **"New Project"**.
3. **Import** your repository.
4. Vercel auto-detects the Vite framework. Verify:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Click **"Deploy"** — your app will be live in ~30 seconds.

> **Tip:** Every push to `main` triggers an automatic re-deploy.

### Deploy to Netlify

1. **Push** your project to a Git repository.
2. Go to [netlify.com](https://app.netlify.com) and click **"Add new site"** → **"Import an existing project"**.
3. Connect your Git provider and select the repository.
4. Configure build settings:
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`
5. Click **"Deploy site"**.

> **Tip:** Create a `netlify.toml` in the project root for persistent config:
> ```toml
> [build]
>   command = "npm run build"
>   publish = "dist"
> ```

---

## 🏗️ Backend Extension (Optional Architecture)

This frontend can be extended into a full-stack application:

### Recommended Stack

| Layer | Technology |
|-------|-----------|
| **Backend** | NestJS (Node.js framework) |
| **Database** | PostgreSQL |
| **ORM** | TypeORM or Prisma |
| **API** | RESTful endpoints |

### Proposed REST API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/students` | Fetch all students (with query params for search & pagination) |
| `GET` | `/api/students/:id` | Fetch a single student |
| `POST` | `/api/students` | Create a new student |
| `PUT` | `/api/students/:id` | Update an existing student |
| `DELETE` | `/api/students/:id` | Delete a student |

### How to Extend

1. **Create a NestJS project**: `npx @nestjs/cli new backend`
2. **Define the Student entity** with TypeORM decorators: `id`, `name`, `email`, `age`, `createdAt`, `updatedAt`.
3. **Generate the students module**: `nest g resource students` — this scaffolds controller, service, DTOs, and module.
4. **Add validation**: Use `class-validator` and `class-transformer` in DTOs.
5. **Connect PostgreSQL**: Configure TypeORM in `app.module.ts` with your database credentials.
6. **Update the React frontend**: Replace `localStorage` calls with `fetch` / `axios` calls to your NestJS API.

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
