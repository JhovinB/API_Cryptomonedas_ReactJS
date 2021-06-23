import React from 'react';
import styled from '@emotion/styled';

const ResultDiv = styled.div`
    color: #FFF;
    font-family: Arial, Helvetica, sans-serif;
`;

const Info = styled.p`
    font-size: 18px;
    span {
        font-weight:bold;
    }
`;
const Price = styled.p`
    font-size: 30px;
    span {
        font-weight:bold;
    }
`;

const Quotation = ({result}) => {

    //Si un objeto esta vacio
    if(Object.keys(result).length===0)return null;

    return(
        <ResultDiv>
            <Price>El precio es: <span>{result.PRICE}</span> </Price>
            <Info>El precio más alto del día: <span>{result.HIGHDAY}</span> </Info>
            <Info>El precio más bajo del día: <span>{result.LOWDAY}</span> </Info>
            <Info>Variación ultimas 24 horas: <span>{result.CHANGEPCT24HOUR}</span> </Info>
            <Info>Última Actualización: <span>{result.LASTUPDATE}</span> </Info>
        </ResultDiv>
    );    
}
 
export default Quotation;