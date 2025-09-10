import { LinearGradient } from "expo-linear-gradient";
import React, { useRef, useCallback } from "react";
import { View, Image, Animated, Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("screen");

type ImageCarouselProps = {
  data: string[];
};

export default function ImageCarousel({ data }: ImageCarouselProps) {
  const scrollX = useRef(new Animated.Value(0)).current;

  const renderItem = useCallback(
    ({ item }: { item: string }) => (
      <View style={styles.imageWrapper}>
        <Image source={{ uri: item }} style={styles.image} />
      </View>
    ),
    []
  );

  return (
    <View style={styles.container}>
      {/* Blurred Background */}
      <View style={StyleSheet.absoluteFillObject}>
        {data.map((image, index) => {
          const opacity = scrollX.interpolate({
            inputRange: [
              (index - 1) * width,
              index * width,
              (index + 1) * width,
            ],
            outputRange: [0, 1, 0],
          });
          return (
            <Animated.Image
              key={`bg-${index}`}
              source={{ uri: image }}
              style={[StyleSheet.absoluteFillObject, { opacity }]}
              blurRadius={40}
            />
          );
        })}
      </View>

      {/* Foreground Carousel */}
      <View>
        <Animated.FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(_, index) => index.toString()}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: true }
          )}
        />
      </View>
      {/* --- Bottom Gradient --- */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 0,
  },
  imageWrapper: {
    width: width,
    alignItems: "center",
  },
  image: {
    width: width,
    height: height * 0.5,
    resizeMode: "cover",
    borderRadius: 16,
  },
  gradientTop: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "50%", // Occupies the top half to make the gradient visible
    zIndex: 1, // Ensure it's above the image
  },
  gradientBottom: {
    position: "absolute",
    width: width,
    height: height * 0.9,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
});
