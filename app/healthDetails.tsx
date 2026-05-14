import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';


import { handleFitScoreCalculation } from '../services/fitnessScoreService';

export default function HealthDetailsScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState<number | null>(null);

  useEffect(() => {
    async function runLogic() {
      try {
        // 
        //  musisz pobrać wzrost i wagę z bazy danych
        //  przykładowe dane  80kg 180cm bo bład to do zmiany narazie jest byle jak 
        const score = await handleFitScoreCalculation(80, 180);
        setResult(score);
      } catch (error) {
        console.error("error:", error);
      } finally {
        setLoading(false);
      }
    }

    runLogic();
  }, []);



// tutaj se mozesz mozesz ogaranc to logike i jak to ma wygladac narazie zostawaim to tak bo nie mam pomyslu sie 
// cos wymysli w trakcie jak bedziesz to robil 
// jak ci sie bedzie chcialo to mozesz wziac jakis normalny gauge i zrobic jeszcze animacje tego bo narazie to jest losowy png z neta 
// przerobiony w paincie    



  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
        <Text style={styles.backText}>← Back to App</Text>
      </TouchableOpacity>

      <Text style={styles.header}>Your FitScore</Text>

      <View style={styles.card}>
        {loading ? (
          <ActivityIndicator size="large" color="#fff" />
        ) : (
          <>
            <Image 
              source={require('../assets/images/gauge.png')} 
              style={styles.gauge} 
            />
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212', padding: 20 },
  backBtn: { marginTop: 40, marginBottom: 20 },
  backText: { color: '#fff', fontSize: 16 },
  header: { color: '#fff', fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginBottom: 30 },
  card: { 
    backgroundColor: '#1e1e1e', 
    borderRadius: 20, 
    padding: 30, 
    alignItems: 'center', 
    borderWidth: 1, 
    borderColor: '#fff', 
    minHeight: 350, 
    justifyContent: 'center' 
  },
  gauge: { width: 300, height: 180, resizeMode: 'contain' },
  logicContainer: { marginTop: 30, alignItems: 'center', width: '100%' },
  logicTitle: { color: '#4CAF50', fontSize: 12, fontWeight: 'bold', marginBottom: 10 },
  scoreValue: { color: '#fff', fontSize: 40, fontWeight: 'bold' },
  infoText: { color: '#aaa', textAlign: 'center', marginTop: 10 }
});