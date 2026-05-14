import { workoutRepository } from "@/database/repositories/workoutRepository";
import { useNavigation, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CustomCard from '../../components/common/Card';

export default function HomeScreen() {
  const [recentWorkouts, setRecentWorkouts] = useState<any[]>([]);
  const navigation = useNavigation();
  const router = useRouter();

  const loadWorkouts = async () => {
    try {


      if (!workoutRepository) return;

      const today = new Date().toISOString().split('T')[0];
      const data = await workoutRepository.getWorkoutsByDate(today);
      setRecentWorkouts(data || []);
    } catch (error) {
      console.error("error loading", error);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadWorkouts();
    });
    return unsubscribe;
  }, [navigation]);


  useEffect(() => {
    const timer = setTimeout(() => {
      loadWorkouts();
    }, 500);
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>FitApp</Text>
      
      
      <TouchableOpacity 
        activeOpacity={0.7} 
        onPress={() => router.push('/healthDetails')}
      >
        <CustomCard style={styles.profileCard}>
          <View style={styles.row}>
            <View style={styles.avatarSquare}>
              <Text style={{fontSize: 30}}>👤</Text>
            </View>
            <View>
              <Text style={styles.cardTitle}>User Profile</Text>
              <Text style={styles.subtitle}>Jeffrey Epstein</Text>
            </View>
          </View>
        </CustomCard>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Today</Text>
      
      <View style={styles.statsRow}>
        <View style={styles.squareStatCard}>
          <Text style={{fontSize: 24}}>🔥</Text>
          <Text style={styles.statLabel}>Kalorie</Text>
          <Text style={styles.statValue}>420</Text>
        </View>
        
        <View style={styles.squareStatCard}>
          <Text style={{fontSize: 24}}>👟</Text>
          <Text style={styles.statLabel}>Kroki</Text>
          <Text style={styles.statValue}>7532</Text>
        </View>

        <View style={styles.squareStatCard}>
          <Text style={{fontSize: 24}}>💧</Text>
          <Text style={styles.statLabel}>Woda</Text>
          <Text style={styles.statValue}>1.5L</Text>
        </View>
      </View>

      <Text style={[styles.sectionTitle, { marginTop: 25 }]}>Recent Workouts</Text>
      
      {recentWorkouts.length > 0 ? (
        recentWorkouts.map((workout) => (
          <CustomCard key={workout.id} style={styles.workoutCard}>
            <View style={styles.workoutRow}>
              <View>
                <Text style={styles.workoutTitle}>{workout.title || "Trening"}</Text>
                <Text style={styles.workoutTime}>
                    ⏱️ {Math.floor(workout.duration / 60)} min {workout.duration % 60} sek
                </Text>
              </View>
              <Text style={{ fontSize: 20 }}>✅</Text>
            </View>
          </CustomCard>
        ))
      ) : (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>Nothing For Today</Text>
        </View>
      )}

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#121212' },
  header: { fontSize: 24, fontWeight: 'bold', color: '#fff', marginVertical: 20 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#fff', marginBottom: 15 },
  row: { flexDirection: 'row', alignItems: 'center' },
  profileCard: { backgroundColor: '#1e1e1e', borderRadius: 15, padding: 15 },
  avatarSquare: { 
    width: 60, 
    height: 60, 
    backgroundColor: '#333', 
    marginRight: 15, 
    borderRadius: 12, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  cardTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  subtitle: { color: '#aaa', fontSize: 12 },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between' },
  squareStatCard: { 
    backgroundColor: '#1e1e1e', 
    width: '30%', 
    aspectRatio: 1, 
    padding: 10, 
    borderRadius: 15, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  statLabel: { color: '#aaa', fontSize: 10, marginTop: 5 },
  statValue: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  workoutCard: { backgroundColor: '#1e1e1e', marginBottom: 10, borderRadius: 12, padding: 15 },
  workoutRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  workoutTitle: { color: '#4CAF50', fontSize: 16, fontWeight: 'bold' },
  workoutTime: { color: '#aaa', fontSize: 13, marginTop: 4 },
  emptyState: { alignItems: 'center', marginTop: 10 },
  emptyText: { color: '#666', fontStyle: 'italic' }
});