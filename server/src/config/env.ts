
import dotenv from 'dotenv'

dotenv.config()

export const env = {
    mongoUri: process.env.MONGO_URI as string,
    port: process.env.PORT || 5000,
    jwt: process.env.JWT_KEY as string,
    expiresIn: process.env.JWT_EXPIRES_IN as string
}

