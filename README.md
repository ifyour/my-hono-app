Sure, here's the English version of the provided markdown:

### Setting up the Database

1. [Install Turso CLI](https://docs.turso.tech/reference/turso-cli#installation)

2. Create a database in Turso

```bash
# Create a database
turso db create turso-prisma

# Generate a token
turso db tokens create turso-prisma

# Show basic database information
turso db show turso-prisma
```

3. Save the database information into an environment variable file `.env`

```text
TURSO_DATABASE_URL=<YOUR_DATABASE_URL>
TURSO_AUTH_TOKEN=<YOUR_TOKEN>
```

4. Generate the database `schema` file

```bash
npm run generate
```

5. Initialize database migration based on the `schema`

```bash
# Documentation: https://www.prisma.io/docs/reference/api-reference/command-reference#migrate-diff
npx prisma migrate diff --from-empty --to-schema-datamodel prisma/schema.prisma --script > baseline.sql

# Apply initial migration to the database
turso db shell turso-prisma < baseline.sql
```

### Development

```bash
# Generate Prisma client (only needs to be generated once)
npx prisma generate

# Start locally
npm run dev
```
