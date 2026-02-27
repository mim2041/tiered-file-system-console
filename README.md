# SaaS File Management System — Admin Console (Frontend)

Frontend boilerplate for the **Tiered Subscription File & Folder Management** assessment.

## Scope Covered in This Boilerplate

- Admin console shell (auth + protected dashboard routes)
- Subscription package management UI scaffolding
- File/folder domain menu and routes
- API endpoint constants aligned with assessment requirements
- Swagger UI entry page (`/dashboard/api-docs`)

## Tech

- React + TypeScript + Vite
- Ant Design
- Redux Toolkit
- React Router
- Axios

## Run

```bash
npm install
npm run dev
```

## Key Admin Pages

- `/dashboard/admin/packages` — package CRUD UI scaffolding
- `/dashboard/admin/users` — placeholder for quota summary
- `/dashboard/admin/audits` — placeholder for audit logs
- `/dashboard/api-docs` — opens backend Swagger docs

## Required Backend APIs (for this frontend)

- `GET /packages`
- `POST /admin/packages`
- `PUT /admin/packages/:id`
- `DELETE /admin/packages/:id`
- `GET /admin/packages/:id/history`
- `POST /subscriptions/activate`
- `GET /users/me/subscriptions/current`
- `GET /users/me/subscriptions/history`
- `GET/POST/PUT/DELETE /folders...`
- `GET/POST/PUT/DELETE /files...`
- `GET /users/me/quota`

## Swagger Recommendation

Expose backend docs at:

- `/docs` (Swagger UI)
- `/docs-json` (OpenAPI spec JSON)

Local starter OpenAPI file in this repo:

- `docs/openapi.yaml`

## Suggested Commit Strategy (Chunk by Chunk)

1. `feat(console): replace ecommerce navigation with file-management domain`
2. `feat(subscriptions): add admin package CRUD screens and service contracts`
3. `feat(api): align endpoint constants with SaaS file management requirements`
4. `docs(readme): add assessment roadmap and swagger integration notes`

## Next Planned Chunks

- User subscription selection + history timeline pages
- Folder tree explorer + file list UI
- Upload form with client-side validation (type/size)
- Quota/limit indicator widgets
- Integration tests for package form and endpoint calls
