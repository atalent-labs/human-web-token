import { Table } from "console-table-printer"
import chalk from "chalk"

const colors = {
  'exp': 'green',
  'iat': 'yellow',
  'sub': 'blue',
  'iss': 'cyan',
  'typ': 'magenta',
  'jti': 'red',
  'sid': 'red',
  'session_state': 'red',
  'scope': 'blue',
}

export function Render ({ data, metadata }) {
  const table = new Table({
    charLength: {
      "❓": 2
    },
    columns: [
      { name: "claim", title:"Claim", alignment: "left"},
      { name: "title", title: "Description", alignment: "left" },
      { name: "value", alignment: "left" },
      { name: "raw",  title:"Value", maxLen: 10, alignment: "left" },
      { name: "comment", alignment: "left", maxLen: 60},
    ].filter(column => {
      return Object.keys(data[0]).includes(column.name)
    })
  });

  data.forEach(item => table.addRow(item, { color: colors[item.claim]}))
  const renderTable = table.render()

  let status = chalk.green('ACTIVE') + '  🚀'
  if (false === metadata.isValid) {
    status = chalk.red('EXPIRED') + '  😩'
  }

  return `
> Reading the JWT from your clipboard
--
> The JWT is ${status}

${renderTable}
  `.trimEnd()
}
