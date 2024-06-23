import { useIsFocused, } from "@react-navigation/native";
import { FlatList, Image, Pressable, ScrollView, Text, View } from "react-native";
import { externalStyles } from "../common/styles";
import { CustomConsole, getPopMediumFont, getRegularFont, getSemiBoldFont, progressView } from "../common/utils";
import { ACTIVE_QUIZ, AVATAR_LIST, SLIDER_DETAILS, SLIDER_LIST } from "../common/webUtils";
import { useEffect, useRef, useState } from "react";
import { AVATAR, DESIGNATION_ID, TOKEN, getSession, } from "../common/LocalStorage";
import moment from "moment";
import { SF, SH, SW } from "../common/dimensions";
import { colors } from "../common/color";
import images from "../assets/images";

export default function AvatarUpdateScreen({ navigation }) {

    const [loading, setLoading] = useState(false);
    const [imageList, setImageList] = useState([]);
    const [activeQuizList, setActiveQuizList] = useState([]);
    const focused = useIsFocused();
    let Flatlistref = useRef(null);

    useEffect(() => {
        if (focused) {
            getSliderList();
        }
    }, [focused]);

    // slider list api
    const getSliderList = async () => {

        try {
            const requestOptions = {
                method: "GET",
                redirect: "follow"
            };

            setLoading(true);
            fetch(AVATAR_LIST, requestOptions)
                .then((response) => response.json())
                .then((json) => {
                    CustomConsole(json);

                    if (json.status == 1) {
                        // success response
                        setImageList(json.data.slides);
                        setLoading(false);
                    }
                    else {
                        // other reponse status
                        setLoading(false);
                    }
                })
                .catch((error) => {
                    setLoading(false);
                    CustomConsole("Slider List Api Error: " + error);
                });
        } catch (error) {
            setLoading(false);
            CustomConsole("Slider List Api Exception: " + error);
        }
    }

    // banner item view
    const renderImageItem = ({ item, index }) => (
        <View style={externalStyles.banner_item_view}>
            <Image source={{ uri: item }} style={externalStyles.banner_item_image} />
        </View>
    );

    // quiz item view
    const renderQuizItem = ({ item, index }) => (
        <View style={externalStyles.home_quiz_render_item_mainview}>
            <Text style={externalStyles.home_quiz_render_item_title}>{item.quiz_title}</Text>


        </View>
    );

    return (
        <View style={externalStyles.container}>

            {/* header view */}
            <View style={{ flexDirection: "row", alignItems: "center", marginHorizontal: SW(12), marginTop: SH(28.87) }}>
                <Pressable style={{ padding: 10 }} onPress={() => navigation.goBack()}>
                    <Image source={images.back_arrow} style={{ height: SH(23), width: SH(23), resizeMode: "contain", tintColor: colors.black }} />
                </Pressable>
                <Text style={{ color: colors.black, fontSize: SF(18), fontFamily: getPopMediumFont() }}>Select Your Avatar</Text>
            </View>
            {/* end of header view */}

            {loading ? progressView(loading) :
                <>

                    {/* quiz list view */}
                    {/* <FlatList
                        refreshing={loading}
                        data={activeQuizList}
                        style={externalStyles.home_active_quiz_list}
                        ItemSeparatorComponent={() => (<View style={externalStyles.home_active_quiz_list_separator} />)}
                        renderItem={renderQuizItem}
                        ListEmptyComponent={() => {
                            return (
                                <View style={{ width: "100%", alignItems: "center", flex: 1, marginTop: SH(50) }}>
                                    <Text style={{ color: colors.black, fontFamily: getRegularFont(), fontSize: SF(25), }}>No Avatars Found</Text>
                                </View>
                            );
                        }}
                    /> */}
                    {/* end of quiz list view */}

                    <Image source={{ uri: 'https://quiz.primaldevs.com/images/staff/avatar17191348891242.jpg' }}
                        style={{
                            height: SH(200), width: SH(200), resizeMode: "contain"
                        }} />

                </>}
        </View>
    );
};