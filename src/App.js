import React,{useState,useEffect} from 'react';
import styled from '@emotion/styled';
import imagen from './cryptomonedas.png';
import Form from './components/Form';
import Quotation from './components/Quotation';
import Spinner from './components/Spinner';
import axios from 'axios';

const Container= styled.div`
  max-width: 900px;
  margin: 0 auto;
  @media (min-width:992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;
const Image = styled.img`
  max-width: 100%;
  margin-top: 5rem;
`;
const Heading = styled.h1`
  font-family: 'Bebas Neue', cursive;
  color: #FFF;
  text-align:left;
  font-weight: 700;
  font-size: 50px;
  margin-bottom: 50px;
  margin-top: 80px;
  &::after {
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66A2FE;
    display:block;
  }
`;


function App() {

  const [coins, getCoins] =useState('');
    
  const [cryptocurrency, getCryptoCurrency] =useState('');

  const [result,getResult]=useState({});

  const [charging, getCharging]=useState(false);

  useEffect(() => {
    const quoteCrypto = async ()=>{
    //Evitamos la ejecución la primera vez
      if(coins==='')return;

    //Consultar api para la cotizacion
      const endPoint = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cryptocurrency}&tsyms=${coins}`;

      const result = await axios.get(endPoint);
    //Mostrar Spinner
      getCharging(true);
      //ocultar el spinner y mostrar el resultado
      setTimeout(()=>{
        getCharging(false);
         /*   Apartir Display se usa corchetes para acceder 
      al obj dinamico para obtener los datos*/
        getResult(result.data.DISPLAY[cryptocurrency][coins]);
      },1000)

    }
    quoteCrypto();
  }, [coins,cryptocurrency]);

  //Mostrar spinner o resultado
    const component=(charging)?<Spinner />:<Quotation result={result}/>

  return (
  <Container>
      <div>
          <Image
            src={imagen}
            alt="imagen cripto"
          />
      </div>
      <div>
        <Heading>Cotiza Criptomonedas al Instante</Heading>
        <Form
          getCoins={getCoins}
          getCryptoCurrency={getCryptoCurrency}
        />
        {component}
      </div>
  </Container> );
}

export default App;
