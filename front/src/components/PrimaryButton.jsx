import { Pressable, StyleSheet, Text } from "react-native";

export default function PrimaryButton({ text, onPress }) {
  return (
    <Pressable onPress={onPress} style={styles.button}>
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
		borderWidth: 1,
		borderColor: "black",
    backgroundColor: "grey",
    paddingHorizontal: 10,
    paddingVertical: 5,
		borderRadius: 5
  },
  text: {
    color: "white",
  },
});
