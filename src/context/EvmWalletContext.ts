import { createContext } from "react";
import { ethers } from 'ethers'

type EvmWalletContextType = {
    wallet?: ethers.Wallet,
    setWallet?: (args: ethers.Wallet) => void
}

export const EvmWalletContext = createContext<EvmWalletContextType>({})