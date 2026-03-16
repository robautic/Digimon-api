import { parse } from 'csv-parse'
import fs from 'node:fs'
import { createReadStream } from 'node:fs'

const csvPath = new URL('./digimons.csv', import.meta.url)

const stream = createReadStream(csvPath)

const csvParse = parse({
  delimiter: ',',
  skipEmptyLines: true,
  fromLine: 2
})

async function importCSV() {
  const linesParse = stream.pipe(csvParse)

  for await (const line of linesParse) {
    const [name, type] = line

    await fetch('http://localhost:3335/digimons', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, type })
    })

    console.log(`Digimon importado: ${name} - ${type}`)
  }
}

importCSV()