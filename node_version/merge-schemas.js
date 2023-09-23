"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var schemasPath = path.resolve(__dirname, 'prisma', 'schemas');
var schemaFiles = fs.readdirSync(schemasPath);
var datasource = "\ndatasource db {\n  provider = \"postgresql\"\n  url      = env(\"DATABASE_URL\")\n}\n\ngenerator client {\n  provider = \"prisma-client-js\"\n}\n";
var models = schemaFiles
    .map(function (file) { return fs.readFileSync(path.join(schemasPath, file), 'utf8'); })
    .join('\n\n');
var fullSchema = "".concat(datasource, "\n\n").concat(models);
fs.writeFileSync(path.resolve(__dirname, 'prisma', 'schema.prisma'), fullSchema);
