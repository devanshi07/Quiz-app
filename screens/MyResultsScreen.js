import { DrawerActions, useIsFocused, useNavigation } from "@react-navigation/native";
import { Dimensions, FlatList, Image, ImageBackground, Pressable, ScrollView, Text, View } from "react-native";
import { externalStyles } from "../common/styles";
import images from "../assets/images";
import { colors } from "../common/color";
import { TextInput } from "react-native-paper";
import { CustomConsole, alertDialogDisplay, getMediumFont, getPopBoldFont, getPopMediumFont, getPopRegularFont, getPopSemiBoldFont, getSemiBoldFont, progressView } from "../common/utils";
import { ACTIVE_QUIZ, LOGIN, PERSONAL_RESULT, SLIDER_DETAILS, SLIDER_LIST, TOP_WINNERS } from "../common/webUtils";
import { useEffect, useRef, useState } from "react";
import { AVATAR, DESIGNATION, DESIGNATION_ID, EMAIL, FCM_TOKEN, PHONE, ROLE, TOKEN, USER_ID, USER_NAME, getSession, saveSession } from "../common/LocalStorage";
import { SF, SH, SW } from "../common/dimensions";

export default function MyResultsScreen({ navigation }) {

    const [loading, setLoading] = useState(false);
    const [resultList, setResultList] = useState([]);
    const focused = useIsFocused();
    let Flatlistref = useRef(null);

    useEffect(() => {
        if (focused) {
            getMyResultsList();
        }
    }, [focused]);

    // result list api
    const getMyResultsList = async () => {

        try {
            setLoading(true);
            const token = await getSession(TOKEN);
            const myHeaders = new Headers();
            myHeaders.append("Authorization", "Bearer " + token.split('|')[1].trim());

            const requestOptions = {
                method: "GET",
                headers: myHeaders,
                redirect: "follow"
            };

            fetch(PERSONAL_RESULT, requestOptions)
                .then((response) => response.json())
                .then((json) => {
                    CustomConsole(json);

                    if (json.status == 1) {
                        // success response
                        setResultList(json.data);
                        setLoading(false);
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

    // result item view
    const renderResultItem = ({ item, index }) => (
        <View style={{
            marginHorizontal: SW(32), borderWidth: 1, borderColor: "white", borderRadius: 14, padding: 7
        }}>
            <Text style={{ color: colors.white, fontFamily: getPopBoldFont(), fontSize: SF(20) }}>{item.quiz_name}</Text>
            <Text style={{ color: colors.white, fontFamily: getPopRegularFont(), fontSize: SF(16) }}>Correct Answers: {item.correct_answers}</Text>
            <Text style={{ color: colors.white, fontFamily: getPopRegularFont(), fontSize: SF(16) }}>Wrong Answers: {item.wrong_answers}</Text>
            <Text style={{ color: colors.white, fontFamily: getPopRegularFont(), fontSize: SF(16) }}>Total time: {item.total_time}</Text>
        </View>
    );

    return (
        <View style={externalStyles.container}>

            {/* header view */}
            <View style={{ flexDirection: "row", alignItems: "center", marginHorizontal: SW(12), marginTop: SH(28.87) }}>
                <Pressable style={{ padding: 10 }} onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
                    <Image source={images.drawer_menu} style={{ height: SH(40), width: SH(40), resizeMode: "contain", tintColor: colors.black }} />
                </Pressable>
                <Text style={{ color: colors.black, fontSize: SF(18), fontFamily: getPopMediumFont() }}>{"My Results"}</Text>
            </View>
            {/* end of header view */}

            {loading ? progressView(loading) :
                <FlatList
                    data={resultList}
                    style={{
                        marginTop: SH(55), marginBottom: SH(30), backgroundColor: colors.themeYellowColor, marginHorizontal: SW(37), borderRadius: 40
                    }}
                    ListHeaderComponent={() => <View style={{ alignSelf: "center", marginTop: SH(34), marginBottom: SH(67) }}>
                        <Text style={{ color: colors.white, fontSize: SF(23), fontFamily: getSemiBoldFont() }}>{"Quiz's Results"}</Text>
                    </View>}
                    ItemSeparatorComponent={() => (<View style={{ height: SH(22) }} />)}
                    renderItem={renderResultItem}
                />
            }
        </View>
    );
};