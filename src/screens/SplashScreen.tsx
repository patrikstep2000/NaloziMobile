import { StyleSheet, Text } from "react-native";
import Animated, { useAnimatedStyle, withRepeat, withSequence, withTiming } from "react-native-reanimated";

const SplashScreen = () => {
    const glowAnimation = useAnimatedStyle(() => ({
        transform: [
            {
                scale: withRepeat(
                    withSequence(
                        withTiming(1.2, { duration: 1500 }),
                        withTiming(1.6, { duration: 1500 })
                    ),
                    -1,
                    true
                ),
            },
        ],
    }));

    return(
        <Animated.View style={[styles.container, glowAnimation]}>
            <Text style={styles.text}>Nalozi app</Text>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    container:{
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 8,
        bottom: 0,
        left: 0,
        right: 4,
    },
    text:{
        fontSize:40,
        color: "#FF7F50"
    }
})

export default SplashScreen