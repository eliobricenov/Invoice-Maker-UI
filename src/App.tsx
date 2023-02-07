import { WagmiConfig } from "wagmi";
import { chains, wagmiClient } from "./providers";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { router } from "./router";
import { RouterProvider } from "react-router-dom";
import { StateMachineProvider } from "little-state-machine";

function App() {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <StateMachineProvider>
          <RouterProvider router={router} />
        </StateMachineProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default App;
