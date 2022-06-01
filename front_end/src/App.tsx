import {Kovan, Rinkeby, DAppProvider, Mainnet, KovanEther} from "@usedapp/core";
import { getDefaultProvider } from "ethers";
import Header from "./components/header/Header";
import {Container} from "@mui/material";
import Main from "./components/main/Main";

function App() {
  const config = {
    networks: [Kovan],
    readOnlyUrls: {
      [Kovan.chainId]: getDefaultProvider('kovan'),
    },
    notifications: {
      expirationPeriod: 1000,
      checkInterval: 1000,
    }
  }
  return (
    <DAppProvider config={config}>
        <Container maxWidth='md'>
          <Header />
         <Main />
        </Container>
    </DAppProvider>
  );
}

export default App;
