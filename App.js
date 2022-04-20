import React, { useState } from 'react';
import { Platform, Text, View, StyleSheet, Button } from 'react-native';
import * as Location from 'expo-location';

export default function App() {
  const [location1, setLocation1] = useState({ "coords": { "latitude": "0", "longitude": "0" } });
  const [location2, setLocation2] = useState({ "coords": { "latitude": "0", "longitude": "0" } });
  const [errorMsg, setErrorMsg] = useState(null);

  const searchLoc1 = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }
    let location = await Location.getCurrentPositionAsync({});
    setLocation1(location);
  }

  const searchLoc2 = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }
    let location = await Location.getCurrentPositionAsync({});
    console.log(location);
    setLocation2(location);
  }

  const getDistancia = (lat1, lon1, lat2, lon2) => {
    const rad = (x) => { return x * Math.PI / 180; }
    var R = 6378.137; //Radio de la tierra en km
    var dLat = rad(lat2 - lat1);
    var dLong = rad(lon2 - lon1);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLong / 2) * Math.sin(dLong / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d * 1000 //Retorna distacia en metros
  }


  return (
    <View style={[styles.container, { flexDirection: "column" }]}>
      <View style={{ flex: .8, width: '100%'}}>
        <Text style={styles.title}>LOCALIZACION</Text>
      </View>
      <View style={{ flex: 2, width: '100%' }}>
        <Text style={styles.subTittle}>PRIMERA UBICACION</Text>
        <View style={[styles.container, styles.row, { flexDirection: "row" }]}>
          <Text style={styles.labbel}>Latitud</Text>
          <Text style={styles.number}>{location1.coords.latitude}</Text>
        </View>
        <View style={[styles.container, styles.row, { flexDirection: "row" }]}>
          <Text style={styles.labbel}>Longitud</Text>
          <Text style={styles.number}>{location1.coords.longitude}</Text>
        </View>
      </View>
      <View style={{ flex: 2, width: '100%' }}>
        <Text style={styles.subTittle}>SEGUNDA UBICACION</Text>
        <View style={[styles.container, styles.row, { flexDirection: "row" }]}>
          <Text style={styles.labbel}>Latitud</Text>
          <Text style={styles.number}>{location2.coords.latitude}</Text>
        </View>
        <View style={[styles.container, styles.row, { flexDirection: "row" }]}>
          <Text style={styles.labbel}>Longitud</Text>
          <Text style={styles.number}>{location2.coords.longitude}</Text>
        </View>
      </View>
      <View style={{ flex: 2, width: '100%'}}>
        <View style={[styles.container, styles.row, { flexDirection: "row" }]}>
          <Button
            onPress={searchLoc1}
            title="ubicacion 1"
            color="black"
            accessibilityLabel="Boton para obtener la primera ubicación"
          />
          <Button
            onPress={searchLoc2}
            title="ubicacion 2"
            color="black"
            accessibilityLabel="Boton para obtener la segunda ubicación"
          />
        </View>
      </View>
      <Text style={styles.paragraph}>Distancia: {getDistancia(location1.coords.latitude, location1.coords.longitude, location2.coords.latitude, location2.coords.longitude)} Metros</Text>
    </View>



  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  paragraph: {
    fontFamily: 'Cochin',
    fontSize: 18,
    textAlign: 'center',
  },
  title: {
    fontFamily: 'Cochin',
    fontWeight: "bold",
    fontSize: 28,
    textAlign: 'center',
    paddingTop: 20,
  },
  subTittle: {
    fontFamily: 'Cochin',
    fontSize: 18,
    textAlign: 'center',
    paddingTop: 20,
  },
  row:{
    justifyContent: "space-around"
  },
  labbel:{
    fontSize: 14,
    fontFamily: 'Cochin',
    width: '25%',
    textAlign: 'center',
  },
  number:{
    width: '35%',
    textAlign: 'center',
    borderBottomColor: "gray",
    borderBottomWidth: 1,
  }
});