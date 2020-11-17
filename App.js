import React, { useState } from "react";
import { StyleSheet, View, Button, FlatList } from "react-native";
import GoalItem from "./components/GoalItem";
import GoalInput from "./components/GoalInput";

export default function App() {
  const [courseGoals, setCourseGoals] = useState([]);
  const [isAddMode, setIsAddMode] = useState(false);

  console.log("Renderizando componente");
  console.log(courseGoals);

  const addGoalHandler = (goalTitle) => {
    if (goalTitle.length === 0) {
      return;
    }
    setCourseGoals((currentGoal) => [...currentGoal, { id: Math.random().toString(), value: goalTitle }]);
    setIsAddMode(false);
  };

  const removeGoalHandler = (goalId) => {
    console.log("Id a borrar: ", goalId);
    setCourseGoals((currentGoal) => {
      return currentGoal.filter((goal) => goal.id !== goalId);
    });
  };

  const cancelGoalMode = () => {
    setIsAddMode(false);
  };

  return (
    <View style={styles.screen}>
      <Button title="Agregar nueva meta" onPress={() => setIsAddMode(true)} />
      <GoalInput visible={isAddMode} onAddGoal={addGoalHandler} onCancel={cancelGoalMode} />
      <FlatList
        keyExtractor={(item, index) => item.id}
        data={courseGoals}
        renderItem={(itemData) => (
          <GoalItem title={itemData.item.value} id={itemData.item.id} onDelete={removeGoalHandler} />
        )}
      ></FlatList>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 50,
  },
});
