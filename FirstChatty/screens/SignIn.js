import React, { useState } from "react";
import { Text, View } from "react-native";
import { TextInput, Button, SubHeading } from "react-native-paper";
import firebase from 'firebase/compat/app';
import { useNavigation } from "@react-navigation/native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import 'firebase/compat/auth';


const SignIn = () => {


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [İsLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");


    const navigation = useNavigation();


    const SignIn = async () => {
        setIsLoading(true);
        try {
            await firebase.auth().signInWithEmailAndPassword(email, password);
            navigation.popToTop();
        } catch (e) {
            setIsLoading(false);
            setError(e.message);

        }
    };

    return (
        <View style={{ margin: 16 }}>
            {!!error && (<SubHeading style={{ color: "red", textAlign: "center", marginBottom: 16 }}
            >
                {error}
            </SubHeading>)}


            <TextInput
                label="Email"
                style={{ marginTop: 12 }}
                value={email}
                onChangeText={(text) => setEmail(text)}
            />
            <TextInput
                label="Password"
                style={{ marginTop: 12 }}
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry
            />
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: 'space-between',
                    marginTop: 16,
                }}
            >
                <Button compact onPress={() => navigation.navigate("SignUp")}>
                    SIGN UP
                </Button>
                <Button mode="contained"
                    onPress={() => SignIn()}
                    loading={İsLoading}
                >
                    SIGN IN
                </Button>
            </View>
        </View>
    );
};

export default SignIn;