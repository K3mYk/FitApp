import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

interface CustomInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  keyboardType?: 'default' | 'numeric';
}

export default function CustomInput({ label, value, onChangeText, placeholder, keyboardType }: CustomInputProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        keyboardType={keyboardType}
        placeholderTextColor="#999"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginVertical: 10, width: '100%' },
  label: { fontSize: 14, fontWeight: '700', marginBottom: 8, color: '#FFF' },
  input: {
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#2A2A2A',
    color: '#FFF'
  },
});