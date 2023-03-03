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

  async function handleCallNotification(){
    const { status } = await Notifications.getPermissionsAsync()
    if(status != 'granted'){
      Alert.alert('Voce nao tem permissao para notifications.')
      return;
    }
    let token = (await Notifications.getExpoPushTokenAsync()).data
    console.log(token)

    await Notifications.scheduleNotificationAsync()
  }

  return (
    <View style={styles.container}>
      <Text>Edu.</Text>
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
