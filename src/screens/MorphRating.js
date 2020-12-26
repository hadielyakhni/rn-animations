import React from 'react';
import { TouchableOpacity, StyleSheet, Text, View, Dimensions, Animated, StatusBar } from 'react-native';
import { interpolate } from 'flubber';
import Svg, { Path, G } from 'react-native-svg'
import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Chroma from 'chroma-js'
import BackButton from '../components/BackButton';

const { width, height } = Dimensions.get('screen');

const fill = "#333";
const types = ['upset', 'sad', 'neutral', 'smile', 'excited'];
const PATHS = {
    "upset": "M141.5 132.55C140.92 75.87 120.92 48.22 81.5 49.63C42.09 51.03 22.09 78.67 21.5 132.55L141.5 132.55Z",
    "sad": "M122.32 87.65C121.94 68.08 108.83 58.53 83 59.02C57.17 59.5 44.06 69.04 43.68 87.65L122.32 87.65Z",
    "neutral": "M38.02 58.05L99.77 40.83L102.99 52.35L41.23 69.57L38.02 58.05Z",
    "smile": "M122.32 64.68C121.94 84.25 108.83 93.79 83 93.31C57.17 92.82 44.06 83.28 43.68 64.68L122.32 64.68Z",
    "excited": "M142.99 49.74C142.4 106.42 122.4 134.06 82.99 132.66C43.57 131.26 23.57 103.62 22.99 49.74L142.99 49.74Z",
    "left-eye": "M30.43 16.78C30.43 24.39 24.29 30.57 16.72 30.57C9.15 30.57 3 24.39 3 16.78C3 9.18 9.15 3 16.72 3C24.29 3 30.43 9.18 30.43 16.78Z",
    "right-eye": "M162.99 16.79C162.99 24.4 156.84 30.57 149.27 30.57C141.7 30.57 135.56 24.4 135.56 16.79C135.56 9.18 141.7 3.01 149.27 3.01C156.84 3.01 162.99 9.18 162.99 16.79Z"
};
const TOP_COLORS = ['#e76161', '#f79830', '#f3bd43', '#eeac4d', '#5fe676']
const BOTTOM_COLORS = ['#ec3131', '#e76161', '#cb6020', '#bbe65f', '#2ee84e']
const GRADIENT_COLOR_LENGTH = 500
const TOP_COLORS_SPECTRUM = Chroma.scale(TOP_COLORS).colors(GRADIENT_COLOR_LENGTH)
const BOTTOM_COLORS_SPECTRUM = Chroma.scale(BOTTOM_COLORS).colors(GRADIENT_COLOR_LENGTH)

export default class MorphRating extends React.Component {
    state = {
        path: PATHS.neutral,
        type: "neutral",
        index: 2,
        animatedValue: new Animated.Value(0),
        animationEnds: true,
        colorIndex: 299
    }

    showRating = false

    interpolatePaths = (type, index) => {
        if (!this.state.animationEnds || (index === this.state.index && this.showRating))
            return
        if (!this.showRating)
            this.showRating = true
        this.setState({ animationEnds: false })
        const interpolator = interpolate(this.state.path, PATHS[type], { maxSegmentLength: 2 });
        Animated.timing(this.state.animatedValue, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true
        }).start(() => {
            this.state.animatedValue.removeAllListeners()
            this.setState({ animationEnds: true })
            this.state.animatedValue.setValue(0)
        })

        const prevIndex = this.state.index
        const prevColorIndex = this.state.colorIndex

        this.state.animatedValue.addListener(({ value }) => {
            const path = interpolator(value)
            this.setState({
                path,
                type,
                index,
                colorIndex: prevColorIndex + (index - prevIndex) * value * 100
            })
        })
    }

    render() {
        return (
            <LinearGradient
                colors={[TOP_COLORS_SPECTRUM[this.state.colorIndex], BOTTOM_COLORS_SPECTRUM[this.state.colorIndex]]} style={styles.gradient}>
                <StatusBar translucent backgroundColor='transparent' />
                <BackButton />
                <View style={styles.headings}>
                    <Text style={styles.heading}>Please rate your feedback</Text>
                    <Text style={styles.body}>Do let us know your thoughts.</Text>
                    <Text style={styles.body}>Your feedback matters!</Text>
                </View>
                <View style={styles.svgWrapper}>
                    <Svg width={width} height={height / 3} viewBox="0 0 166 136" style={styles.svgContainer}>
                        <G>
                            <Path d={PATHS["left-eye"]} fill={fill} />
                            <Path d={this.state.path} fill={fill} />
                            <Path d={PATHS["right-eye"]} fill={fill} />
                        </G>
                    </Svg>
                    <View style={styles.feedbackWrapper}>
                        {types.map((type, index) => (
                            <TouchableOpacity key={type} onPress={() => this.interpolatePaths(type, index)}>
                                <AntDesign
                                    name={this.state.index >= index && this.showRating ? "star" : "staro"}
                                    size={32}
                                    color="#fff"
                                />
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </LinearGradient>
        );
    }
}

const styles = StyleSheet.create({
    gradient: {
        width,
        height: height + 30,
        alignItems: "center",
    },
    feedbackWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        height: 60,
        borderRadius: 30,
        backgroundColor: "rgba(0, 0, 0, 0.05)",
        width: width * .9
    },
    headings: {
        flex: .4,
        paddingHorizontal: 16,
        justifyContent: "center"
    },
    heading: {
        color: "#fff",
        fontSize: 42,
        lineHeight: 42,
        fontWeight: '700'
    },
    body: {
        color: "#fff",
    },
    svgContainer: {
        marginBottom: 40
    },
    svgWrapper: {
        flex: .6,
        alignItems: "center",
        justifyContent: "center"
    },
    backArrow: {
        position: 'absolute',
        top: 44,
        left: 16
    }
});