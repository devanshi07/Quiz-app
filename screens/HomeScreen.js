import { useIsFocused, } from "@react-navigation/native";
import { FlatList, Image, Pressable, Text, View } from "react-native";
import { externalStyles } from "../common/styles";
import { CustomConsole, progressView } from "../common/utils";
import { ACTIVE_QUIZ, SLIDER_DETAILS, SLIDER_LIST } from "../common/webUtils";
import { useEffect, useRef, useState } from "react";
import { DESIGNATION_ID, TOKEN, getSession, } from "../common/LocalStorage";

export default function HomeScreen({ navigation }) {

    const [loading, setLoading] = useState(false);
    const [imageList, setImageList] = useState([]);
    const [activeQuizList, setActiveQuizList] = useState("");
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
            fetch(SLIDER_LIST, requestOptions)
                .then((response) => response.json())
                .then((json) => {
                    CustomConsole(json);

                    if (json.status == 1) {
                        // success response
                        setImageList(json.data.slides);
                        getActiveQuizList();
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

    // quiz list api
    const getActiveQuizList = async () => {
        try {
            const token = await getSession(TOKEN);
            const designation_id = await getSession(DESIGNATION_ID);

            const myHeaders = new Headers();
            myHeaders.append("Authorization", "Bearer " + token.split('|')[1].trim());

            const formdata = new FormData();
            formdata.append("designation", designation_id);

            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: formdata,
                redirect: "follow"
            };

            CustomConsole("API: " + ACTIVE_QUIZ);
            CustomConsole(formdata);
            fetch(ACTIVE_QUIZ, requestOptions)
                .then((response) => response.json())
                .then((json) => {
                    CustomConsole(json);
                    if (json.status == 1) {
                        // success response
                        setActiveQuizList(json.quiz_list);
                        setLoading(false);
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

            <Pressable onPress={() => {
                navigation.navigate("QuizScreen", {
                    paramItem: item,
                });
            }}
                disabled={item.status == 1 ? false : true}
                style={item.status == 1 ? externalStyles.home_quiz_render_item_button_active : externalStyles.home_quiz_render_item_button}>
                <Text style={externalStyles.home_quiz_render_item_buttonText}>Take Quiz</Text>
            </Pressable>
        </View>
    );

    return (
        <View style={externalStyles.container}>

            {loading ? progressView(loading) :
                <>
                    {/* banners view */}
                    <View style={externalStyles.banner_main_view}>
                        <View style={externalStyles.banner_sub_view}>
                            <FlatList data={imageList}
                                horizontal
                                ref={Flatlistref}
                                scrollEventThrottle={32}
                                pagingEnabled
                                renderItem={renderImageItem}
                            />
                        </View>
                    </View>
                    {/* end of banner view */}

                    {/* quiz list view */}
                    <Text style={externalStyles.home_active_quiz_text}>Active Quiz</Text>
                    <FlatList data={activeQuizList}
                        style={externalStyles.home_active_quiz_list}
                        ItemSeparatorComponent={() => (<View style={externalStyles.home_active_quiz_list_separator} />)}
                        renderItem={renderQuizItem}
                    />
                    {/* end of quiz list view */}

                </>}
        </View>
    );
};