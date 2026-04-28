import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';

interface CustomCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export default function CustomCard({ children, style }: CustomCardProps) {
  return (
    <View style={[styles.card, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1e1e1e',
    borderRadius: 15,
    padding: 20,
    marginVertical: 10,
    width: '100%',
    // Cienie dla lepszego wyglądu (UI/UX)
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4, // Cień na Androida
  },
});