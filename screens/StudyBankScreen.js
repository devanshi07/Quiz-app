import { DrawerActions, useIsFocused, useNavigation } from "@react-navigation/native";
import { Dimensions, FlatList, Image, ImageBackground, Pressable, ScrollView, Text, View } from "react-native";
import { externalStyles } from "../common/styles";
import images from "../assets/images";
import { colors } from "../common/color";
import { TextInput } from "react-native-paper";
import { CustomConsole, alertDialogDisplay, getMediumFont, getPopBoldFont, getPopMediumFont, getPopRegularFont, getPopSemiBoldFont, getSemiBoldFont, progressView } from "../common/utils";
import { ACTIVE_QUIZ, LOGIN, PERSONAL_RESULT, SLIDER_DETAILS, SLIDER_LIST, STUDY_BANK, TOP_WINNERS } from "../common/webUtils";
import { useEffect, useRef, useState } from "react";
import { AVATAR, DESIGNATION, DESIGNATION_ID, EMAIL, FCM_TOKEN, PHONE, ROLE, TOKEN, USER_ID, USER_NAME, getSession, saveSession } from "../common/LocalStorage";
import { SF, SH, SW } from "../common/dimensions";
import * as Animatable from 'react-native-animatable'

export default function StudyBankScreen({ navigation }) {

    const [loading, setLoading] = useState(false);
    const [studyList, setStudyList] = useState([]);
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
            const designation_id = await getSession(DESIGNATION_ID);

            const token = await getSession(TOKEN);
            const myHeaders = new Headers();
            myHeaders.append("Authorization", "Bearer " + token.split('|')[1].trim());

            const requestOptions = {
                method: "GET",
                headers: myHeaders,
                redirect: "follow"
            };

            CustomConsole(STUDY_BANK + designation_id);

            fetch(STUDY_BANK + designation_id, requestOptions)
                .then((response) => response.json())
                .then((json) => {
                    CustomConsole(json);

                    if (json.status == 1) {
                        // success response
                        setStudyList(json.top_winners);
                        setLoading(false);
                    }
                    else {
                        // other reponse status
                        setLoading(false);
                    }

                })
                .catch((error) => {
                    setLoading(false);
                    CustomConsole("Study bank list Api Error: " + error);
                });
        } catch (error) {
            setLoading(false);
            CustomConsole("Study bank List Api Exception: " + error);
        }
    }

    // result item view
    const renderResultItem = ({ item, index }) => (
        <Animatable.View
            animation={'slideInRight'}
            duration={1000}
            delay={index * 300}
            style={{
                borderWidth: 1, borderColor: "white", borderRadius: 14, backgroundColor: "#f0f0f0", flexDirection: "row",
            }}>
            <View style={{ paddingLeft: 7, paddingVertical: 7 }}>
                <View style={{ backgroundColor: colors.themeYellowColor, borderRadius: 10, alignItems: "center", justifyContent: "center", height: SH(65), width: SH(65) }}>
                    <Image source={item.pdf != null && item.pdf != "" ? images.document_file : images.video_image} style={{ height: SH(45), width: SH(45), resizeMode: "contain", tintColor: colors.white }} />
                </View>
            </View>
            <View style={{ flex: 1, marginLeft: SH(15), paddingVertical: 7 }}>
                <Text style={{ color: colors.black, fontFamily: getPopBoldFont(), fontSize: SF(18) }}>{item.title}</Text>
                <Text style={{ color: colors.grey, fontFamily: getPopRegularFont(), fontSize: SF(15) }}>{item.description}</Text>
            </View>
            <Pressable onPress={() => navigation.navigate("StudyMetrialView", { paramItem: item })}
                style={{ backgroundColor: "#e8e8e8", borderTopRightRadius: 10, borderBottomRightRadius: 10, paddingHorizontal: SW(20), justifyContent: "center", alignItems: "center" }}>
                <Image source={images.right_arrow} style={{ height: SH(20), width: SH(20), resizeMode: "contain", }} />
            </Pressable>
        </Animatable.View>
    );

    return (
        <View style={externalStyles.container}>

            {/* header view */}
            <View style={{ flexDirection: "row", alignItems: "center", marginHorizontal: SW(12), marginTop: SH(28.87) }}>
                <Pressable style={{ padding: 10 }} onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
                    <Image source={images.drawer_menu} style={{ height: SH(40), width: SH(40), resizeMode: "contain", tintColor: colors.black }} />
                </Pressable>
                <Text style={{ color: colors.black, fontSize: SF(18), fontFamily: getPopMediumFont() }}>{"Study Bank"}</Text>
            </View>
            {/* end of header view */}

            {loading ? progressView(loading) :
                <FlatList
                    data={studyList}
                    style={{
                        marginTop: SH(40), marginBottom: SH(30), marginHorizontal: SW(37),
                    }}
                    // ListHeaderComponent={() => <View style={{ alignSelf: "center", marginTop: SH(34), marginBottom: SH(67) }}>
                    //     <Text style={{ color: colors.white, fontSize: SF(23), fontFamily: getSemiBoldFont() }}>{"Quiz's Results"}</Text>
                    // </View>}
                    ItemSeparatorComponent={() => (<View style={{ height: SH(22) }} />)}
                    ListFooterComponent={() => (<View style={{ height: SH(20) }} />)}
                    showsVerticalScrollIndicator={false}
                    renderItem={renderResultItem}
                />
            }
        </View>
    );
};