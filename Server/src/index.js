import dotenv from 'dotenv'

dotenv.config({ path: './.env' })

import connectDb from './db/index.js'
import {app} from './app.js'


connectDb()
.then( ()=>{
    app.listen( process.env.PORT,  ()=>{
        console.log('Listening at PORT: ', process.env.PORT);
    } )
} )
.catch( (error)=>{
    console.log('DB Connection Failed :: ERROR :: ',error);
    throw(error);
} )