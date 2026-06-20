import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from 'react-native';

const ios = Platform.OS === "ios";

const CustomKeyboardView = ({ children, inChat }) => {
  return (
    <KeyboardAvoidingView
      behavior={ios ? "padding" : "height"}
      keyboardVerticalOffset={inChat ? 90 : 0}
      style={{ flex: 1 }}
    >
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          flexGrow: 1,
        }}
        bounces={false}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default CustomKeyboardView;

const styles = StyleSheet.create({});