# Get started with Prisma and Turso

## Getting started

### 1. Create a project

```bash
npx try-prisma@latest --template typescript/script --path . --name turso-prisma --install npm
```

### 2. Create a database on Turso

```bash
turso db create turso-prisma
```

```bash
turso db tokens create turso-prisma
```

```bash
turso db show turso-prisma
```

### 3. Connect to Turso using Prisma

Enable the driverAdapters Preview feature flag in your Prisma schema `prisma/schema.prisma` :

```diff
generator client {
  provider        = "prisma-client-js"
+  previewFeatures = ["driverAdapters"]
}

datasource db {
  provider = "sqlite"
  url      = "file:./dev.db"
}
```

Create or update your `.env` file with the environment variables with the values from the “Create a database on Turso” step:

```env
TURSO_AUTH_TOKEN="eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9..."
TURSO_DATABASE_URL="libsql://turso-prisma-random-user.turso.io"
```

Create a baseline migration:

```bash
# https://www.prisma.io/docs/reference/api-reference/command-reference#migrate-diff
npx prisma migrate diff --from-empty --to-schema-datamodel prisma/schema.prisma --script > baseline.sql
```

Apply the migration to your Turso database:

```bash
turso db shell turso-prisma < baseline.sql
```

Install the latest version of Prisma Client:

```bash
npm install @prisma/client@latest
```

Install the libSQL database client and the driver adapter for Prisma Client:

```bash
npm install @prisma/adapter-libsql @libsql/client
```

Update your Prisma Client instance with the following snippet:

```ts
// script.ts

import { PrismaClient } from '@prisma/client'

// 1. Import libSQL and the Prisma libSQL driver adapter
import { PrismaLibSQL } from '@prisma/adapter-libsql'
import { createClient } from '@libsql/client'

// 2. Instantiate libSQL
const libsql = createClient({
  // @ts-expect-error
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN
})

// 3. Instantiate the libSQL driver adapter
const adapter = new PrismaLibSQL(libsql)
// Pass the adapter option to the Prisma Client instance
const prisma = new PrismaClient({ adapter })

// rest code...
```

Last step, And that’s it!

```bash
# Generate prisma client
npx prisma generate

# Initialize seed data
npm run dev
```

## Next move

### 1. Embedded replicas

https://www.prisma.io/blog/prisma-turso-ea-support-rXGd_Tmy3UXX#where-to-go-from-here

### 2. How to manage schema changes

https://www.prisma.io/docs/guides/database/turso#how-to-manage-schema-changes
