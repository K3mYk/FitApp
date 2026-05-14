import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Button from '../../components/common/Button';
import type { ExerciseEntry } from '../../services/trainingService';
import { trainingService } from '../../services/trainingService';

export default function TrainingScreen() {
  const [stage, setStage] = useState<'FORM' | 'ACTIVE'>('FORM');
  const [category, setCategory] = useState('Strength');
  const [exercises, setExercises] = useState<ExerciseEntry[]>([{ name: '', sets: '', reps: '' }]);
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    let interval: any;
    if (isTimerRunning && !isPaused) {
      interval = setInterval(() => setTimer(prev => prev + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, isPaused]);

  const handleStartOneTime = () => {
    if (!exercises[0].name) return Alert.alert("Error", "Add an exercise first!");
    trainingService.logStep(0, "Starting one-time workout.");
    setStage('ACTIVE');
    setCurrentIndex(0);
    setTimer(0);
    setIsTimerRunning(true);
    setIsPaused(false);
  };
// to jest z chata bo tu jakies cyrki sa i ten typescript sra sie huj wie o co wlasciwie moze ty to ogarniesz
  const handleSaveTemplate = () => {
  if (!exercises[0].name) return Alert.alert("Error", "Nothing to save.");
  
  Alert.prompt(
    "Template Name",
    "Name your routine:",
    [
      { 
        text: "Cancel", 
        style: "cancel" 
      },
      { 
        text: "Save", 
        onPress: (name?: string) => {
        
          const finalName = name || "My Plan";
          trainingService.saveAsTemplate(finalName, category, exercises);
        }
      }
    ]
  );
};
  const finishExercise = () => {
    const updated = [...exercises];
    updated[currentIndex].duration = timer;
    setExercises(updated);
    
    if (currentIndex < exercises.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setTimer(0);
      setIsPaused(false);
    } else {
      finalizeWorkout(updated);
    }
  };

  const finalizeWorkout = async (finalData: ExerciseEntry[]) => {
    setIsTimerRunning(false);
    const total = finalData.reduce((acc, curr) => acc + (curr.duration || 0), 0);
    await trainingService.saveFinishedWorkout(category, finalData, total);
    Alert.alert("Success", "Workout finished!");
    setStage('FORM');
    setExercises([{ name: '', sets: '', reps: '' }]);
  };

  if (stage === 'ACTIVE') {
    const currentEx = exercises[currentIndex];
    return (
      <View style={styles.container}>
        <Text style={styles.header}>{category}</Text>
        <View style={styles.activeCard}>
          <Text style={[styles.timerText, isPaused && { color: '#FFA500' }]}>{timer}s</Text>
          <Text style={styles.exerciseNameText}>{currentEx.name}</Text>
          <Text style={styles.exerciseInfoText}>{currentEx.sets} sets x {currentEx.reps} reps</Text>
          <View style={styles.buttonRow}>
            <TouchableOpacity 
              style={[styles.actionBtn, { borderColor: isPaused ? '#4CAF50' : '#FFA500' }]} 
              onPress={() => setIsPaused(!isPaused)}
            >
              <Text style={[styles.btnText, { color: isPaused ? '#4CAF50' : '#FFA500' }]}>{isPaused ? "RESUME" : "PAUSE"}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionBtn, { borderColor: '#fff' }]} onPress={finishExercise}>
              <Text style={styles.btnText}>{currentIndex === exercises.length - 1 ? "FINISH" : "NEXT"}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Workout Hub</Text>
      <View style={styles.formContainer}>
        <Text style={styles.label}>Category:</Text>
        <TextInput 
            style={styles.input} 
            value={category} 
            onChangeText={setCategory} 
            placeholderTextColor="#fff" 
        />
        
        <Text style={styles.label}>Exercises:</Text>
        {exercises.map((ex, idx) => (
          <View key={idx} style={styles.row}>
            <TextInput 
              style={[styles.input, { flex: 2 }]} 
              placeholder="Exercise Name" 
              placeholderTextColor="#fff"
              value={ex.name}
              onChangeText={(t) => { const n = [...exercises]; n[idx].name = t; setExercises(n); }}
            />
            <TextInput 
              style={[styles.input, { flex: 1 }]} 
              placeholder="Sets" 
              placeholderTextColor="#fff"
              keyboardType="numeric"
              value={ex.sets}
              onChangeText={(t) => { const n = [...exercises]; n[idx].sets = t; setExercises(n); }}
            />
            <TextInput 
              style={[styles.input, { flex: 1 }]} 
              placeholder="Reps" 
              placeholderTextColor="#fff"
              keyboardType="numeric"
              value={ex.reps}
              onChangeText={(t) => { const n = [...exercises]; n[idx].reps = t; setExercises(n); }}
            />
          </View>
        ))}

        <TouchableOpacity onPress={() => setExercises([...exercises, { name: '', sets: '', reps: '' }])} style={styles.addBtn}>
          <Text style={{color: '#fff', fontWeight: 'bold'}}>+ ADD NEXT EXERCISE</Text>
        </TouchableOpacity>

        <Button title="START ONE-TIME WORKOUT" onPress={handleStartOneTime} />
        
        <TouchableOpacity style={styles.templateLink} onPress={handleSaveTemplate}>
          <Text style={styles.templateLinkText}>💾 SAVE THIS PLAN AS TEMPLATE</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#121212' },
  header: { fontSize: 28, fontWeight: 'bold', color: '#fff', marginVertical: 30, textAlign: 'center' },
  label: { color: '#fff', marginBottom: 5, fontWeight: 'bold' },
  input: { 
    backgroundColor: '#1e1e1e', 
    color: '#fff', 
    padding: 12, 
    borderRadius: 10, 
    marginBottom: 10, 
    marginRight: 5, 
    borderWidth: 1, 
    borderColor: '#fff' 
  },




  row: { flexDirection: 'row' },
  addBtn: { padding: 15, alignItems: 'center', marginBottom: 20, borderWidth: 1, borderColor: '#fff', borderStyle: 'dashed', borderRadius: 10 },
  templateLink: { marginTop: 25, alignItems: 'center' },
  templateLinkText: { color: '#4CAF50', fontWeight: 'bold', fontSize: 14 },
  activeCard: { padding: 20, borderWidth: 1, borderColor: '#fff', borderRadius: 15, backgroundColor: '#1e1e1e' },
  timerText: { fontSize: 60, color: '#fff', fontWeight: 'bold', textAlign: 'center', marginVertical: 20 },
  exerciseNameText: { fontSize: 24, color: '#fff', textAlign: 'center', fontWeight: 'bold' },
  exerciseInfoText: { fontSize: 16, color: '#aaa', textAlign: 'center', marginBottom: 30 },
  buttonRow: { flexDirection: 'row', justifyContent: 'space-between' },
  actionBtn: { flex: 0.48, padding: 15, borderRadius: 10, alignItems: 'center', borderWidth: 1 },
  btnText: { color: '#fff', fontWeight: 'bold' },
  formContainer: { paddingBottom: 50 }
});