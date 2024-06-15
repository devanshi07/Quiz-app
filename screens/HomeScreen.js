import { useIsFocused, useNavigation } from "@react-navigation/native";
import { Dimensions, FlatList, Image, ImageBackground, Pressable, Text, View } from "react-native";
import { externalStyles } from "../common/styles";
import images from "../assets/images";
import { colors } from "../common/color";
import { TextInput } from "react-native-paper";
import { CustomConsole, alertDialogDisplay, getMediumFont, getSemiBoldFont } from "../common/utils";
import { ACTIVE_QUIZ, LOGIN, SLIDER_DETAILS, SLIDER_LIST } from "../common/webUtils";
import { useEffect, useRef, useState } from "react";
import { AVATAR, EMAIL, FCM_TOKEN, PHONE, ROLE, TOKEN, USER_ID, USER_NAME, getSession, saveSession } from "../common/LocalStorage";
import { SF, SH, SW } from "../common/dimensions";

export default function HomeScreen({ navigation }) {

    const [loading, setLoading] = useState(false);
    const [imageList, setImageList] = useState([]);
    const [activeQuizList, setActiveQuizList] = useState("");
    const focused = useIsFocused();
    let Flatlistref = useRef(null);

    useEffect(() => {
        if (focused) {
            getSliderList();
            getActiveQuizList();
        }
    }, [focused]);

    // slider list api
    const getSliderList = async () => {

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
                        if (json.data.length != 0) {

                            var homeData = json.data.find(element => element.code.includes('home'));
                            if (homeData != null) {
                                CustomConsole(homeData);

                                fetch(SLIDER_DETAILS + homeData.code, requestOptions)
                                    .then((response1) => response1.json())
                                    .then((json1) => {
                                        CustomConsole(json1);

                                        if (json1.status == 1) {
                                            // success response
                                            imageList.length = 0;
                                            for (var i = 0; i < json1.data.slides.length; i++) {
                                                imageList.push({
                                                    id: i,
                                                    image: json1.data.slides[i]
                                                });
                                            }
                                            setImageList(imageList);
                                            setLoading(false);
                                        }
                                        else {
                                            // other reponse status
                                            setLoading(false);
                                        }

                                    })
                                    .catch((error1) => {
                                        setLoading(false);
                                        CustomConsole("Slider Details Api Error: " + error1);
                                    });
                            }
                        }
                    }
                    else {
                        // other reponse status
                        setLoading(false);
                    }

                })
                .catch((error) => {
                    setLoading(false);
                    CustomConsole("Slider list Api Error: " + error);
                });
        } catch (error) {
            setLoading(false);
            CustomConsole("Slider List Api Exception: " + error);
        }
    }

    // quiz list api
    const getActiveQuizList = async () => {

        try {
            setLoading(true);

            const token = await getSession(TOKEN);
            const role = await getSession(ROLE);

            const myHeaders = new Headers();
            myHeaders.append("Authorization", "Bearer " + token.split('|')[1].trim());

            const formdata = new FormData();
            formdata.append("designation", "1");

            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: formdata,
                redirect: "follow"
            };

            fetch(ACTIVE_QUIZ, requestOptions)
                .then((response) => response.json())
                .then((json) => {
                    CustomConsole(json);

                    if (json.status == 1) {
                        // success response
                        setActiveQuizList(json.quiz_list);
                    }
                    else {
                        // other reponse status
                        setLoading(false);
                    }

                })
                .catch((error) => {
                    setLoading(false);
                    CustomConsole("Active Quiz list Api Error: " + error);
                });
        } catch (error) {
            setLoading(false);
            CustomConsole("Active Quiz List Api Exception: " + error);
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


            <View style={[externalStyles.home_sliderMainView, { marginTop: -110 }]}>
                <FlatList data={imageList}
                    horizontal
                    ref={Flatlistref}
                    scrollEventThrottle={32}
                    pagingEnabled
                    renderItem={renderImageItem}
                />
            </View>

            <View>
                <Text style={externalStyles.home_active_quiz_text}>Active Quiz</Text>
                <FlatList data={activeQuizList}
                    style={externalStyles.home_active_quiz_list}
                    renderItem={renderQuizItem}
                />
            </View>

        </View >
    );
};