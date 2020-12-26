import dayjs from 'dayjs'
import React, { useRef, useEffect } from 'react'
import { View, StyleSheet, Dimensions, Animated, TouchableOpacity } from 'react-native'
import BackButton from '../components/BackButton'

const { width } = Dimensions.get('screen')
const SIZE = width * .9
const TICK_INTERVAL = 1000

export default function AnalogClock({ navigation }) {

    const index = useRef(new Animated.Value(0)).current
    const tick = useRef(new Animated.Value(0)).current
    const scales = useRef([...Array(6).fill(0).map(() =>
        new Animated.Value(0)
    )]).current

    const [
        smallQuadranScale,
        mediumQuadranScale,
        bigQuadranScale,
        secondsScale,
        minutesScale,
        hoursScale
    ] = scales

    const _timer = useRef(0)
    const _ticker = useRef(null)

    useEffect(() => {
        const current = dayjs()
        const diff = current.endOf('day').diff(current, 'second')
        const ondeDay = 24 * 60 * 60

        _timer.current = ondeDay - diff
        tick.setValue(_timer.current)
        index.setValue(_timer.current - 30)

        _animate()

        _ticker.current = setInterval(() => {
            _timer.current += 1
            tick.setValue(_timer.current)
        }, TICK_INTERVAL)

        return () => {
            clearInterval(_ticker.current)
            _ticker.current = null
        }

    }, [])

    const _animate = () => {
        const scaleStaggerAnimations = scales.map(animated => (
            Animated.spring(animated, {
                toValue: 1,
                tension: 18,
                friction: 3,
                useNativeDriver: true
            })
        ))
        Animated.parallel([
            Animated.stagger(TICK_INTERVAL / scales.length, scaleStaggerAnimations),
            Animated.timing(index, {
                toValue: tick,
                duration: TICK_INTERVAL / 2,
                useNativeDriver: true
            })
        ]).start()
    }

    const interpolated = {
        inputRange: [0, 360],
        outputRange: ['0deg', '360deg']
    }

    const secondDegrees = Animated.multiply(index, 6)
    const transformSeconds = {
        transform: [
            { rotate: secondDegrees.interpolate(interpolated) },
            { scale: secondsScale }
        ]
    }

    const rotateMinutes = Animated.divide(
        secondDegrees,
        new Animated.Value(60)
    )
    const transformMinutes = {
        transform: [
            { rotate: rotateMinutes.interpolate(interpolated) },
            { scale: minutesScale }
        ]
    }

    const rotateHours = Animated.divide(
        rotateMinutes,
        new Animated.Value(60)
    )
    const transformHours = {
        transform: [
            { rotate: rotateHours.interpolate(interpolated) },
            { scale: hoursScale }
        ]
    }

    return (
        <View style={[styles.container]}>
            <BackButton />
            <Animated.View style={[styles.bigQuadran, { transform: [{ scale: bigQuadranScale }] }]} />
            <Animated.View style={[styles.mediumQuadran, { transform: [{ scale: mediumQuadranScale }] }]} />
            <Animated.View style={[styles.mover, transformHours]}>
                <View style={[styles.hours]} />
            </Animated.View>
            <Animated.View style={[styles.mover, transformMinutes]}>
                <View style={[styles.minutes]} />
            </Animated.View>
            <Animated.View style={[styles.mover, transformSeconds]}>
                <View style={[styles.seconds]} />
            </Animated.View>
            <Animated.View style={[styles.smallQuadran, { transform: [{ scale: smallQuadranScale }] }]} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    mover: {
        position: 'absolute',
        width: SIZE,
        height: SIZE,
        borderRadius: SIZE / 2,
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    hours: {
        backgroundColor: 'rgba(0,0,0,0.4)',
        height: '35%',
        marginTop: '15%',
        width: 4,
        borderRadius: 4
    },
    minutes: {
        backgroundColor: 'rgba(0,0,0,0.8)',
        height: '45%',
        marginTop: '5%',
        width: 3,
        borderRadius: 3
    },
    seconds: {
        backgroundColor: 'rgba(227,71,134,1)',
        height: '50%',
        width: 2,
        borderRadius: 2
    },
    bigQuadran: {
        width: SIZE * .8,
        height: SIZE * .8,
        borderRadius: SIZE * .4,
        backgroundColor: 'rgba(200,200,200,0.2)',
        position: 'absolute'
    },
    mediumQuadran: {
        width: SIZE * .5,
        height: SIZE * .5,
        borderRadius: SIZE * .25,
        backgroundColor: 'rgba(200,200,200,0.4)',
        position: 'absolute'
    },
    smallQuadran: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: 'rgba(227,71,134,1)',
        position: 'absolute'
    },
})