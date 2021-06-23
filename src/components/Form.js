import React ,{useState,useEffect}from 'react';
import styled from '@emotion/styled';
import useCoins from '../hooks/useCoins';
import useCryptocurrency from '../hooks/useCryptocurrency';
import axios from 'axios';
import Error from './Error';

const Boton = styled.input`
 margin-top: 20px;
    font-weight: bold;
    font-size: 20px;
    padding: 10px;
    background-color: #66a2fe;
    border: none;
    width: 100%;
    border-radius: 10px;
    color: #FFF;
    transition: background-color .3s ease;
    &:hover {
        background-color: #326AC0;
        cursor:pointer;
    }
`;
 
const Form = ({getCoins,getCryptoCurrency}) => {

    //State lista de cryptomonedas
    const [listcrypto, getListCrypto] = useState([]);

    const [error, getError] = useState(false);



    const COINS=[
        {code:'USD',name:'Dolar de Estados Unidos'},
        {code:'MXN',name:'Peso Mexicano'},
        {code:'PEN',name:'Soles Peruanos'},
        {code:'EUR',name:'Euro'},
        {code:'GBP',name:'Libra Esterlina'},
    ]

    //Utilizar useCoins
    const [coins, ChooseCoins] =useCoins('Elige tu moneda','',COINS);
    
    //Utilizar useCryptocurrency
    const [cryptocurrency, ChooseCrypto] =useCryptocurrency('Elige tu Criptomoneda','',listcrypto);
    
    //Llamar al API
    useEffect(() => {
        
        const consultAPI=async()=>{
            const url='https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
            const result=await axios.get(url);
            getListCrypto(result.data.Data);
        }

        consultAPI();
    }, []);

    //Cotizar Monedas
    const  quoteCurrencies= (e) => {
        e.preventDefault();

        //Validar campos

        if(coins.trim()===''||cryptocurrency.trim()===''){
            getError(true);
            return;
        }
        //Pasar los datos al component principal
        getError(false);
        getCoins(coins);
        getCryptoCurrency(cryptocurrency);
    };
     

    return ( 
        <form onSubmit={quoteCurrencies}>
            {error? <Error message="Todos los campos son requeridos"/>:null}

            <ChooseCoins/>

            <ChooseCrypto/>
            <Boton type="submit" value="Calcular" />
        </form>
     );
}
 
export default Form;