// Requiring module
const express = require('express');
const router = express.Router();
const cors = require('cors');
// Creating express object
const app = express();
const UserRouter = require('./routes/register.js')
const mongoose = require('mongoose')
const db = mongoose.connection
const PORT = process.env.PORT || 5000
app.use(express.json())
app.use(cors());
mongoose.connect('mongodb+srv://PrinterNotworking:gz7PtS5mAF07Pf6y@cluster0.wrdnh.mongodb.net/',
 {
 useNewUrlParser: true,
 useUnifiedTopology: true
 })
mongoose.set('strictQuery', true)
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))
app.listen(PORT, () => console.log(`Server Started on port ${PORT}`))

app.use('/', UserRouter)