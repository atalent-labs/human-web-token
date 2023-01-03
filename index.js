import clipboard from 'clipboardy';
import JWT from './src/index.js';
import chalk from 'chalk';

const input = clipboard.readSync()
try {
  const result = JWT(input, { format: 'aw' })
} catch(e) {
  process.stdout.write(`😩 Oups ${chalk.red(e.message)}\n`)
}
