import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect } from 'react'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated,{ Extrapolate, interpolate, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated'

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const MAX_TRANSLATE_Y = -SCREEN_HEIGHT + 50

const bottomSheet = () => {
    const translateY = useSharedValue(0);

    const scrollTo = useCallback((destination:number) => {
        "worklet"
        translateY.value = withSpring(destination, {damping:30 });
    }, [])

    const context = useSharedValue({ y:0 })

    const gesture = Gesture.Pan()
    .onStart(() => { 
        context.value = { y: translateY.value }
    })
    .onUpdate((event) => {
        translateY.value = event.translationY + context.value.y;
        translateY.value = Math.max(translateY.value, MAX_TRANSLATE_Y)
    })
    .onEnd(() => {
        if(translateY.value > -SCREEN_HEIGHT / 3) {
            scrollTo(0)
        } else if(translateY.value > -SCREEN_HEIGHT / 1.5) {
            scrollTo(MAX_TRANSLATE_Y)
        }
    })


    const rBottomSheetStyle = useAnimatedStyle(() => {

        const borderRadius = interpolate(
            translateY.value,
             [MAX_TRANSLATE_Y + 50, MAX_TRANSLATE_Y],
             [25, 5],
             Extrapolate.CLAMP
             );


        return {
            borderRadius,
            transform: [{translateY: translateY.value} ]
        };
    });


    useEffect(() => {
        scrollTo(-SCREEN_HEIGHT/3)
    },[])

  return (
    <GestureDetector gesture={gesture}>
    <Animated.View style={[styles.bottomSheetContainer, rBottomSheetStyle]}>
        <View style={styles.line}/>
    </Animated.View>
    </GestureDetector>
  )
}

export default bottomSheet

const styles = StyleSheet.create({
    bottomSheetContainer: {
        height: SCREEN_HEIGHT,
        width: '100%',
        backgroundColor:'white',
        position: 'absolute',
        top: SCREEN_HEIGHT,
        borderRadius:25
    },
    line: {
        width: 75,
        height: 4,
        backgroundColor:'grey',
        alignSelf: 'center',
        marginVertical: 15,
        borderRadius: 2,
    }
})