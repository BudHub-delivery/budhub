import * as fs from 'fs';
import * as path from 'path';

const schemasPath = path.resolve(__dirname, 'prisma', 'schemas');
const schemaFiles = fs.readdirSync(schemasPath);

const datasource = `
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}
`;

const models = schemaFiles
  .map((file) => fs.readFileSync(path.join(schemasPath, file), 'utf8'))
  .join('\n\n');

const fullSchema = `${datasource}\n\n${models}`;

fs.writeFileSync(path.resolve(__dirname, 'prisma', 'schema.prisma'), fullSchema);
