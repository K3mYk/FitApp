import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import CustomButton from '../components/common/Button';
import CustomCard from '../components/common/Card';
import CustomInput from '../components/common/Input';

export default function ProfileScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Profile settings</Text>
      
      <CustomCard style={styles.formCard}>
        <CustomInput label="Body weight (kg)" value="" onChangeText={() => {}} keyboardType="numeric" placeholder="00" />
        <CustomInput label="height (cm)" value="" onChangeText={() => {}} keyboardType="numeric" placeholder="000" />
        <CustomInput label="Age" value="" onChangeText={() => {}} keyboardType="numeric" placeholder="00" />
        <CustomInput label="Gender" value="" onChangeText={() => {}} placeholder="Man/Woman/combat helicopter"/>
        
        <View style={{ marginTop: 20 }}>
          <CustomButton title="Save Data" onPress={() => {}} />
        </View>
      </CustomCard>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, backgroundColor: '#121212' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#fff', marginBottom: 20 },
  formCard: { backgroundColor: '#1e1e1e', borderWidth: 0 }
});