import { ScrollView, StyleSheet, Text, View } from 'react-native';
import CustomCard from '../../components/common/Card';

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>FitApp</Text>
      
      <CustomCard style={styles.profileCard}>
        <View style={styles.row}>
          <View style={styles.avatarSquare}><Text style={{fontSize: 30}}>👤</Text></View>
          <View>
            <Text style={styles.cardTitle}>User Profile</Text>
            <Text style={styles.subtitle}>Jeffrey Epstein</Text>
          </View>
        </View>
      </CustomCard>

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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#121212' },
  header: { fontSize: 24, fontWeight: 'bold', color: '#fff', marginVertical: 20 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#fff', marginBottom: 15 },
  row: { flexDirection: 'row', alignItems: 'center' },
  profileCard: { backgroundColor: '#1e1e1e', borderRadius: 15 },
  avatarSquare: { width: 60, height: 60, backgroundColor: '#333', marginRight: 15, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
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
  statValue: { color: '#fff', fontSize: 16, fontWeight: 'bold' }
});