import * as express from 'express';
import * as http from 'http';
import Connection = require('mysql2/typings/mysql/lib/Connection');
import * as WebSocket from 'ws';

const nowDate = require('../../src/controllers/exports/getData');

const db2 = require('./database/db');
const app = express();
const enableWs = require('express-ws');
enableWs(app);
const { v4: uuidv4 } = require('uuid');


//initialize a simple http server
const server = http.createServer(app);
const port = 3007;

//initialize the WebSocket server instance
const ws = new WebSocket.Server({ server });

ws.on('connection', (ws: WebSocket) => {

  //connection is up, let's add a simple simple event
  // ws.on('message', (message: string) => {

  //     //log the received message and send it back to the client
  //     console.log('received: %s', message);
  //     ws.send(`Hello, you sent -> ${message}`);
  // });

  ws.on('message', function incoming(message: any) {
      
    const id_usuario = 'f80a26b6-bfe2-46af-a93d-5d43a5536263';
      
    const sqlSelecttest = `
      UPDATE usuario_curso_assistindo
      SET timestamp=?
      WHERE id_usuario=?
      `; 
        
    const sqlnome = `
        SELECT nomeDeUsuario
        FROM usuarios
        WHERE nomeDeUsuario=?
        `;         

    if (message.length >= 1 && message.length <= 50) {
      console.log(message.length);
          
      db2.query(sqlnome, [message], async function (err: Error, result: any) {
        if (err) throw err;
        if (result.length >= 1) {
          // ws.send([true])
          console.log('ja em uso');
          ws.send('em uso');            
        } else {
          ws.send('disponivel');
        }
      });
    } else {
      const userWatch = JSON.parse(message);        
                        
            
      db2.query(sqlSelecttest, [userWatch.usertime, userWatch.id_usuario], async function (err: Error, result: any) {
        if (err) throw err;

        console.log(userWatch.usertime);
      });
    }
  }); 
});

//start our server
server.listen(port || 8999, () => {
  console.log('🚀 Connected to webscoket server');
});
