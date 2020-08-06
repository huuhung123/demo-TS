import express from 'express';
import mongoose from 'mongoose'

import indexRoutes from './routes/indexRoutes'
import PostsRoutes from './routes/PostsRoutes'



class Server {
    public app: express.Application;

    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    config() {
        const MONGO_URI = 'mongodb://localhost/CRUD-TS';
        mongoose.connect(MONGO_URI || process.env.URL_DB , {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true})
        const db = mongoose.connection
        db.on('error', console.error.bind(console, 'connection error:'))
        db.once('open', () => {
        console.log('connected to Mongo DB')    
        })

        this.app.set('port', process.env.PORT || 3000);
        this.app.use(express.json())
        this.app.use(express.urlencoded({extended: false}))
    }

    routes() {
        this.app.use(indexRoutes);
        this.app.use('/posts', PostsRoutes)
    }

    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port', this.app.get('port'))
        })
    }
}

const server = new Server()
server.start()