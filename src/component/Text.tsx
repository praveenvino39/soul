import React, { FC, ReactNode } from 'react'
import { Text as RNText, StyleSheet } from 'react-native'
import { globalStyles } from '../styles/globalStyles'


type Props = {
    children?: ReactNode,
    size?: 'sm' | 'md' | 'lg'
}

const Text: FC<Props> = ({ children, size = 'md' }) => {
    return (
        <RNText style={[globalStyles.text, { fontSize: size === "lg" ? 16 : size === "sm" ? 12 : undefined }]}>{children}</RNText>
    )
}

export default Text
