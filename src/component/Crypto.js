import React, { useEffect, useState } from "react";
import Coin from "./Coin";

const Crypto = () => {
  const [crytpData, setCryptoData] = useState([]);
  const [search, setSearch] = useState("");
  const fetchRequest = async () => {
    try {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=bhd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      );
      if (!response.ok) {
        throw new Error("some thing went wrong");
      }
      const data = await response.json();
      console.log(data);
      setCryptoData(data);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    fetchRequest();
  }, []);
  const searchHandler = (e) => {
    setSearch(e.target.value);
  };
  const filterCoin = crytpData.filter((coin) => {
    return coin.name.toLowerCase().includes(search.toLocaleLowerCase());
  });

  return (
    <React.Fragment>
      <div className="coin-app">
        <div className="coin-search">
          <h1 className="coin-text">Search a currency</h1>
          <form>
            <input
              className="coin-input"
              type="text"
              onChange={searchHandler}
              placeholder="Search"
            />
          </form>
        </div>

        {filterCoin.map((coin) => {
          return (
            <Coin
              key={coin.id}
              name={coin.name}
              price={coin.current_price}
              symbol={coin.symbol}
              marketcap={coin.total_volume}
              volume={coin.market_cap}
              image={coin.image}
              priceChange={coin.price_change_percentage_24h}
            />
          );
        })}
      </div>
    </React.Fragment>
  );
};

export default Crypto;
