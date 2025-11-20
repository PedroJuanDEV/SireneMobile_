import { useRouter } from 'expo-router'; // 🎯 Novo Import do Expo Router
import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, Image, StyleSheet, View } from 'react-native';

const { height } = Dimensions.get('window');

const primaryColor = '#550D08'; 
// Ajustando o caminho da imagem, se necessário. Se o arquivo está em 'app/', 
// o caminho para 'assets/images' na raiz é '..'.
const logoSource = require('../../assets/images/LogoSirene.png');

const LoadingDots = () => {
  const dotAnims = useRef([
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
  ]).current;

  useEffect(() => {
    const sequence = Animated.sequence([
      Animated.delay(100),
      Animated.stagger(250, dotAnims.map(anim => Animated.timing(anim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }))),
      Animated.stagger(250, dotAnims.slice().reverse().map(anim => Animated.timing(anim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }))),
    ]);

    Animated.loop(sequence).start();
  }, [dotAnims]);

  return (
    <View style={styles.dotContainer}>
      {dotAnims.map((anim, index) => (
        <Animated.View
          key={index}
          style={[
            styles.dot,
            { opacity: anim.interpolate({
              inputRange: [0, 1],
              outputRange: [0.3, 1], 
            })}
          ]}
        />
      ))}
    </View>
  );
};

const SplashScreen = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current; 
  // 🎯 SUBSTITUIÇÃO: usando useRouter do Expo Router
  const router = useRouter();

  useEffect(() => {
    
    Animated.timing(fadeAnim, {
      toValue: 1, 
      duration: 1500, 
      useNativeDriver: true,
    }).start();

    // Lógica para navegação após 3 segundos (simulando o carregamento)
    const timer = setTimeout(() => {
      // 🎯 NAVEGAÇÃO: usando router.replace para ir para a tela 'Login'
      router.replace('Login');
    }, 3000); 

    // Limpeza do timer
    return () => clearTimeout(timer);
  }, [fadeAnim, router]); // Adicione 'router' como dependência para boas práticas

  return (
    <View style={styles.container}>
      <Animated.View style={{ opacity: fadeAnim }}>
        <Image 
          source={logoSource} 
          style={styles.logo} 
          resizeMode="contain"
        />
      </Animated.View>
      
      <LoadingDots />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: primaryColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: height * 0.25, 
    height: height * 0.25,
    alignSelf: 'center',
  },
  dotContainer: {
    position: 'absolute',
    bottom: 30,
    flexDirection: 'row',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 4,
  },
});

export default SplashScreen; // Certifique-se de que o nome do arquivo TSX é 'Carregamento.tsx'