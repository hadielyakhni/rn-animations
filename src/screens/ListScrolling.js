import * as React from 'react';
import {
  FlatList,
  Image,
  Animated,
  Text,
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Easing,
  StatusBar
} from 'react-native';
import BackButton from '../components/BackButton';
const { width, height } = Dimensions.get('screen');
import faker from 'faker'

faker.seed(10);
const DATA = [...Array(30).keys()].map((_, i) => {
  return {
    key: faker.random.uuid(),
    image: `https://randomuser.me/api/portraits/${faker.helpers.randomize(['women', 'men'])}/${faker.random.number(60)}.jpg`,
    name: faker.name.findName(),
    jobTitle: faker.name.jobTitle(),
    email: faker.internet.email(),
  };
});

const SPACING = 20;
const AVATAR_SIZE = 70;
const ITEM_SIZE = AVATAR_SIZE + SPACING * 3

export default () => {
  const scrollY = React.useRef(new Animated.Value(0)).current

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBar translucent backgroundColor="transparent" />
      {/* <BackButton /> */}
      <Image
        source={{ uri: 'https://images.pexels.com/photos/1231265/pexels-photo-1231265.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260' }}
        style={StyleSheet.absoluteFill}
        blurRadius={80}
      />
      <Animated.FlatList
        data={DATA}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        keyExtractor={item => item.key}
        contentContainerStyle={{ padding: SPACING, paddingTop: StatusBar.currentHeight || 42 }}
        renderItem={({ item, index }) => {
          const scaleInputRange = [-1, 0, ITEM_SIZE * index, ITEM_SIZE * (index + 2)]
          const scale = scrollY.interpolate({ inputRange: scaleInputRange, outputRange: [1, 1, 1, 0] })
          const opacityInputRange = [-1, 0, ITEM_SIZE * index, ITEM_SIZE * (index + 0.6)]
          const opacity = scrollY.interpolate({ inputRange: opacityInputRange, outputRange: [1, 1, 1, 0] })
          const rotate = scrollY.interpolate({ inputRange: opacityInputRange, outputRange: ["0deg", "0deg", "0deg", "5deg"] })
          return (
            <Animated.View style={{
              flexDirection: 'row',
              padding: SPACING,
              marginBottom: SPACING,
              borderRadius: 12,
              backgroundColor: 'rgba(255, 255, 255, 1)',
              elevation: 4,
              opacity,
              transform: [{ scale }, { rotate }]
            }}>
              <Image
                source={{ uri: item.image }}
                style={{
                  width: AVATAR_SIZE,
                  height: AVATAR_SIZE,
                  borderRadius: AVATAR_SIZE,
                  marginRight: SPACING / 2
                }}
              />
              <View>
                <Text style={{ fontSize: 22, fontWeight: 'bold' }}>{item.name}</Text>
                <Text style={{ fontSize: 18, opacity: 0.7 }}>{item.jobTitle}</Text>
                <Text style={{ fontSize: 14, opacity: 0.8, color: '#0099cc' }}>{item.email}</Text>
              </View>
            </Animated.View>
          )
        }}
      />
    </View>
  )
}