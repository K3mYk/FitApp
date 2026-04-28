import { StyleSheet, Text, View } from 'react-native';
import CustomCard from '../components/common/Card';

export default function TrainingScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Training 🏋️</Text>
      <CustomCard>
        <Text style={{color: '#fff'}}>Your training.</Text>
      </CustomCard>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#121212' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#fff', marginBottom: 20 }
});