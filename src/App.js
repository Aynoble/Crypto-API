import { useState, useEffect } from "react";
import axios from "axios";
import Coins from "./components/Coins";
import Navbar from "./components/Navbar";
import Coin from "./routes/Coin";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loading from "./components/Loading";
import "./App.css";

function App() {
  const [coins, setCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const url =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false";

  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        setCoins(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  {
    if (isLoading) {
      return (
        <div className="loading">
          <Loading />
        </div>
      );
    } else {
      return (
        <Router>
          <div className="app">
            <Navbar />
            <Routes>
              <Route path="/" element={<Coins coins={coins} />} />
              <Route path="/coin" element={<Coin />}>
                <Route path=":coinId" element={<Coin />} />
              </Route>
            </Routes>
          </div>
        </Router>
      );
    }
  }
}

export default App;
