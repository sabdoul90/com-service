const cookieParser = require('cookie-parser');
const express = require('express');
const cors = require("cors")
const helmet = require('helmet');
const dbconfiguration = require('./config/database')

const authRouter = require('./routers/authRouters');
const filesRouter = require('./routers/fileRoutes');

async function LancerServeur(){
    try{
        dbconfiguration.authenticate();
        console.log("Connexion etablie avec la base de donnée !");
    
        await dbconfiguration.sync({force:false});
        console.log("Donnée synchronisées !");
    
        app.listen(process.env.PORT, ()=>{
            console.log("Le serveur ecoute sur le port : ", process.env.PORT);
            console.log(`Serveur accessible via http://localhost:${process.env.PORT}`);
        });
    }catch (e){
        console.error('Erreur de connexion à la base de données !', e)
    }
}


const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));

//Routes
app.use('/api/auth',authRouter);
app.use('/api/files',filesRouter);
app.use('/uploads', express.static("uploads"));


LancerServeur();

/*app.get('/', (req, res)=>{
    res.json({message: "successfully receved mister Sawadogo"});
})*/



