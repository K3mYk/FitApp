import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import CustomButton from '../../components/common/Button';
import CustomCard from '../../components/common/Card';
import CustomInput from '../../components/common/Input';
import { handleFormSubmit } from '../../services/handleProfileForm';

export default function ProfileScreen() {
  const [form, setForm] = useState({
    weight: '',
    height: '',
    age: '',
    gender: '',
    neck: '',
    waist: '',
    hips: '',
  });

  const handleInputChange = (field: keyof typeof form, value: string) => {
    setForm((prevForm) => ({ ...prevForm, [field]: value }));
  };

  const handleSave = () => {
    handleFormSubmit(form);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Profile settings</Text>
      
      <CustomCard style={styles.formCard}>
        <CustomInput
          label="Body weight (kg)"
          value={form.weight}
          onChangeText={(value) => handleInputChange('weight', value)}
          keyboardType="numeric"
          placeholder="00"
        />
        <CustomInput
          label="Height (cm)"
          value={form.height}
          onChangeText={(value) => handleInputChange('height', value)}
          keyboardType="numeric"
          placeholder="000"
        />
        <CustomInput
          label="Age"
          value={form.age}
          onChangeText={(value) => handleInputChange('age', value)}
          keyboardType="numeric"
          placeholder="00"
        />
        <CustomInput
          label="Gender"
          value={form.gender}
          onChangeText={(value) => handleInputChange('gender', value)}
          placeholder="Man/Woman"
        />
        <CustomInput
          label="Neck circumference (cm)"
          value={form.neck}
          onChangeText={(value) => handleInputChange('neck', value)}
          keyboardType="numeric"
          placeholder="00"
        />
        <CustomInput
          label="Waist circumference (cm)"
          value={form.waist}
          onChangeText={(value) => handleInputChange('waist', value)}
          keyboardType="numeric"
          placeholder="00"
        />
        <CustomInput
          label="Hips circumference (cm)"
          value={form.hips}
          onChangeText={(value) => handleInputChange('hips', value)}
          keyboardType="numeric"
          placeholder="00"
        />
        
        <View style={{ marginTop: 20 }}>
          <CustomButton title="Save Data" onPress={handleSave} />
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