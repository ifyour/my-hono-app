### 设置数据库

1. [安装 Turso CLI](https://docs.turso.tech/reference/turso-cli#installation)

2. 在 Turso 创建数据库

```bash
# 创建数据库
turso db create turso-prisma

# 生成 Token
turso db tokens create turso-prisma

# 展示数据库基本信息
turso db show turso-prisma
```

3. 把数据库信息保存的环境变量文件 `.env`

```text
TURSO_DATABASE_URL=<YOUR_DATABASE_URL>
TURSO_AUTH_TOKEN=<YOUR_TOKEN>
```

4. 生成数据库 `schema` 文件

```bash
npm run generate
```

5. 根据 `schema` 初始化迁移数据库

```bash
# 文档：https://www.prisma.io/docs/reference/api-reference/command-reference#migrate-diff
npx prisma migrate diff --from-empty --to-schema-datamodel prisma/schema.prisma --script > baseline.sql

# 应用初始化迁移到数据库
turso db shell turso-prisma < baseline.sql
```

### 开发

```bash
# 生成 Prisma 客户端 (只需生成一次)
npx prisma generate

# 本地启动
npm run dev
```
