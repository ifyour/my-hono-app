### Setting up the database

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
bunx prisma generate --schema src/database/schema.prisma
```

5. Initialize database migration based on the `schema`

```bash
bunx prisma migrate dev --name init --schema src/database/schema.prisma
turso db shell turso-prisma < src/database/prisma/migrations/20231203094348_init/migration.sql
```

### Development

```bash
# dev
bun run dev

# Generate initialization data (first time)
bun src/database/init_data.ts
```
