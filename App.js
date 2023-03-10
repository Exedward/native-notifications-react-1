import React, { useState, useEffect, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Button, Alert } from 'react-native';
import * as Notifications from 'expo-notifications'

Notifications.setNotificationHandler({
  handleNotification:  async () => ({
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowAlert: true,
  })
})

export default function App() {

  const [tokenPush, setTokenPush] = useState<string>('')
  const [notificationTitle, setNotificationTitle] = useState('')
  const notificationsReceivedRef = useRef()
  const notificationsResponseRef = useRef()

  useEffect(() => {
    handleTokenPushNotification()
    notificationsReceivedRef.current = Notifications.addNotificationReceivedListener(notification => {
      setNotificationTitle(notification.request.content.title || '') //console.log('Received: ', notification)
    })
    notificationsResponseRef.current = Notifications.addNotificationResponseReceivedListener(notification => {
      setNotificationTitle(notification.notification.request.content.title || '') //console.log('Response: ', notification)
    })
  }, [])

  const handleTokenPushNotification = async () => {
    const { status } = await Notifications.getPermissionsAsync()
    if(status != 'granted'){
      Alert.alert('Voce nao tem permissao para notifications.')
      return;
    }
    let token = (await Notifications.getExpoPushTokenAsync()).data
    setTokenPush(token)
  }

  async function handleCallNotification(){
    await Notifications.scheduleNotificationAsync({
      content:{
        title: 'Aviso',
        body: 'Ó sistema está ok.',
        data:{},
      },
      trigger:{
        seconds: 4,
      }
    })
  }

  return (
    <View style={styles.container}>
      <Text>Token: {tokenPush}</Text>
      <Text>Title: {notificationTitle}</Text>
      <Button title='Chamar Notifications' onPress={handleCallNotification}/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  st1:{
    flex: 1, 
  }
});
