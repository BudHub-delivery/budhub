"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var path_1 = require("path");
var schemasPath = path_1.default.resolve(__dirname, 'schemas');
var schemaFiles = fs_1.default.readdirSync(schemasPath);
var datasource = "\ndatasource db {\n  provider = \"mysql\"\n  url      = env(\"DATABASE_URL\")\n}\n\ngenerator client {\n  provider = \"prisma-client-js\"\n}\n";
var models = schemaFiles
    .map(function (file) { return fs_1.default.readFileSync(path_1.default.join(schemasPath, file), 'utf8'); })
    .join('\n\n');
var fullSchema = "".concat(datasource, "\n\n").concat(models);
fs_1.default.writeFileSync(path_1.default.resolve(__dirname, 'prisma', 'schema.prisma'), fullSchema);
