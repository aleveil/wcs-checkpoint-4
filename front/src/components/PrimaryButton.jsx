import { Pressable, StyleSheet, Text } from "react-native";

export default function PrimaryButton({ text, onPress, disable = false }) {
  const getBackgroundColor = () => {
    return disable ? "grey" : "#2AF";
  };

  return (
    <Pressable
      onPress={disable ? () => {} : onPress}
      style={{ ...styles.button, backgroundColor: getBackgroundColor() }}
    >
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
    minWidth: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "white",
  },
});
