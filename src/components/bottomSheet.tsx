import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated,{ useAnimatedStyle, useSharedValue } from 'react-native-reanimated'

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const bottomSheet = () => {
    const translateY = useSharedValue(0.1);

    const context = useSharedValue({ y:0 })

    const gesture = Gesture.Pan()
    .onStart(() => { 
        context.value = { y: translateY.value }
    })
    .onUpdate((event) => {
        translateY.value = event.translationY + context.value.y;
    });


    const rBottomSheetStyle = useAnimatedStyle(() => {
        return {
            transform: [{translateY: translateY.value} ]
        };
    });



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
        top: SCREEN_HEIGHT / 1.5,
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