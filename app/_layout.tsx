import { Tabs } from 'expo-router';
import React from 'react';
import { Text } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ 
      tabBarActiveTintColor: '#4CAF50', 
      tabBarStyle: { backgroundColor: '#121212', borderTopWidth: 0 },
      headerShown: false 
    }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: () => <Text style={{fontSize: 20}}>🏠</Text>,
        }}
      />
      
      <Tabs.Screen
        name="training" 
        options={{
          title: 'Trening',
          tabBarIcon: () => <Text style={{fontSize: 20}}>🏋️</Text>,
        }}
      />
      
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profil',
          tabBarIcon: () => <Text style={{fontSize: 20}}>👤</Text>,
        }}
      />
    </Tabs>
  );
}