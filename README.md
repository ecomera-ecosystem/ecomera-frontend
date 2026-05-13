# Ecomera Frontend

![Angular](https://img.shields.io/badge/Angular-19-DD0031?logo=angular)
![Angular Material](https://img.shields.io/badge/Material-19-757575?logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript)

E-commerce frontend built with Angular 19 - modular architecture, Angular Material UI, microservice-ready.

## Architecture

```
src/app/
├── app.module.ts              # Root module
├── app-routing.module.ts      # App-wide routes
├── app.component.*
├── core/                      # Singleton services, interceptors, models
│   ├── core.module.ts
│   ├── interceptor/
│   │   └── auth.interceptor.ts
│   ├── models/
│   │   └── auth.model.ts
│   └── services/
│       └── auth.service.ts
├── shared/                    # Reusable components, enums
│   ├── shared.module.ts
│   └── components/
│       ├── navbar/
│       ├── footer/
│       └── hero-carousel/
└── pages/                     # Feature modules
    ├── auth/                  # Login + Register
    │   ├── auth.module.ts
    │   ├── login/
    │   └── register/
    ├── homepage/
    │   ├── homepage.module.ts
    │   └── homepage.component.*
    └── not-found/
        └── not-found.component.*
```

- **CoreModule** — singleton services and interceptors (import once in AppModule)
- **SharedModule** — declares and exports shared components (imported by feature modules)
- **AuthModule / HomepageModule** — feature modules, each declares its own components and imports its dependencies

## Setup

```bash
npm install
ng serve
```

Navigate to `http://localhost:4200`

## API

The auth service points to `http://localhost:8080/api/v1/auth`. Update `AuthService` to match your gateway URL.

## Build

```bash
ng build --configuration production
```

Output goes to `dist/ecomera/`.

## Adding New Features

1. Generate a feature module: `ng generate module pages/your-feature`
2. Generate components: `ng generate component pages/your-feature/your-component`
3. Add routes in `app-routing.module.ts`
4. Import your feature module in `app.module.ts`

For lazy-loading, add a route with `loadChildren` instead of eager `component`.
