import mongoose from 'mongoose'
import app from './app'
import { env } from '../config/env'
import dns from 'node:dns';

dns.setServers(['1.1.1.1', '8.8.8.8']);

const startServer = async () => {
    try {
        await mongoose.connect(env.mongoUri)
        console.log('MongoDB Connected')

        app.listen(env.port, () => {
            console.log('Server running on port ' + env.port)
        })
    } catch (error) {
        console.log(`Failed to start server, ${error}`)
        process.exit(1);
    }
}

startServer()