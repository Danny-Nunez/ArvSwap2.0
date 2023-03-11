import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TokenPrice = () => {
  const [price, setPrice] = useState('');

  useEffect(() => {
    const fetchPrice = async () => {
      const { data } = await axios.get('https://api.coingecko.com/api/v3/coins/artemis-vision?tickers=true&market_data=true&community_data=true&developer_data=true&sparkline=false');
      setPrice(data.market_data.current_price.usd);
    };

    fetchPrice();
  }, []);

  return (
    <div>
      Arv price: ${price}
    </div>
  );
};

export default TokenPrice;
