import React, { useState } from 'react'
import { View, Button, StyleSheet, Text } from 'react-native'
import { RectButton } from 'react-native-gesture-handler';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    runOnJS,
    runOnUI,
    withSpring,
    Easing,
    useDerivedValue,
    withRepeat,
    useAnimatedReaction
} from 'react-native-reanimated';

const Box = () => {
    const offset = useSharedValue(0);
    const [progress, setProgress] = useState(offset.value)

    const animatedStyles = useAnimatedStyle(() => {
        return {
            transform: [{
                translateX: withTiming(offset.value * 200)
            }],
        };
    });

    const updateProgressState = progress => {
        setProgress(progress)
    }

    useAnimatedReaction(
        () => {
            return offset.value;
        },
        (data) => {
            runOnJS(updateProgressState)(data)
        }
    );

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.box, animatedStyles]} />
            <Button onPress={() => offset.value = Math.random()} title="Move">
            </Button>
            <Text>{progress}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 200,
        paddingHorizontal: 10,
    },
    box: {
        backgroundColor: '#50d2c2',
        width: 80,
        height: 80,
        borderRadius: 8,
        marginBottom: 50
    },
    trackerBox: {
        backgroundColor: '#f18888',
        marginBottom: 100
    },
    button: {
        padding: 20,
        width: 150,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: '#50d2c2'
    }
})

export default Box