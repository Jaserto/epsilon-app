import React, { useRef, useState } from 'react'
import { Dimensions, View, Text, ScrollView, Platform, StyleSheet, Image, Alert, SafeAreaView, StatusBar, FlatList, TouchableOpacity} from 'react-native';


import 'react-native-get-random-values'
import { OnboardingTypes } from '../utils/models/onBoardingTypes';



const { width, height } = Dimensions.get("window");


export const OnboardingScreen = ({ navigation }: any) => {

    const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0)
    const ref = useRef<null | any>(null)


    const slides:Array<OnboardingTypes> = [
        {
            id:1,
            image: require('../assets/images/pesas.png'),
            title: 'Registra tus entrenamientos',
            subtitle: '¿No sabes si entrenaste? Lleva un diario de tus entrenamientos y consultalos cuando quieras.',
        },
        {
            id:2,
            image: require('../assets/images/bascula.png'),
            title: 'Monitoriza tu progreso',
            subtitle: 'Mide y cuantifica la intensidad y el volumen de tus entrenamientos, lleva tu progreso al siguiente nivel.',
        },
        {
            id:3,
            image: require('../assets/images/reloj.png'),
            title: 'Gestiona tus descansos',
            subtitle: 'Podrás llevar un control de los descansos entre series con el reloj que incorporamos.',
        },

    ]

    const Footer = () => {
        return <View 
        style={{height:height*0.15, justifyContent:'space-between', paddingHorizontal:20}}>
            <View style={{flexDirection:'row', justifyContent:'center', marginTop:20}}>
              {
                slides.map((_, index) => (
                    <View key={index} style={[styles.indicator, currentSlideIndex == index && {
                        backgroundColor:'white', width:25
                    }]} />
                ))
              }
            </View>
        </View>
    }

    const Slide = ({item}:any) => {
        return  <View style={{alignItems:'center',justifyContent:'center',width: width*0.9, marginHorizontal:5 }}>
        <Image source={item.image} style={{height:'55%', width: width*0.5, resizeMode:'contain'}}  resizeMode="cover" />
        <View>
         <Text style={{color:'white', fontSize:19, fontWeight:'bold', marginTop:40}}>{item.title}</Text>
         <Text style={{color:'white', fontSize:15, marginTop:5}}>{item.subtitle}</Text>
        </View>
     </View>
       
    }

    const updateCurrentSlideIndex = (e:any) => {
        const contentOffsetX = e.nativeEvent.contentOffset.x;
        const currentIndex = Math.round(contentOffsetX / width);
        setCurrentSlideIndex(currentIndex)
        console.log(currentIndex)
    }

    const goNextSlide = () => {
        const nextSlideIndex = currentSlideIndex + 1;
       if(nextSlideIndex != slides.length){
        const offset = nextSlideIndex * width -20;
        ref?.current?.scrollToOffset({offset});
        setCurrentSlideIndex(nextSlideIndex)
       }
    }

    const skip = () => {
        const lastSlideIndex = slides.length - 1;
        const offset = lastSlideIndex * width;
        ref?.current?.scrollToOffset({offset});
        setCurrentSlideIndex(lastSlideIndex)

    }

    return (
        <SafeAreaView
          style={{flex:1, backgroundColor:'#111111', padding:15}}>
        <StatusBar backgroundColor="#111111" />
        <FlatList
            ref={ref}
            onMomentumScrollEnd={updateCurrentSlideIndex}
            pagingEnabled
            data={slides}
            contentContainerStyle={{height: '100%'}}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => <Slide item={item} />}
        />
        <Footer />
        <View style={{ marginBottom:15}}>
            {
                currentSlideIndex == slides.length - 1 ?
                (<View style={{height:40}}>
                <TouchableOpacity style={styles.btn} onPress={() => navigation.replace('InicioScreen')}>
                         <Text style={{fontSize:17, color:'#333333'}}>Empieza ya</Text>
                </TouchableOpacity>
                </View>) : (
                         <View style={{flexDirection:'row'}}>    
                         <TouchableOpacity style={styles.btn} onPress={skip}>
                             <Text style={{fontSize:17, color:'#333333'}}>Saltar</Text>
                         </TouchableOpacity>
                         <View style={{width:15}} />
                         <TouchableOpacity style={styles.btn} onPress={goNextSlide}>
                             <Text style={{fontSize:17, color:'#333333'}}>Siguiente</Text>
                         </TouchableOpacity>
                     </View>
                )
            }
        </View>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    view: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#111111',
        height: height,
        width: width,
        padding: 15
    },
    indicator: {
        height:2.5,
        width: 10,
        backgroundColor: 'grey',
        marginHorizontal:3,
        borderRadius:2
    },
    text: {
        fontSize: 15,
        color: 'white',
        marginBottom: 10
    },
    btn: {
        flex:1,
        height:40,
        borderRadius:5,
        backgroundColor:'white',
        alignItems:'center',
        justifyContent:'center'
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5fcff"
    }


})