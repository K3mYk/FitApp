import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
}

export default function CustomButton({ title, onPress }: CustomButtonProps) {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#4400ff", 
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginVertical: 8,
    width: '100%',
  },
  text: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});