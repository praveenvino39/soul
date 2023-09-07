import React from 'react'
import crypto from 'crypto'
import { ethers } from 'ethers'


const useEVMWallet = () => {
    const createWalletWithFaceId = (faceId: string) => {
        const privateKeyBuffer = crypto.createHash('sha256').update(faceId).digest();
        const privateKey = ethers.utils.hexlify(privateKeyBuffer);
        const wallet = new ethers.Wallet(privateKey)
        return wallet;
    }
    return {
        createWalletWithFaceId
    }
}

export default useEVMWallet