import React from 'react'
import { StyleSheet, useWindowDimensions } from 'react-native'
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
    useAnimatedGestureHandler,
    useAnimatedStyle,
    useSharedValue,
    withSpring
} from 'react-native-reanimated';

const BALL_DIAMETER = 75

const GestureHandlerDemo = () => {
    const { width } = useWindowDimensions()
    const startingPosition = width / 2 - BALL_DIAMETER / 2;
    const pressed = useSharedValue(false);
    const x = useSharedValue(startingPosition);
    const y = useSharedValue(startingPosition);

    const eventHandler = useAnimatedGestureHandler({
        onStart: (event, ctx) => {
            pressed.value = true;
            ctx.startX = x.value;
            ctx.startY = y.value;
        },
        onActive: (event, ctx) => {
            x.value = ctx.startX + event.translationX;
            y.value = ctx.startY + event.translationY;
        },
        onEnd: (event, ctx) => {
            pressed.value = false;
        },
    });

    const uas = useAnimatedStyle(() => {
        return {
            backgroundColor: pressed.value ? ('#F18888') : '#001972',
            transform: [
                { translateX: x.value },
                { translateY: y.value },
                { scale: withSpring(pressed.value ? 1.2 : 1) }
            ],
        };
    });

    return (
        <PanGestureHandler onGestureEvent={eventHandler}>
            <Animated.View style={[styles.ball, uas]} />
        </PanGestureHandler>
    )
}

const styles = StyleSheet.create({
    ball: {
        width: BALL_DIAMETER,
        height: BALL_DIAMETER,
        borderRadius: BALL_DIAMETER / 2,
        backgroundColor: '#001972'
    }
})

export default GestureHandlerDemo