import { useColorScheme } from "@/hooks/useColorScheme";
import { UserData } from "@/utils/userStorage";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useCallback, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { height, width } = Dimensions.get("screen");
let imageW = width * 1;
let imageH = imageW * 0.9;
if (width > height * 1.2) {
  imageW = width * 1;
  imageH = imageW * 0.2;
} else {
  imageW = width * 1;
  imageH = imageW * 0.9;
}

const data = [
  "https://free-images.com/or/eddb/community_old_man_amateur.jpg",
  "https://free-images.com/or/6d5f/meddac_2015_breast_cancer_72.jpg",
  "https://free-images.com/or/c21e/shanghai_community_life_football.jpg",
  "https://free-images.com/or/b30e/shanghai_community_activities_141684.jpg",
  "https://cdn.dribbble.com/users/3281732/screenshots/11192830/media/7690704fa8f0566d572a085637dd1eee.jpg?compress=1&resize=1200x1200",
  "https://cdn.dribbble.com/users/3281732/screenshots/13130602/media/592ccac0a949b39f058a297fd1faa38e.jpg?compress=1&resize=1200x1200",
  "https://cdn.dribbble.com/users/3281732/screenshots/9165292/media/ccbfbce040e1941972dbc6a378c35e98.jpg?compress=1&resize=1200x1200",
  "https://cdn.dribbble.com/users/3281732/screenshots/11205211/media/44c854b0a6e381340fbefe276e03e8e4.jpg?compress=1&resize=1200x1200",
  "https://cdn.dribbble.com/users/3281732/screenshots/7003560/media/48d5ac3503d204751a2890ba82cc42ad.jpg?compress=1&resize=1200x1200",
  "https://cdn.dribbble.com/users/3281732/screenshots/6727912/samji_illustrator.jpeg?compress=1&resize=1200x1200",
  "https://cdn.dribbble.com/users/3281732/screenshots/13661330/media/1d9d3cd01504fa3f5ae5016e5ec3a313.jpg?compress=1&resize=1200x1200",
];

export default function GetStarted() {
  const router = useRouter();

  const colorScheme = useColorScheme();

  const scrollX = useRef(new Animated.Value(0)).current;
  const [user, setUser] = useState<UserData | null>(null);
  /*
  useEffect(() => {
    (async () => {
      const saved = await AsyncStorage.getItem("user");
      if (saved) {
        setUser(JSON.parse(saved));
      }
    })();
  }, []);*/

  const renderItem = useCallback(
    ({ item }) => (
      <View style={styles.imageContainer}>
        <Image source={{ uri: item }} style={styles.image} />
      </View>
    ),
    []
  );

  return (
    <View style={styles.container2}>
      <StatusBar hidden />
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
              key={index}
              source={{ uri: image }}
              style={[styles.backgroundImage, { opacity, zIndex: 1 }]}
              blurRadius={50}
            />
          );
        })}
      </View>
      <Animated.FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        pagingEnabled
        style={{ zIndex: 1, position: "relative", height: "30%" }} // zIndex needs position
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
      />

      <View style={[styles.container, { marginTop: "-20%", zIndex: 3 }]}>
        <LinearGradient
          colors={[
            "rgba(255, 255, 255, 0)", // 0
            "rgba(255, 255, 255, 0.2)", // 0.5
            "rgba(255, 255, 255, 0.5)", // 0.8
            "rgba(255, 255, 255, 0.8)", // 0.9
            "rgba(255, 255, 255, 1)", // 1
          ]}
          locations={[0, 0.25, 0.5, 0.75, 1]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 0.08 }}
          style={styles.gradient}
        />
        <View
          style={
            (styles.container,
            { width: "100%", marginTop: "0%", alignItems: "center", zIndex: 4 })
          }
        >
          <Text style={styles.title}>Welcome to MyApp!</Text>
          <Text style={styles.subtitle}>Your journey starts here.</Text>
          <TouchableOpacity
            style={styles.registerButton}
            onPress={() => router.replace("/loginpage")}
          >
            <Text style={styles.buttonText}>Get started</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: { width, justifyContent: "center", alignItems: "center" },
  image: {
    width: imageW,
    height: imageH,
    resizeMode: "cover",
    borderRadius: 5,
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  overlap: {
    marginTop: 0, // Adjust this for the desired overlap amount
  },
  backgroundImage: { ...StyleSheet.absoluteFillObject },
  container2: { flex: 1, backgroundColor: "rgba(255, 255, 255, 0)" },
  container: {
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 20,
    height: "70%",
    backgroundColor: "rgba(0, 255, 255, 0)",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: "#666",
    marginBottom: 40,
    textAlign: "center",
  },
  registerButton: {
    backgroundColor: "#459cffff",
    padding: 15,
    borderRadius: 8,
    width: "60%",
    alignItems: "center",
    marginTop: 20,
  },
  button: {
    width: "80%",
    padding: 15,
    backgroundColor: "#007AFF",
    borderRadius: 8,
    marginBottom: 20,
    alignItems: "center",
  },
  outlineButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#007AFF",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  outlineButtonText: {
    color: "#007AFF",
  },
});
