import express from "express";
import productRouter from "./routes/product.routes.js";
import cartRouter from "./routes/carts.routes.js";
import viewsRouter from "./routes/views.routes.js";
import handlebars from "express-handlebars";
import mongoose from "mongoose";
import __dirname from "./utils.js";
import { Server } from 'socket.io';
// import Messages from './dao/dbManagers/messages.manager.js';


const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true}));

app.use(express.static(`${__dirname}/public`));

app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

app.use("/", viewsRouter)
app.use("/api/products", productRouter)
app.use("/api/carts", cartRouter)

//Routes
app.use('/', viewsRouter);

try {
    await mongoose.connect('mongodb+srv://sergioandres98:seryus1984@mongodb101.2xndcrf.mongodb.net/segundaEntrega?retryWrites=true&w=majority')
    console.log('DB connected')
} catch (error) {
    console.log(error.message)
}

const server = app.listen(8080, ()=>{
    console.log("Servidor express en puerto 8080");
});

// //Socket io
// const socketServer = new Server(server);

// //se almacenan los mensajes de los clientes
// const messages = [];

// //
// const userMessage = new Messages();

// socketServer.on('connection', socket =>{
//     console.log('Nuevo cliente conectado');

//     //mensajes
//     socket.on('message', async data =>{
//         messages.push(data); //agregamos el historial de mensajes
//         socketServer.emit('messageLogs', messages); //enviamos todos los mensajes
//         await userMessage.save({user: data.user, message: data.message});
//     })

//     socket.on('authenticated', data =>{ //data es el nombre de usuario
//         socket.emit('messageLogs', messages); //se envian  todos los mensajes almacenados hasta el momento 
//         //solo al cliente q se acaba de conectar

//         socket.broadcast.emit('newUserConnected', data);
//     })
// })
