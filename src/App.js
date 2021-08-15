import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");

  const getCoins = () => {
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=true`
      )
      .then((res) => {
        setCoins(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    getCoins();
  }, []);

  return (
    <div className="App container pt-5 pb-5">
      <form className="pb-5 row">
        <div className="offset-2 col-8 offset-sm-3 col-sm-6 offset-md-4 col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </form>
      {filteredCoins.length ? (
        <div className="table-responsive">
          <table className="table table-dark table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Coin</th>
                <th></th>
                <th scope="col">Price</th>
                <th scope="col">24h</th>
                <th scope="col">24h Volume</th>
                <th scope="col">Mkt Cap</th>
              </tr>
            </thead>
            <tbody>
              {filteredCoins.map((coin) => (
                <tr key={coin.id}>
                  <th>{coin.market_cap_rank}</th>
                  <td>
                    <img src={coin.image} alt="" /> {coin.name}
                  </td>
                  <td>{coin.symbol}</td>
                  <td>${coin.current_price.toLocaleString()}</td>
                  <td
                    style={{
                      color: `${
                        coin.price_change_percentage_24h > 0
                          ? `#0dbd00`
                          : `#bd0000`
                      }`,
                    }}
                  >
                    {coin.price_change_percentage_24h.toFixed(1)}%
                  </td>
                  <td>${coin.total_volume.toLocaleString()}</td>
                  <td>${coin.market_cap.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="empty">
          <h3>No matching coins found</h3>
        </div>
      )}
    </div>
  );
}

export default App;
