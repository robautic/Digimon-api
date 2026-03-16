import {randomUUID} from 'node:crypto'
import {Database} from './database.js'
import {buildRoutePath} from './utils/build-route-path.js'

const database = new Database()

export const routes = [
    {
        method: 'GET',
        path: buildRoutePath('/digimons'),
        handler: (req, res) => {
            const {name, type} = req.query

            const digimons = database.select('digimons', name || type ? {name, type} : null)

            return res.end(JSON.stringify(digimons))
        }
    },
    {
        method: 'POST',
        path: buildRoutePath('/digimons'),
        handler: (req, res) => {
            const {name, type} = req.body

            if (!name || !type) {
                return res.writeHead(400).end(JSON.stringify({error: 'name e type são obrigatórios'}))
            }

            const digimon = {
                id: randomUUID(),
                name,
                type,
                evolved_at: null,
                createad_at: new Date(),
                updated_at: new Date()
            }

            database.insert ('digimons', digimon)
            
            return res.writeHead(201).end()     
        }
    },
    {
        method: 'PUT',
        path: buildRoutePath('/digimons/:id'),
        handler: (req, res) => {
            const {id} = req.params
            const {name, type} = req.body

            if (!name && !type) {
             return res.riteHead(400).end(JSON.stringify({error: 'name ou type são obrigatórios'}))
            }

            const rowIndez = database.update('digimons', id, {
                name,
                type,
                updated_at: new Date()
            })

            if (rowIndex < 0) {
             return res.writeHead(404).end(JSON.stringify({ error: 'Digimon não encontrado'}))
            
            }

            return res.writeHead(204).end()
        }
    },
    {
         method: 'DELETE',
    path: buildRoutePath('/digimons/:id'),
    handler: (req, res) => {
        const { id } = req.params

        const rowIndex = database.delete('digimons', id)

        if (rowIndex < 0) {
            return res.writeHead(404).end(JSON.stringify({ error: 'Digimon não encontrado' }))
      }

      return res.writeHead(204).end()
         }
    },
    {
        method: 'PATCH',
    path: buildRoutePath('/digimons/:id/evolve'),
    handler: (req, res) => {
      const { id } = req.params

      const digimons = database.select('digimons')
      const digimon = digimons.find(d => d.id === id)

      if (!digimon) {
        return res.writeHead(404).end(JSON.stringify({ error: 'Digimon não encontrado' }))
      }

      const evolved_at = digimon.evolved_at ? null : new Date()

      database.update('digimons', id, { evolved_at, updated_at: new Date() })

      return res.writeHead(204).end()
         }
    }
]
