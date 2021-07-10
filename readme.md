<h1 align="center">
  🎧 Jabber 🪗
</h1>

## ℹ️ General info

This is the repository responsible for Jabber's app.

### 🖍 Requirements:

- NodeJS (14.x.x);
- NPM (6.x.x);
- PostgreSQL (13.x);
- run **`npx simple-pre-commit`** at the root of the project, before the start (it will set the pre-commit hook for any commits).

## 🗂 Shared

This [folder](./shared) contains all common (helpers, enums and etc.) stuff for other applications (backend, frontend and etc.).

## ⚙️ BackEnd

For the [BackEnd](./backend) to work properly, you need to fill in the **`.env`** file. You can use the **`.env.example`** file as an example.

## 💡 FrontEnd

For the [FrontEnd](./frontend) to work properly, you need to fill in the **`.env`** file. You can use the **`.env.example`** file as an example.

## 🏃‍♂️ Simple start

1. **`npm run install:all`** at the root
2. Fill ENVs
3. **`npx simple-git-hooks`** at the root
4. **`npm run start:dev`** at the root
5. Enjoy <3
