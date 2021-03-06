<h1 align="center">
  đ§ Jabber đĒ
</h1>

*[Mobile app repository](https://github.com/eugeneprib/JabbReactNative)*

## âšī¸ General info

This is the repository responsible for Jabber's app.

### đ Requirements:

- NodeJS (14.x.x);
- NPM (6.x.x);
- PostgreSQL (13.x);
- run **`npx simple-git-hooks`** at the root of the project, before the start (it will set the pre-commit hook for any commits).

## Code quality

Static analyzers are used for all projects to ensure basic code quality. Additionally, [quality criteria](https://github.com/BinaryStudioAcademy/quality-criteria) rules are enforced during code review and audit.

## đ Shared

This [folder](./shared) contains all common (helpers, enums and etc.) stuff for other applications (backend, frontend and etc.).

## âī¸ BackEnd

For the [BackEnd](./backend) to work properly, you need to fill in the **`.env`** file. You can use the **`.env.example`** file as an example.

## đĄ FrontEnd

For the [FrontEnd](./frontend) to work properly, you need to fill in the **`.env`** file. You can use the **`.env.example`** file as an example.

## đââī¸ Simple start

1. **`npm run install:all`** at the root
2. Fill ENVs
3. **`npx simple-git-hooks`** at the root
4. **`npm run start:dev`** at the root
5. Enjoy <3
