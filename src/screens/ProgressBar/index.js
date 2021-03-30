import React, { useRef, useState, useEffect } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import Reanimated, { useSharedValue, useAnimatedStyle, interpolateColor, withTiming, useDerivedValue } from 'react-native-reanimated'
import BackButton from '../../components/BackButton'

const Progress = ({ step, steps, height }) => {

    const [width, setWidth] = useState(0)

    const progressBarWidth = useSharedValue(0)

    const reactiveWidth = useDerivedValue(() => {
        return withTiming(progressBarWidth.value, { duration: 300 })
    }, [])

    useEffect(() => {
        progressBarWidth.value = -width + (width * step) / steps
    }, [step, width])



    const animatedStyle = useAnimatedStyle(() => {
        return {
            backgroundColor: interpolateColor(
                reactiveWidth.value,
                [-width, -width / 2, 0],
                ['#f18888', '#fff000', '#50d2c2'],
            ),
            transform: [{
                translateX: reactiveWidth.value
            }]
        }
    })

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
                <Reanimated.View
                    style={[{
                        height,
                        width: '100%',
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        borderRadius: height,
                        position: 'absolute',
                        left: 0,
                        top: 0,
                    }, animatedStyle]}
                />
            </View>
        </>
    )
}

export default () => {
    const STEPS = useRef(1).current
    const [step, setStep] = useState(0)
    const increaseProgress = () => setStep((step + 1) % (STEPS + 1))
    return (
        <View style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20
        }}>
            <BackButton />
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

