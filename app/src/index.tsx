import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ChainId, DAppProvider, Config } from "@usedapp/core";
import { createWeb3Modal, defaultConfig } from "@web3modal/ethers5";

// 1. Get projectId
const projectId = 'YOUR_PROJECT_ID'

// 2. Set chains
const mainnet = {
  chainId: 1,
  name: 'Ethereum',
  currency: 'ETH',
  explorerUrl: 'https://etherscan.io',
  rpcUrl: 'https://cloudflare-eth.com'
}

// 3. Create modal
const metadata = {
  name: 'My Website',
  description: 'My Website description',
  url: 'https://mywebsite.com',
  icons: ['https://avatars.mywebsite.com/']
}

createWeb3Modal({
  ethersConfig: defaultConfig({ metadata }),
  chains: [mainnet],
  projectId
})

const localhostMulticall = process.env["REACT_APP_MULTICALL_LOCALHOST"];
const config: Config = localhostMulticall
  ? {
      multicallVersion: 2,
      multicallAddresses: {
        [ChainId.Localhost]: localhostMulticall,
      },
    }
  : {};
ReactDOM.render(
    <App />,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
