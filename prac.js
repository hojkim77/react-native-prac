import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ScrollView, Dimensions,ActivityIndicator, Linking } from 'react-native';
const {width:SCREEN_WIDTH} = Dimensions.get("window");
const API_KEY = "e862b7b1a840ae3919413a67d1fa2be9";

export default function App() {
  const [city, setCity] = useState("loading...");
  const [days, setDays] = useState([]);
  const [ok, setOk] = useState(true);
  const ask = async() => {
    const {granted} = await Location.requestForegroundPermissionsAsync();
    if (!granted){
      setOk(false);
    }
    const {coords:{latitude, longitude}} = await Location.getCurrentPositionAsync({accuracy:5});
    const location = await Location.reverseGeocodeAsync({latitude,longitude}, {useGoogleMaps : false});
    setCity(location[0].city);
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`);
    const json = await response.json();
    //console.log(json);
    setDays([json]);
    console.log(days[0]);
  };
  useEffect(() => {
    ask();
  },[]);
  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityname}>{city}</Text>
      </View>
      <ScrollView 
      pagingEnabled 
      horizontal 
      showsHorizontalScrollIndicator ={false}
      contentContainerStyle={styles.weather}>
      {days[0] === null ? (<View style={styles.day}><ActivityIndicator color="black" style={{marginTop:30}} /></View>) :
      (days.map((day, index) =>  
        <View key = {index} style={styles.day}>
          <Text style ={styles.description}>{day.coord.lat}</Text>
          <Text style ={styles.description}>{day.coord.lon}</Text>
        </View>
        ))
      }

        
      </ScrollView>
    </View>
  );
}

const styles =StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"white"
  },
  city:{
    flex:1,
    backgroundColor:"yellow",
    justifyContent:"center",
    alignItems:"center"
  },
  cityname:{
    fontSize:68,
    fontWeight:"500"
  },
  weather:{
    backgroundColor:"orange"
  },
  day:{
    width:SCREEN_WIDTH,
    flex:1,
    backgroundColor:"white",
    alignItems:"center"
  },
  temp:{
    marginTop:50,
    fontSize:178,

  },
  description:{
    fontSize:58,
  }
  
})