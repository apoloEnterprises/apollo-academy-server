import * as express from 'express';
import * as http from 'http';
import Connection = require('mysql2/typings/mysql/lib/Connection');
import * as WebSocket from 'ws';

const db2 = require('./database/db')
const app = express();
const enableWs = require('express-ws')
enableWs(app)


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
      
      const id_usuario = 'f80a26b6-bfe2-46af-a93d-5d43a5536263'
      
      const sqlSelecttest: string = `
      UPDATE usuario_curso_assistindo
      SET timestamp=?
      WHERE id_usuario=?
      `
      
      console.log('received: %s', message); 
     
        if (message.includes(':')) {
          db2.query(sqlSelecttest, [message, id_usuario], async function (err: Error, result: any) {
            if (err) throw err;
            console.log('timestamp');
          })  
        }
      
        const name = message

        console.log('received: %s', message); 
       
        const sqlName: string = `
        SELECT nomeDeUsuario
        FROM usuarios
        WHERE nomeDeUsuario=?
        `
        
        db2.query(sqlName, [name], async function (err: Error, result: any) {
          if (err) throw err;
          if (result.length > 0) {
            // ws.send([true])
            console.log('ja em uso');
            ws.send('em uso')            
          } else {
            ws.send('disponivel')
          }
        })
      });

      
      // ws.send(`idk brooo`);
        
        //send immediatly a feedb2ack to the incoming connection    
  });

//start our server
server.listen(port || 8999, () => {
    console.log(`🚀 Connected to webscoket server`);
});
