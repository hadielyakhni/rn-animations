import { MaterialIcons } from '@expo/vector-icons'
import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

const Header = ({ title, backArrow, onBack, rightLabel, capitalizeTitle = true }) => {

    return (
        <View style={{ ...styles.container }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {backArrow && (
                    <TouchableOpacity activeOpacity={0.8} onPress={onBack} style={styles.backArrowContainer} >
                        <MaterialIcons name={"arrow-back"} size={30} />
                    </TouchableOpacity>
                )}
                <Text style={{ ...styles.title }}>
                    {capitalizeTitle ? title.toUpperCase() : title}
                </Text>
            </View>
            {rightLabel && <Text style={{ ...styles.label }}>
                {rightLabel}
            </Text>}
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    container: {
        height: 94,
        paddingTop: 38,
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        elevation: 5
    },
    title: {
        fontSize: 21,
    },
    label: {
        fontSize: 12,
    },
    backArrowContainer: {
        padding: 4,
        paddingTop: 6,
        borderRadius: 100,
        marginRight: 12
    }
})