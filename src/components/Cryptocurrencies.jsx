import { Card, Col, Input, Row } from 'antd';
import millify from 'millify';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useGetCryptoQuery } from '../services/API';
import searchIcon from '../images/search.png'
import Loader from './Loader';

const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const { data: cryptoList, isFetching } = useGetCryptoQuery(count);
  const [cryptos, setCryptos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {

    const filteredData = cryptoList?.data?.coins.filter(
      (coin) => coin.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setCryptos(filteredData)
  }, [cryptoList, searchTerm])


  if (isFetching) return <Loader />;
  return (
    <>
      {!simplified && (
        <div className="search-crypto">
          <Input
            prefix={<img src={searchIcon} alt='search' />}
            placeholder='Search Crypto'
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}
      <Row gutter={[32, 32]} className='crypto-card-container'>
        {cryptos?.map((currency) => (
          <Col xs={24} sm={12} lg={6} className='crypto-card' key={currency.id}>
            <Link to={`/crypto/${currency.id}`}>
              <Card
                title={`${currency.rank} ${currency.name}`}
                extra={<img src={currency.iconUrl} className='crypto-image' alt={currency.name} style={{ width: '32px', height: '32px' }} />}
                hoverable
              >
                <p>Price: {millify(currency.price)}</p>
                <p>Market Cap: {millify(currency.marketCap)}</p>
                <p>Dayly Change: {millify(currency.change)}%</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  )
}

export default Cryptocurrencies
