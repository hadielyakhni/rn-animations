import React from 'react'
import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { MaterialIcons } from '@expo/vector-icons'

const MainList = () => {
    const { navigate } = useNavigation()
    return (
        <FlatList
            data={SCREENS}
            keyExtractor={({ name }) => name}
            ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
            contentContainerStyle={{ paddingVertical: 20, paddingHorizontal: 12 }}
            renderItem={({ item: { name: screenName } }) => (
                <TouchableOpacity
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        backgroundColor: '#fff',
                        elevation: 5,
                        padding: 10,
                        borderRadius: 10
                    }}
                    onPress={() => navigate(screenName)}>
                    <Text style={{ fontSize: 15 }}>
                        {screenName}
                    </Text>
                    <MaterialIcons name={"arrow-forward"} size={20} color="#333" />
                </TouchableOpacity>
            )}
        />
    )
}

export default MainList