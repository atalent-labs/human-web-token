import clipboard from 'clipboardy';
import { program } from 'commander';
import chalk from 'chalk';
import Debug from 'debug';
import JWT from './src/index.js';
import { Render } from './src/table.js';
import pkg from './package.json' assert { type: 'json' }

global.debug = Debug('hwt')

try {
  program
    .version(pkg.version, '-v, --version', 'output the current version')
    .option('--raw')
    .option('-c, --claims <claims>')
    .hook('preAction', (command, actionCommand) => {
      const options = command.opts()
      let format = 'human'
      if (options.raw) {
        format = 'raw'
      }
      if (options.claims) {
        command.opts().claims = options.claims.split(',').map(_ => _.trim())
      }
      command.opts().format = format
    })
    .action(({ format, claims }) => {
      debug('received token:')
      const input = clipboard.readSync()
      debug(input)
      const result = JWT(input, { format, claims })
      process.stdout.write(Render(result, { format }) + '\n')
    })
    .parse()
} catch(e) {
  debug(e)
  let { message } = e
  if (e instanceof SyntaxError) {
    const input = clipboard.readSync()
    message =  `The clipboard ${chalk.red('does not contain a JWT')}, here what I got 👇` + '\n'
    message += '---' + '\n'
    message += input + '\n'
    message += '---' + '\n'
  } else {
    message = '😩 something went wrong: ' + chalk.red(message) + '\n'
  }
  process.stdout.write(message)
}
