
import React, { useContext } from 'react'
import Text from '../component/Text'
import { EvmWalletContext } from '../context/EvmWalletContext'
import { View } from 'react-native'
import { globalStyles } from '../styles/globalStyles'

function EVMWalletHomeScreen() {
    const { wallet } = useContext(EvmWalletContext)
    return (
        <View style={[globalStyles.screen, globalStyles.center]}>
            <Text>EVM Address</Text>
            <Text size='lg'>{wallet?.address}</Text>
        </View>
    )
}

export default EVMWalletHomeScreen