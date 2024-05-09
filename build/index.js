"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const posts_1 = __importDefault(require("./routes/posts"));
const mongoose_1 = __importDefault(require("mongoose"));
const logger_1 = require("./utils/logger");
const app = (0, express_1.default)();
const API_URL = process.env.MONGO_URL;
if (API_URL == null) {
    (0, logger_1.log)('Error: La variable de entorno MONGO_URL no está definida.');
    process.exit(1);
}
app.use(express_1.default.json());
mongoose_1.default.Promise = global.Promise;
// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
mongoose_1.default.connect(API_URL, {}).then(() => {
    (0, logger_1.lineGreen)('Successfully connected to the database!');
}).catch((error) => {
    console.log('Could not connect to the database. Exiting...', error);
    process.exit();
});
const PORT = 8786;
app.get('/ping', (_request, res) => {
    console.log('Someone pinged here!! ');
    res.send('pong');
});
app.use('/api/posts', posts_1.default);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
