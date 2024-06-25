import express from 'express';
import cors from 'cors';


import {MercadoPagoConfig, Preference } from 'mercadopago'

const client = new MercadoPagoConfig({
    accessToken: "APP_USR-2212184051878246-061518-973bb63e2ee78553ce2f23f133f16ce0-1858472757",
});


const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req,res) =>{
    res.send("servidor funcionando :P")
})

app.post("/create_preference", async (req,res) => {
    try {
        const body = {
        items: [
            {
                title:req.body.title,
                unit_price:Number(req.body.price),
                quantity:Number(req.body.quantity),
                currency_id: "ARS",
            },
        ],
        back_urls: {
            success: "https://www.google.com/",
            failure: "https://www.google.com/",
            pending: "https://www.google.com/",
        },
        auto_return: "approved",
    };
    const preference = new Preference(client);
    const result = await preference.create({body});
    res.json ({
        id:result.id,
    })
    }catch (error) {
        console.log(error)
        res.status(500).json({
            error:"Error al crear la preferencia"
        })
    }
})
app.listen(port, ()=>{
    console.log('El servidor está funcionando en el puerto '+port);
})