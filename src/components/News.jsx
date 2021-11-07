import { Typography, Select, Row, Col, Card, Avatar } from 'antd';
import React, { useState } from 'react';
import { useGetCryptoNewsQuery } from '../services/NewsApi';
import demoImage from '../images/th.jpg'
import moment from 'moment';
import { useGetCryptoQuery } from '../services/API';
import Loader from './Loader';


const { Text, Title } = Typography;
const { Option } = Select;

const News = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState('Cryptocurrency')
  const { data: cryptoNews } = useGetCryptoNewsQuery({ newsCategory, count: simplified ? 6 : 12 });
  const { data } = useGetCryptoQuery(100);

  if (!cryptoNews?.value) return <Loader />;

  return (
    <Row gutter={[24, 24]}>
      {!simplified && (
        <Col span={24}>
          <Select
            showSearch
            className="select-news"
            placeholder="Select a Crypto"
            optionFilterProp="children"
            onChange={(value) => setNewsCategory(value)}
            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            <Option value="Cryptocurency">Cryptocurrency</Option>
            {data?.data?.coins?.map((currency) => <Option value={currency.name}>{currency.name}</Option>)}
          </Select>
        </Col>
      )}
      {cryptoNews?.value.map((news, i) => (
        <Col xs={24} sm={12} lg={8} key={i}>
          <Card hoverable className='news-card'>
            <a href={news.url} target='_blank' rel='noreferrer'>
              <div className="news-image-container">
                <Title className='news-title' level={4}>{
                  news.name.length > 100
                    ? `${news.name.substring(0, 100)}...`
                    : news.name}</Title>
                <img src={news?.image?.thumbnail?.contentUrl || demoImage}
                  style={{ width: '120px', height: '120px', objectFit: 'cover' }}
                  alt='news'
                />
              </div>
              <p>
                {news.description.length > 100 ?
                  `${news.description.substring(0, 100)}...`
                  : news.description}
              </p>
              <div className="provider-container" style={{margin:'10px 0'}}>
                <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImage} alt='news' />
                <Text className='provider-name'>{news.provider[0]?.name}</Text>
              </div>
              <Text>{moment(news.datePublished).startOf('ss').fromNow()}</Text>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  )
}

export default News