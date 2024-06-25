import {useState} from 'react';
import React from 'react';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import axios from 'axios'

import '../estilos/TarjetasHoras.css';


function TarjetasHoras() {
    const [preferenceId, setPreferenceId] = useState(null)

    initMercadoPago("APP_USR-0b859517-460d-4c44-97f4-ebdcf6a39c74", {
        locale:"es-AR",
    })

    //crea una preferencia para poder pagar el producto por mercado pago
    const createPreference = async () => {
        try {
            const response = await axios.post("http://localhost:5000/create_preference", {
                title: "Algo",
                price: 100,
                quantity: 1,
            })

            const {id} = response.data
            return id
        } catch (error){
            console.log(error)
        }
    }

    const handleComprar = async () => {
        const id = await createPreference()
        if (id){
            setPreferenceId(id)
        }
    }

    return (
        <div className="tarjetas-horas">
            <h2>
                <center>
                    Comprar <span>Horas</span>
                </center>
            </h2>
            <div className="tarjetas-container">
                <div className="tarjeta">
                    <p className='categoríaTarjeta'>I</p>
                    <h3>1 Hora</h3>
                    <p><strong>Precio:</strong> $100</p>
                    <button className="enlace" onClick={handleComprar}>Comprar</button>
                    {preferenceId && <Wallet initialization={{preferenceId}}/>}
                </div>
                <div className="tarjeta">
                    <p>II</p>
                    <h3>5 Horas</h3>
                    <p><strong>Precio:</strong> $450</p>
                    <button className="enlace">Comprar</button>
                </div>
                <div className="tarjeta">
                    <p>III</p>
                    <h3>10 Horas</h3>
                    <p><strong>Precio:</strong> $800</p>
                    <button className='enlace'>Comprar</button>
                </div>
                <div className="tarjeta">
                    <p>IV</p>
                    <h3>24 Horas</h3>
                    <p><strong>Precio:</strong>$1500</p>
                    <button className='enlace'>Comprar</button>
                </div>
            </div>
        </div>
    );
}

export default TarjetasHoras;