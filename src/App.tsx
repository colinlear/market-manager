import { VictoriaParkMarket } from "./market/victoria-park";
import { MarketInterface } from "./MarketInterface";

function App() {
  return (
    <>
      <MarketInterface market={VictoriaParkMarket} />
    </>
  );
}

export default App;
