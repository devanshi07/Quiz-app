import { useIsFocused, useNavigation } from "@react-navigation/native";
import { BackHandler, Dimensions, FlatList, Image, ImageBackground, Pressable, ScrollView, Text, View } from "react-native";
import { externalStyles } from "../common/styles";
import images from "../assets/images";
import { colors } from "../common/color";
import { TextInput } from "react-native-paper";
import { CustomConsole, alertDialogDisplay, getMediumFont, getPopBoldFont, getPopMediumFont, getSemiBoldFont } from "../common/utils";
import { ACTIVE_QUIZ, LOGIN, SLIDER_DETAILS, SLIDER_LIST } from "../common/webUtils";
import { useEffect, useRef, useState } from "react";
import { AVATAR, EMAIL, FCM_TOKEN, PHONE, ROLE, TOKEN, USER_ID, USER_NAME, getSession, saveSession } from "../common/LocalStorage";
import { SF, SH, SW } from "../common/dimensions";

export default function QuizResultScreen({ navigation, route }) {

    const total_score = route.params.paramTotalScore;
    const get_score = route.params.paramScore;
    const total_questions = route.params.paramTotalQuestions;
    const attended_questions = route.params.paramAttemptQuestions;

    const [loading, setLoading] = useState(false);
    const [imageList, setImageList] = useState([]);
    const [activeQuizList, setActiveQuizList] = useState("");
    const focused = useIsFocused();
    let Flatlistref = useRef(null);

    useEffect(() => {
        if (focused) {
        }
    }, [focused]);

    function handleBackButtonClick() {
        navigation.navigate("HomeScreen")
        return true;
      }
      
      useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
        return () => {
          BackHandler.removeEventListener("hardwareBackPress", handleBackButtonClick);
        };
      }, []);

    return (
        <View style={externalStyles.coloredContainer}>

            {/* header view */}
            <View style={{ flexDirection: "row", alignItems: "center", marginHorizontal: SW(12), marginTop: SH(28.87) }}>
                <Pressable style={{ padding: 10 }} onPress={() => navigation.navigate("HomeScreen")}>
                    <Image source={images.back_arrow} style={{ height: SH(23), width: SH(23), resizeMode: "contain" }} />
                </Pressable>
                <Text style={{ color: colors.white, fontSize: SF(18), fontFamily: getPopMediumFont() }}>{"Quiz Results"}</Text>
            </View>
            {/* end of header view */}

            {/* main view */}
            <ScrollView>
                <View style={{ marginHorizontal: SW(37), alignItems: "center", marginTop: SH(33) }}>
                    <Image source={images.success_img} style={{ width: SH(304), height: SH(304), resizeMode: "contain" }} />
                    <Text style={{ color: colors.white, fontSize: SF(30), fontFamily: getPopMediumFont(), marginTop: SH(38) }}>Congratulations</Text>

                    {/* score view */}
                    <View style={{ backgroundColor: colors.themeColor, marginTop: SH(82), borderRadius: 25 }}>
                        <View style={{ backgroundColor: colors.white, paddingHorizontal: SW(10), paddingVertical: SH(5), borderRadius: 9, top: -16, alignSelf: "center" }}>
                            <Text style={{ color: colors.black, fontFamily: getPopMediumFont(), fontSize: SF(17) }}>Your Score is</Text>
                        </View>
                        <View style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: SW(32.41), marginTop: SH(5), marginBottom: SH(20) }}>
                            <View style={{
                                width: SH(90),
                                height: SH(90),
                                backgroundColor: colors.white,
                                borderRadius: 360,
                                alignItems: "flex-end",
                                justifyContent: "center"
                            }}>
                                <View style={[{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }, { width: SH(85), height: SH(85), borderRadius: 360, backgroundColor: colors.themeColor, zIndex: 1 }]}>
                                    <Text style={{ color: colors.white, fontFamily: getPopBoldFont(), fontSize: SF(35), marginLeft: SW(19.19) }}>{get_score}</Text>
                                </View>
                            </View>
                            <Text style={{ color: colors.white, fontFamily: getPopBoldFont(), fontSize: SF(35), textAlign: "center", textAlignVertical: "center", marginHorizontal: SH(5), marginTop: 5 }}>/</Text>
                            <View style={{
                                width: SH(90),
                                height: SH(90),
                                backgroundColor: colors.white,
                                borderRadius: 360,
                                alignItems: "flex-start",
                                justifyContent: "center"
                            }}>
                                <View style={[{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }, { width: SH(85), height: SH(85), borderRadius: 360, backgroundColor: colors.themeColor, zIndex: 1 }]}>
                                    <Text style={{ color: colors.white, fontFamily: getPopBoldFont(), fontSize: SF(35), marginRight: SW(19.19) }}>{total_score}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    {/* end of score view */}

                    {/* attended question */}
                    <View style={{ backgroundColor: colors.themeColor, marginTop: SH(82), borderRadius: 25, marginBottom: SH(64) }}>
                        <View style={{ backgroundColor: colors.white, paddingHorizontal: SW(10), paddingVertical: SH(5), borderRadius: 9, top: -16, alignSelf: "center" }}>
                            <Text style={{ color: colors.black, fontFamily: getPopMediumFont(), fontSize: SF(17) }}>No. of Attended questions</Text>
                        </View>
                        <View style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: SW(78), marginTop: SH(5), marginBottom: SH(20) }}>
                            <View style={{
                                width: SH(70),
                                height: SH(70),
                                backgroundColor: colors.white,
                                borderRadius: 360,
                                alignItems: "flex-end",
                                justifyContent: "center"
                            }}>
                                <View style={[{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }, { width: SH(65), height: SH(65), borderRadius: 360, backgroundColor: colors.themeColor, zIndex: 1 }]}>
                                    <Text style={{ color: colors.white, fontFamily: getPopBoldFont(), fontSize: SF(23), marginLeft: SW(18) }}>{attended_questions}</Text>
                                </View>
                            </View>
                            <Text style={{ color: colors.white, fontFamily: getPopBoldFont(), fontSize: SF(23), textAlign: "center", textAlignVertical: "center", marginHorizontal: SH(5), marginTop: 5 }}>/</Text>
                            <View style={{
                                width: SH(70),
                                height: SH(70),
                                backgroundColor: colors.white,
                                borderRadius: 360,
                                alignItems: "flex-start",
                                justifyContent: "center"
                            }}>
                                <View style={[{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }, { width: SH(65), height: SH(65), borderRadius: 360, backgroundColor: colors.themeColor, zIndex: 1 }]}>
                                    <Text style={{ color: colors.white, fontFamily: getPopBoldFont(), fontSize: SF(23), marginRight: SW(18) }}>{total_questions}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    {/* end of attended question */}

                </View>
            </ScrollView>
            {/* end of main view */}

        </View>
    );
};