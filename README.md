# Kaltech POS Manager

## System Overview

Kaltech POS Manager is a comprehensive web application built with Next.js for managing Point of Sale (POS) systems. It provides a centralized platform for administrators to oversee multiple POS accounts, handle data synchronization across devices, manage subscriptions, and monitor system usage.

### Architecture

The application follows a modern full-stack architecture:

- **Frontend**: Next.js 15 with React 19, TypeScript, and Tailwind CSS
- **Backend**: Next.js API routes with server-side rendering
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT-based authentication with bcrypt password hashing
- **Styling**: Tailwind CSS with Radix UI components
- **Internationalization**: next-intl for multi-language support
- **State Management**: SWR for data fetching and caching

### Core Features

1. **Account Management**
   - Create and manage POS application accounts
   - Handle trial and paid subscriptions
   - Track account expiration and verification status
   - Enable/disable specific modules per account

2. **Device Synchronization**
   - Register and manage sync devices for each account
   - Upload local POS data from devices
   - Prevent duplicate data uploads through device tracking
   - Monitor last sync dates and device activity

3. **Data Upload System**
   - Secure JSON data uploads from POS devices
   - Associate uploads with specific accounts and devices
   - Track upload history and metadata

4. **Subscription Management**
   - Multiple subscription plans (Trial, Pro, Enterprise, White Label)
   - License key generation and validation
   - Feature-based module enabling
   - Pricing management with monthly/yearly options

5. **User Administration**
   - Company and admin user management
   - Role-based access control
   - User authentication and session management

6. **Dashboard & Analytics**
   - Comprehensive admin dashboard
   - Real-time monitoring of accounts and devices
   - Data visualization with Recharts

### Database Schema

The system uses PostgreSQL with the following main entities:

- **Account**: Core POS account with subscription details
- **Company**: Business entity associated with accounts
- **SyncDevice**: Registered devices for data synchronization
- **DataUpload**: Uploaded data from POS devices
- **User/CompanyAdmin**: Administrative users
- **Subscription**: Available subscription plans
- **Licence**: Generated license keys for accounts

### API Structure

RESTful API endpoints organized by feature:

- `/api/accounts` - Account management
- `/api/companies` - Company operations
- `/api/sync-devices` - Device synchronization
- `/api/data-uploads` - Data upload handling
- `/api/users` - User management
- `/api/subscriptions` - Subscription management
- `/api/backup` - System backup operations
- `/api/seed` - Database seeding

### Security Features

- JWT token-based authentication
- Password hashing with bcrypt
- Server-side validation with Zod
- Protected API routes
- Session management

### Development Features

- **Hot Reload**: Turbopack for fast development
- **Type Safety**: Full TypeScript coverage
- **Code Quality**: ESLint and Prettier configuration
- **Database Migrations**: Prisma migration system
- **Internationalization**: Support for English and German
- **Theme Support**: Light/dark mode with next-themes

### Deployment

The application is designed for deployment on Vercel or similar platforms supporting Next.js applications. It includes:

- Environment variable configuration
- Database connection management
- Build optimization for production
- Static asset handling

## Features:
1. Manager Offline POS application accounts and subscriptions
2. Upload local data and sync with other account devices
3. Mark synced device to avoid duplicate data being uploaded

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
