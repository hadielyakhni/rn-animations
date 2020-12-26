import React, { createRef, useRef, useEffect, useState, forwardRef } from 'react';
import {
    Text,
    View,
    FlatList,
    StyleSheet,
    Dimensions,
    Animated,
    Image,
    TouchableOpacity,
} from 'react-native';
import BackButton from '../components/BackButton';

const images = {
    man:
        'https://images.pexels.com/photos/3147528/pexels-photo-3147528.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    women:
        'https://images.pexels.com/photos/2552130/pexels-photo-2552130.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    kids:
        'https://images.pexels.com/photos/5080167/pexels-photo-5080167.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    skullcandy:
        'https://images.pexels.com/photos/5602879/pexels-photo-5602879.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    help:
        'https://images.pexels.com/photos/2552130/pexels-photo-2552130.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
};
const data = Object.keys(images).map((i) => ({
    key: i,
    title: i,
    image: images[i],
    ref: createRef()
}));

const { width, height } = Dimensions.get('screen')

const Tab = forwardRef(({ item, onItemPress }, ref) => (
    <TouchableOpacity onPress={onItemPress}>
        <View ref={ref} >
            <Text style={{
                color: '#fff',
                fontSize: 78 / data.length,
                fontWeight: 'bold',
                textTransform: 'uppercase'
            }}>{item.title}</Text>
        </View>
    </TouchableOpacity>
))

const Indicator = ({ measures, scrollX }) => {
    const inputRange = data.map((_, i) => i * width)
    const indicatorWidth = scrollX.interpolate({
        inputRange,
        outputRange: measures.map(({ width }) => width)
    })
    const indicatorX = scrollX.interpolate({
        inputRange,
        outputRange: measures.map(({ x }) => x)
    })
    return (
        <Animated.View style={{
            backgroundColor: '#fff',
            position: 'absolute',
            height: 3,
            bottom: -10,
            width: indicatorWidth,
            transform: [{ translateX: indicatorX }]
        }} />
    )
}

const Tabs = ({ data, scrollX, onItemPress }) => {

    const [measures, setMeasures] = useState([])
    const containerRef = useRef()

    useEffect(() => {
        const m = []
        data.forEach((item, i) => {
            item.ref.current.measureLayout(
                containerRef.current,
                (x, y, width, height) => m.push({ x, y, width, height })
            )
            if (i + 1 === data.length) setTimeout(() => setMeasures(m), 0)
        })
    }, [])

    return (
        <View style={{ position: 'absolute', top: 100, width }}>
            <View ref={containerRef} style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-evenly' }}>
                {data.map((item, index) =>
                    <Tab key={item.key} item={item} ref={item.ref} onItemPress={() => onItemPress(index)} />
                )}
            </View>
            {measures.length > 0 && <Indicator measures={measures} scrollX={scrollX} />}
        </View>
    )
}

export default ({ navigation }) => {
    const scrollX = useRef(new Animated.Value(0)).current
    const flatListRef = useRef()
    const onItemPress = (itemIndex) => {
        flatListRef.current.scrollToOffset({
            offset: itemIndex * width
        })
    }
    return (
        <View style={styles.container}>
            <BackButton color="#fff" />
            <Animated.FlatList
                ref={flatListRef}
                data={data}
                keyExtractor={({ key }) => key}
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: false }
                )}
                bouces={false}
                renderItem={({ item: { image } }) => (
                    <View style={{ width, height }}>
                        <Image
                            source={{ uri: image }}
                            style={{ flex: 1, resizeMode: 'cover' }}
                        />
                        <View style={{ ...StyleSheet.absoluteFill, backgroundColor: 'rgba(0,0,0,0.3)' }} />
                    </View>
                )}
            />
            <Tabs data={data} scrollX={scrollX} onItemPress={onItemPress} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});