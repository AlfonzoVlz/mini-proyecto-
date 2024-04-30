import http from 'node:http'
import path from 'node:path'
import fs from 'node:fs/promises'
import {connetion} from './main.js'

const server = http.createServer(async (req, res) => {

    const url = req.url
    const method = req.method

    if (method === 'GET') {
        switch (url) {
            case '/':
                const archivoPath = path.resolve("./index.html")
                const leerArchivo = await fs.readFile(archivoPath, 'utf-8')

                res.end(leerArchivo)
                break;
            case '/api/usuarios':
                try {
                    const [usuarios] = await connetion.query('SELECT * FROM usuarios;')

                    await fs.writeFile('usuarios.json', JSON.stringify(usuarios))

                    res.end(JSON.stringify({ usuarios}))
                } catch (error) {
                    res.writeHead(200, { "Content-Type": "application/json" })
                    res.end(JSON.stringify({ menssage: 'Error en el procedimeinto' }))
                }

                break;

            case '/api/usuarios/export':
                try {
                    const [datosUsuario] = await connetion.query('SELECT * FROM usuarios;')
                    const string = datosUsuario.reduce(
                        (acc, p) => (acc += `${p.id}, ${p.nombres},${p.apellidos},${p.direccion},${p.email},${p.dni},${p.edad},${p.telefono},${p.fecha_creacion_usuario}\n`), ''
                    );
                    await fs.writeFile('archivo.csv', string)
                    res.end(JSON.stringify({menssage : 'Exportacion de los datos con exito'}))
                   } catch (error) {
                    res.writeHead(200, { "Content-Type": "application/json" })
                        res.end(JSON.stringify({ menssage : 'hubo un error interno', details: error.menssage}))
                   }

                break;

            case '':

                break;

            default:
                break;
        }
    }






})

server.listen(3000, () => console.log('Mini proyecto ejecutandose'))



















