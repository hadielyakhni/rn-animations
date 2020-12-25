import { MaterialIcons } from '@expo/vector-icons'
import React, { useRef, useState, useEffect } from 'react'
import { View, Text, Animated, TouchableOpacity } from 'react-native'

const Progress = ({ step, steps, height }) => {

    const animatedValue = useRef(new Animated.Value(-10000)).current
    const reactive = useRef(new Animated.Value(-10000)).current

    const [width, setWidth] = useState(0)

    useEffect(() => {
        Animated.timing(animatedValue, {
            toValue: reactive,
            duration: 200,
            useNativeDriver: true
        }).start()
    }, [])

    useEffect(() => {
        reactive.setValue(-width + (width * step) / steps)
    }, [step, width])

    return (
        <>
            <Text style={{
                marginBottom: 4,
                fontSize: 12,
                fontWeight: 'bold',
                alignSelf: 'flex-start',
                color: '#333'
            }}>
                {step}/{steps}
            </Text>
            <View
                onLayout={e => setWidth(e.nativeEvent.layout.width)}
                style={{
                    height,
                    width: '100%',
                    backgroundColor: 'rgba(0,0,0,0.1)',
                    borderRadius: height,
                    overflow: 'hidden'
                }}>
                <Animated.View
                    style={{
                        height,
                        width: '100%',
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        borderRadius: height,
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        transform: [{ translateX: animatedValue }]
                    }}
                />
            </View>
        </>
    )
}

export default ({ navigation }) => {
    const STEPS = useRef(10).current
    const [step, setStep] = useState(0)
    const increaseProgress = () => setStep((step + 1) % (STEPS + 1))
    return (
        <View style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20
        }}>
            <TouchableOpacity
                style={{ position: 'absolute', top: 44, left: 16 }}
                onPress={navigation.goBack}>
                <MaterialIcons name={"arrow-back"} size={30} color="#333" />
            </TouchableOpacity>
            <Progress step={step} steps={STEPS} height={20} />
            <TouchableOpacity
                onPress={increaseProgress}
                style={{
                    marginTop: 36,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#333',
                    paddingVertical: 10,
                    paddingHorizontal: 14,
                    borderRadius: 12
                }}>
                <Text style={{ color: '#fff', fontWeight: 'bold' }}>
                    Increase +
                </Text>
            </TouchableOpacity>
        </View>
    )
}
