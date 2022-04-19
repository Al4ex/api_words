import express from 'express';
import morgan from 'morgan';
import wordRoutes from './routes/words.routes'; 
import { connectDB  } from './config/db';

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(express.json());
app.use( wordRoutes);


connectDB();

app.listen(3000, () => {
    console.log('server is running');
});