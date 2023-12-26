"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Schema"));
class Files extends Schema_1.default {
    constructor() {
        super(...arguments);
        this.tableName = 'files';
    }
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id');
            table.string('name');
            table.string('path');
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
exports.default = Files;
//# sourceMappingURL=1702482755128_files.js.map