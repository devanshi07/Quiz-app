import { useNavigation } from "@react-navigation/native";
import { Image, ImageBackground, Pressable, Text, View, TextInput } from "react-native";
import { externalStyles } from "../common/styles";
import images from "../assets/images";
import { colors } from "../common/color";
import { CustomConsole, alertDialogDisplay, progressView } from "../common/utils";
import { LOGIN } from "../common/webUtils";
import { useState } from "react";
import { AVATAR, DESIGNATION, DESIGNATION_ID, EMAIL, FCM_TOKEN, PHONE, ROLE, TOKEN, USER_ID, USER_NAME, getSession, saveSession } from "../common/LocalStorage";
import { APP_NAME } from "../common/string";

export default function LoginScreen({ navigation }) {

    const [loading, setLoading] = useState(false);
    // const [unique_id, setUniqueId] = useState("4H2sEm");
    // const [password, setPassword] = useState("12345");
    const [unique_id, setUniqueId] = useState("");
    const [password, setPassword] = useState("");
    const [show_password, setShowPassword] = useState("");
    const [fcm_token, setFcmToken] = useState("");

    // login api call   
    async function onSubmit() {
        try {
            if (unique_id.trim().length == 0) {
                alertDialogDisplay(APP_NAME, "Please your unique id");
            }
            else if (password.trim().length == 0) {
                alertDialogDisplay(APP_NAME, "Please your password");
            }
            else {
                setLoading(true);
                const fcm_token = await getSession(FCM_TOKEN);

                const formdata = new FormData();
                formdata.append("unique_id", unique_id);
                formdata.append("password", password);
                formdata.append("fcm_token", fcm_token);

                const requestOptions = {
                    method: "POST",
                    body: formdata,
                    redirect: "follow"
                };

                CustomConsole(LOGIN + "\n");
                CustomConsole(formdata);

                fetch(LOGIN, requestOptions)
                    .then((response) => response.json())
                    .then((json) => {
                        CustomConsole(json);

                        if (json.status == 1) {
                            // success response
                            saveSession(TOKEN, json.data.token);
                            saveSession(USER_ID, json.data.user_id.toString());
                            saveSession(USER_NAME, json.data.user_name);
                            saveSession(EMAIL, json.data.user_email);
                            saveSession(PHONE, json.data.user_phone);
                            saveSession(AVATAR, json.data.avatar);
                            saveSession(ROLE, json.data.role);
                            saveSession(FCM_TOKEN, json.data.fcm_token);
                            saveSession(DESIGNATION, json.data.designation);
                            saveSession(DESIGNATION_ID, json.data.designation_id.toString());
                            navigation.navigate("HomeScreen");
                            navigation.reset({
                                index: 0,
                                routes: [{ name: 'HomeScreen' }]
                            });
                            setLoading(false);

                        }
                        else {
                            // other reponse status
                            setLoading(false);
                        }

                    })
                    .catch((error) => {
                        setLoading(false);
                        CustomConsole("Login Api Error: " + error);
                    });

            }

        } catch (error) {
            setLoading(false);
            CustomConsole("Login Api Exception: " + error);
        }
    }

    return (
        <View style={externalStyles.container}>
            {loading ? progressView(loading) :
                <ImageBackground source={images.login_background} style={externalStyles.login_imageBackground}>
                    <Image source={images.app_logo} style={externalStyles.login_app_logo} />

                    <View style={externalStyles.login_formview}>
                        {/* unique id */}
                        <TextInput
                            style={externalStyles.login_formTextinput}
                            value={unique_id}
                            onChangeText={txt => { setUniqueId(txt); }}
                            placeholderTextColor={colors.black}
                            placeholder="Unique id"
                            theme={{
                                colors: {
                                    primary: colors.textInputColor,
                                },
                            }} />
                        {/* end of unique id */}

                        {/* password */}
                        <TextInput
                            style={externalStyles.login_formTextinput}
                            value={password}
                            onChangeText={txt => { setPassword(txt); }}
                            placeholderTextColor={colors.black}
                            placeholder="Password"
                            secureTextEntry={true}
                            theme={{
                                colors: {
                                    primary: colors.textInputColor,
                                    secondary: colors.textInputColor,
                                },
                            }} />
                        {/* end of password */}

                        {/* submit button */}
                        <Pressable onPress={() => onSubmit()} style={externalStyles.login_submitbutton}>
                            <Text style={externalStyles.login_submitbuttonText}>Login</Text>
                        </Pressable>
                        {/* end of submit button */}

                        {/* login as guest button */}
                        <Pressable onPress={() => navigation.navigate('LoginAsGuestScreen')} style={externalStyles.login_submitbutton}>
                            <Text style={externalStyles.login_submitbuttonText}>Login as Guest</Text>
                        </Pressable>
                        {/* end of login as guest button */}

                    </View>

                </ImageBackground>
            }
        </View>
    );
};