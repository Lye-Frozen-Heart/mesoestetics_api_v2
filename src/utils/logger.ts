/* eslint-disable @typescript-eslint/no-var-requires */
const chalk = require('chalk')
export const log = globalThis.console.log

export const lineDivider = (): void => log('+++++++++++++++++++++++++++++++++++++++++++++++++')

export const lineFeed = (): void => log('\n')

export const lineGreen = (text: string): void => log(chalk.green(text))

export const lineRed = (text: string): void => log(chalk.red(text))

export const linePurple = (text: string): void => log(chalk.magenta(text))
