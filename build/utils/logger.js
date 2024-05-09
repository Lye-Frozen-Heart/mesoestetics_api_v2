"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lineRed = exports.lineGreen = exports.lineFeed = exports.lineDivider = exports.log = void 0;
/* eslint-disable @typescript-eslint/no-var-requires */
const chalk = require('chalk');
exports.log = globalThis.console.log;
const lineDivider = () => (0, exports.log)('+++++++++++++++++++++++++++++++++++++++++++++++++');
exports.lineDivider = lineDivider;
const lineFeed = () => (0, exports.log)('\n');
exports.lineFeed = lineFeed;
const lineGreen = (text) => (0, exports.log)(chalk.green(text));
exports.lineGreen = lineGreen;
const lineRed = (text) => (0, exports.log)(chalk.red(text));
exports.lineRed = lineRed;
