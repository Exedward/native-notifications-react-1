import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
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
    if(status){
      
    }
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
