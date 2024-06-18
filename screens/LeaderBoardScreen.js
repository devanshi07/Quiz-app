import { useIsFocused, useNavigation } from "@react-navigation/native";
import { Dimensions, FlatList, Image, ImageBackground, Pressable, ScrollView, Text, View } from "react-native";
import { externalStyles } from "../common/styles";
import images from "../assets/images";
import { colors } from "../common/color";
import { TextInput } from "react-native-paper";
import { CustomConsole, alertDialogDisplay, getMediumFont, getPopBoldFont, getPopMediumFont, getPopSemiBoldFont, getSemiBoldFont } from "../common/utils";
import { ACTIVE_QUIZ, LOGIN, SLIDER_DETAILS, SLIDER_LIST } from "../common/webUtils";
import { useEffect, useRef, useState } from "react";
import { AVATAR, EMAIL, FCM_TOKEN, PHONE, ROLE, TOKEN, USER_ID, USER_NAME, getSession, saveSession } from "../common/LocalStorage";
import { SF, SH, SW } from "../common/dimensions";

export default function LeaderBoardScreen({ navigation }) {

    const [loading, setLoading] = useState(false);
    const [imageList, setImageList] = useState([]);
    const [activeQuizList, setActiveQuizList] = useState("");
    const focused = useIsFocused();
    let Flatlistref = useRef(null);

    useEffect(() => {
        if (focused) {
            getTopPerformersList();
        }
    }, [focused]);

    // top performer list api
    const getTopPerformersList = async () => {

        try {
            setLoading(true);
            const requestOptions = {
                method: "GET",
                redirect: "follow"
            };

            fetch(SLIDER_LIST, requestOptions)
                .then((response) => response.json())
                .then((json) => {
                    CustomConsole(json);

                    if (json.status == 1) {
                        // success response
                        
                    }
                    else {
                        // other reponse status
                        setLoading(false);
                    }

                })
                .catch((error) => {
                    setLoading(false);
                    CustomConsole("Top performer list Api Error: " + error);
                });
        } catch (error) {
            setLoading(false);
            CustomConsole("Top performer List Api Exception: " + error);
        }
    }



    const renderImageItem = ({ item, index }) => (
        <View style={{ backgroundColor: colors.themeColor, borderRadius: 360, width: Dimensions.get('window').width + 10, height: Dimensions.get('window').width + 10, alignItems: "center", }}>
            <View style={{ backgroundColor: colors.white, borderRadius: 360, width: Dimensions.get('window').width - 15, height: Dimensions.get('window').width - 15, alignItems: "center" }}>
                {/* <Image source={{ uri: item.image }} style={externalStyles.banner_item_image} /> */}
                <Image source={{ uri: 'https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg' }} style={[externalStyles.banner_item_image, { width: Dimensions.get('window').width - 30, height: Dimensions.get('window').width - 30, borderRadius: 360, }]} />
            </View>
        </View>
    );

    const renderQuizItem = ({ item, index }) => (
        <View style={externalStyles.home_quiz_render_item_mainview}>
            <Text style={externalStyles.home_quiz_render_item_title}>{item.quiz_title}</Text>
            <Pressable onPress={() => {
                navigation.navigate("QuizScreen", {
                    paramItem: item,
                });
            }}
                style={externalStyles.home_quiz_render_item_button}>
                <Text style={externalStyles.home_quiz_render_item_buttonText}>Take Quiz</Text>
            </Pressable>
        </View>
    );

    return (
        <View style={externalStyles.container}>

            {/* header view */}
            <View style={{ flexDirection: "row", alignItems: "center", marginHorizontal: SW(12), marginTop: SH(28.87) }}>
                <Pressable style={{ padding: 10 }} onPress={() => navigation.goBack()}>
                    <Image source={images.back_arrow} style={{ height: SH(23), width: SH(23), resizeMode: "contain", tintColor: colors.black }} />
                </Pressable>
                <Text style={{ color: colors.black, fontSize: SF(18), fontFamily: getPopMediumFont() }}>{"Leaderboard"}</Text>
            </View>
            {/* end of header view */}

            <ScrollView>
                <View style={{ backgroundColor: colors.themeColor, borderRadius: 360, width: 450, height: 450, alignItems: "center", top: -170, alignSelf: "center" }}>
                    <View style={{ backgroundColor: colors.white, borderRadius: 360, width: 435, height: 435, alignItems: "center", justifyContent: "center" }}>
                        <View style={{ backgroundColor: colors.themeColor, borderRadius: 11, paddingHorizontal: SW(13), paddingVertical: SH(7), marginTop: 100 }}>
                            <Text style={{ color: colors.white, fontSize: SF(30), fontFamily: getPopBoldFont() }}>{"Leadership"}</Text>
                        </View>
                        <Text style={{ color: '#292929', fontSize: SF(22), fontFamily: getPopSemiBoldFont(), marginTop: SH(31) }}>{"Top 3 Month Results"}</Text>
                    </View>

                    <View style={{ flexDirection: "row", alignItems: "center", marginTop: -30 }}>

                        <View style={{ alignItems: "center" }}>
                            <View style={{ backgroundColor: "#D9D9D9", width: SH(100), height: SH(100), borderRadius: 360 }}>
                            </View>
                            <View style={{ backgroundColor: "#D9D9D9", borderRadius: 18, marginTop: 13, paddingHorizontal: SW(19), paddingVertical: SH(5) }}>
                                <Text style={{ color: colors.black, fontSize: SF(15), fontFamily: getPopMediumFont(), textAlign: "center" }}>{"Item2"}</Text>
                            </View>
                            <View style={{ backgroundColor: colors.themeGreenColor, borderRadius: 18, marginTop: 13, width: SH(35), height: SH(35), alignItems: "center", justifyContent: "center" }}>
                                <Text style={{ color: colors.white, fontSize: SF(20), fontFamily: getSemiBoldFont(), textAlign: "center" }}>{"2"}</Text>
                            </View>
                        </View>

                        <View style={{ width: SW(15) }} />
                        {/* <View style={{ backgroundColor: "#D9D9D9", width: SH(128), height: SH(128), borderRadius: 360, marginTop: -40 }}>

                        </View> */}
                        <View style={{ alignItems: "center" }}>
                            <View style={{ backgroundColor: "#D9D9D9", width: SH(128), height: SH(128), borderRadius: 360 ,marginTop: -40}}>
                            </View>
                            <View style={{ backgroundColor: "#D9D9D9", borderRadius: 18, marginTop: 13, paddingHorizontal: SW(19), paddingVertical: SH(5) }}>
                                <Text style={{ color: colors.black, fontSize: SF(15), fontFamily: getPopMediumFont(), textAlign: "center" }}>{"Item1"}</Text>
                            </View>
                            <View style={{ backgroundColor: colors.themeColor, borderRadius: 18, marginTop: 13, width: SH(35), height: SH(35), alignItems: "center", justifyContent: "center" }}>
                                <Text style={{ color: colors.white, fontSize: SF(20), fontFamily: getSemiBoldFont(), textAlign: "center" }}>{"1"}</Text>
                            </View>
                        </View>

                        <View style={{ width: SW(15) }} />

                        <View style={{ alignItems: "center" }}>
                            <View style={{ backgroundColor: "#D9D9D9", width: SH(100), height: SH(100), borderRadius: 360 }}>
                            </View>
                            <View style={{ backgroundColor: "#D9D9D9", borderRadius: 18, marginTop: 13, paddingHorizontal: SW(19), paddingVertical: SH(5) }}>
                                <Text style={{ color: colors.black, fontSize: SF(15), fontFamily: getPopMediumFont(), textAlign: "center" }}>{"Item3"}</Text>
                            </View>
                            <View style={{ backgroundColor: colors.themeGreenColor, borderRadius: 18, marginTop: 13, width: SH(35), height: SH(35), alignItems: "center", justifyContent: "center" }}>
                                <Text style={{ color: colors.white, fontSize: SF(20), fontFamily: getSemiBoldFont(), textAlign: "center" }}>{"3"}</Text>
                            </View>
                        </View>
                    </View>

                </View>


            </ScrollView>

        </View>
    );
};