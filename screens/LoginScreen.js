import { useNavigation } from "@react-navigation/native";
import { Image, ImageBackground,  View } from "react-native";
import { externalStyles } from "../common/styles";
import images from "../assets/images";
import { colors } from "../common/color";
import { TextInput } from "react-native-paper";

export default function LoginScreen({ navigation }) {


    return (
        <View style={externalStyles.container}>
            <ImageBackground source={images.login_background} style={externalStyles.login_imageBackground}>
                <Image source={images.app_logo} style={externalStyles.login_app_logo} />

                <View style={externalStyles.login_formview}>
                    {/* unique id */}
                    <TextInput
                        style={externalStyles.query_formTextinput}
                        // value={name}
                        // onChangeText={txt => { setName(txt); }}
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
                        style={externalStyles.query_formTextinput}
                        // value={name}
                        // onChangeText={txt => { setName(txt); }}
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

                </View>

            </ImageBackground>
        </View>
    );
};