import { MaterialIcons } from '@expo/vector-icons'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

export default function BackButton({ color = '#333' }) {
    const navigation = useNavigation()
    return (
        <TouchableOpacity
            style={{ position: 'absolute', top: 44, left: 16, zIndex: 1 }}
            onPress={navigation.goBack}>
            <MaterialIcons name={"arrow-back"} size={30} color={color} />
        </TouchableOpacity>
    )
}
