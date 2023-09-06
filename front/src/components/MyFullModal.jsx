import { Modal, StyleSheet, View } from "react-native";

export default function MyFullModal({ children, visible, onRequestClose }) {
  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={visible}
      onRequestClose={onRequestClose}
    >
      <View style={styles.centeredView}>{children}</View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
});
