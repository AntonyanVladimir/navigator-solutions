# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/8d3a1126-bbd2-47af-80c3-c97c4ab36168

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/8d3a1126-bbd2-47af-80c3-c97c4ab36168) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

## Run with Docker

This project ships with Docker Compose recipes that provision the React app together with a MySQL database. The development stack mounts your working tree so edits are reflected instantly in the browser without restarting the containers.

### Development (hot reload)

```sh
# Rebuild images and boot the dev stack (Vite + MySQL)
docker compose -f compose.debug.yaml up --build
```

- App available at http://localhost:5173
- Backend API available at http://localhost:8080 (Swagger UI when running in development)
- MySQL available at localhost:3306 (db/user/password: `techconsult`)
- The `app` service runs `npm run dev -- --host 0.0.0.0`, so file changes on the host trigger hot reloads automatically.

### Production-style preview

```sh
# Build the production bundle and serve it with MySQL
docker compose up --build
```

- App available at http://localhost:3000
- Backend API available at http://localhost:8080
- MySQL reuses the same credentials as the dev stack.

Both Compose files expose the same `DATABASE_URL` / `VITE_DATABASE_URL` connection string (`mysql://techconsult:techconsult@db:3306/techconsult`) so the frontend and any future backend code can address the database via the internal service hostname `db`.

## Generate API client

- Make sure the backend is running and exposing Swagger at `http://localhost:8080/swagger/v1/swagger.json` (the default when using Docker Compose above).
- Run `npm run orval` to regenerate typed DTOs and service functions into `src/lib/api`.
- Use `npm run orval:watch` during backend development to automatically refresh the generated files whenever the OpenAPI spec changes.
- You can override the source spec by setting `ORVAL_OPENAPI_URL` before running the script if the API is available on a different host/port.

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/8d3a1126-bbd2-47af-80c3-c97c4ab36168) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
