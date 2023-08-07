import { FC, useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
  TouchableWithoutFeedback,
  TextInput
} from "react-native";
import { useAuthContext } from "../../../context/AuthContext";

const LoginForm: FC<{}> = () => {
  const {login} = useAuthContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const emailRef = useRef<TextInput | null>(null);
  const passRef = useRef<TextInput | null>(null);

  const onLogin = async () => {
    const valid = await login(email, password);
    if(!valid){
      Alert.alert(
        "Login error",
        "Wrong email or password.",
        [{ text: "OK" }],
        { cancelable: true }
      );
    }
  };

  const onPassInputDone = () => Keyboard.dismiss();

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.innerContainer}>
          <Text style={styles.logo}>BonCon</Text>
          <TextInput
            autoCapitalize="none"
            style={styles.input}
            placeholder="Email"
            textContentType="emailAddress"
            placeholderTextColor="grey"
            returnKeyType="next"
            blurOnSubmit={false}
            onChangeText={(email) => setEmail(email)}
            onSubmitEditing={() => passRef.current?.focus()}
            ref={emailRef}
            value={email}
          />
          <TextInput
            style={styles.input}
            textContentType="password"
            secureTextEntry
            clearButtonMode="always"
            placeholder="Password"
            placeholderTextColor="grey"
            returnKeyType="done"
            blurOnSubmit={false}
            onChangeText={(pass) => setPassword(pass)}
            onSubmitEditing={() => onPassInputDone()}
            ref={passRef}
            value={password}
          />
          <TouchableOpacity style={styles.forgot}>
            <Text style={styles.forgot}>Forgot Password?</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.loginBtn} onPress={onLogin}>
            <Text style={styles.loginText}>LOGIN</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  innerContainer: {
    padding: 24,
    alignItems: "center",
  },
  logo: {
    color: "#FF7F50",
    fontWeight: "bold",
    fontSize: 50,
    marginBottom: 40,
  },
  input: {
    height: 50,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 36,
    width: "100%",
  },
  forgot: {
    height: 50,
  },
  registerText: {
    fontSize: 17,
  },
  registerContainer: {
    alignItems: "center",
    marginTop: 10,
  },
  loginText: {
    fontSize: 16,
    fontWeight: "bold",
    paddingHorizontal: 50,
  },
  loginBtn: {
    width: "100%",
    backgroundColor: "lightblue",
    borderRadius: 5,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10,
  },
});

export default LoginForm;
