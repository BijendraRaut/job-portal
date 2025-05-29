

# Job Board Application (Next.js 13+)

This is a simple Job Board web application built using **Next.js 13+ App Router**. It provides both an admin interface for managing job postings and a public interface for job seekers to browse and apply for jobs.

## Features

### Admin Interface (`/admin`)

* Simple login (no backend authentication — uses localStorage or in-memory state).
* Create new job posts with:

  * Title
  * Description
  * Location
  * Job Type (Full-time, Part-time, Contract)
  * Posted Date
* View, edit, and delete job listings.
* Client-side form validation.
* State management using localStorage or React state (no backend).

### Public Interface (`/jobs`)

* View all available job postings.
* Filter jobs by location and job type.
* Detailed job view at `/jobs/[id]`.
* "Apply Now" functionality with:

  * Application form (Name, Email, Resume URL)
  * Simulated submission (no backend)

## Tech Stack

* [Next.js 13+](https://nextjs.org/) with App Router
* React 18+
* Tailwind CSS (if used)
* LocalStorage and/or React state for data persistence
* Fully client-side rendered (no server-side storage or backend APIs)

##  Getting Started

1. **Clone the repository:**

   ```bash
   git clone https://github.com/BijendraRaut/job-portal
   cd job-board-app
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Run the development server:**

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the app in action.

## Testing

* No unit or integration tests included.
* Manual testing can be done via both `/admin` and `/jobs` routes.

## 📁 Project Structure (Optional Highlight)

```
/app
  /admin
  /jobs
  /components
  /utils
  layout.tsx
  page.tsx
```

## 📄 Notes

* No backend or database used — the app is suitable for demonstration or prototyping purposes.
* To reset localStorage data, use browser dev tools or add a clear function in admin.

## 🔒 Authentication

* Admin "login" is handled purely client-side; use localStorage for session simulation.

---

Let me know if you'd like to include screenshots, deployment instructions (e.g. Vercel), or advanced features like pagination or custom hooks documentation.
