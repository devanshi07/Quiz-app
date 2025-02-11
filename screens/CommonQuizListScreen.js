import { DrawerActions, useIsFocused, } from "@react-navigation/native";
import { FlatList, Image, Pressable, ScrollView, Text, View } from "react-native";
import { externalStyles } from "../common/styles";
import { CustomConsole, getRegularFont, getSemiBoldFont, progressView } from "../common/utils";
import { ACTIVE_QUIZ, ATTEND_QUIZ, COMMON_QUIZ_LIST, SLIDER_DETAILS, SLIDER_LIST } from "../common/webUtils";
import { useEffect, useRef, useState } from "react";
import { DESIGNATION_ID, GUEST_TOKEN, TOKEN, getSession, } from "../common/LocalStorage";
import moment from "moment";
import { SF, SH, SW } from "../common/dimensions";
import { colors } from "../common/color";
import images from "../assets/images";

export default function CommonQuizListScreen({ navigation, route }) {

    console.log("paramItem===>", route.params.paramItem);
    
    const [loading, setLoading] = useState(false);
    const [activeQuizList, setActiveQuizList] = useState([]);
    const focused = useIsFocused();

    useEffect(() => {
        if (focused) {
            getActiveQuizList();
        }
    }, [focused]);

    // quiz list api
    const getActiveQuizList = async () => {
        try {
            const requestOptions = {
                method: "GET",
                redirect: "follow"
            };

            CustomConsole("API: " + COMMON_QUIZ_LIST);
            fetch(COMMON_QUIZ_LIST, requestOptions)
                .then((response) => response.json())
                .then((json) => {
                    CustomConsole("Common quiz=>");
                    CustomConsole(json);
                    if (json.status == 1) {
                        console.log("inf")
                        // success response
                        activeQuizList.length = 0;
                        // for (var i = 0; i < json.quiz_list.length; i++) {
                            const currentTime = moment();
                            const quizDateTime = moment(`${json.quiz_list.quiz_date} ${json.quiz_list.quiz_time}`, 'YYYY-MM-DD HH:mm:ss');

                            activeQuizList.push({
                                quiz_date: json.quiz_list.quiz_date,
                                quiz_id: json.quiz_list.quiz_id,
                                quiz_time: json.quiz_list.quiz_time,
                                quiz_title: json.quiz_list.quiz_title,
                                status: json.quiz_list.status,
                                total_time: json.quiz_list.total_time,
                                quiz_active: currentTime.isSameOrAfter(quizDateTime)
                            });
                        // }
                        setActiveQuizList([...activeQuizList]);
                        CustomConsole(activeQuizList);
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

    // quiz item view
    const renderQuizItem = ({ item, index }) => (
        <View style={externalStyles.home_quiz_render_item_mainview}>
            <Text style={externalStyles.home_quiz_render_item_title}>{item.quiz_title}</Text>

            <Pressable onPress={async () => {
                try {
                    const token = await getSession(GUEST_TOKEN);
                    const myHeaders = new Headers();
                    myHeaders.append("Content-Type", "application/json");
                    myHeaders.append("Authorization", "Bearer " + token.split('|')[1].trim());

                    const raw = JSON.stringify({
                        "quiz_id": item.quiz_id
                    });

                    const requestOptions = {
                        method: "POST",
                        headers: myHeaders,
                        body: raw,
                        redirect: "follow"
                    };

                    CustomConsole("API: " + ATTEND_QUIZ);
                    CustomConsole(raw);
                    setLoading(true);
                    fetch(ATTEND_QUIZ, requestOptions)
                        .then((response) => response.json())
                        .then((json) => {
                            CustomConsole(json);
                            if (json.status == 1) {
                                navigation.navigate("CommonQuizScreen", {
                                    paramItem: item,
                                });
                            } else {
                                setLoading(false);
                            }
                        })
                        .catch((error1) => {
                            setLoading(false);
                            CustomConsole("Quiz Attendance Api Error: " + error1);
                        });

                } catch (error) {
                    setLoading(false);
                    CustomConsole("Quiz Attendance Api Exception: " + error);
                }
            }}
                disabled={item.quiz_active ? false : true}
                style={item.quiz_active ? externalStyles.home_quiz_render_item_button_active : externalStyles.home_quiz_render_item_button}>
                <Text style={externalStyles.home_quiz_render_item_buttonText}>Take Quiz</Text>
            </Pressable>

        </View>
    );

    return (
        <View style={externalStyles.container}>

            {loading ? progressView(loading) :
                <>
                    {/* quiz list view */}
                    <Text style={{color: colors.black, fontFamily: getSemiBoldFont(), fontSize: SF(28), alignSelf: "center",marginTop:SH(20)}}>Quizes</Text>
                    <FlatList
                        refreshing={loading}
                        onRefresh={getActiveQuizList}
                        data={activeQuizList}
                        style={externalStyles.home_active_quiz_list}
                        ItemSeparatorComponent={() => (<View style={externalStyles.home_active_quiz_list_separator} />)}
                        renderItem={renderQuizItem}
                        ListEmptyComponent={() => {
                            return (
                                <View style={{ width: "100%", alignItems: "center", flex: 1, marginTop: SH(50) }}>
                                    <Text style={{ color: colors.black, fontFamily: getRegularFont(), fontSize: SF(25), }}>No Active Quiz Found</Text>
                                </View>
                            );
                        }}
                    /> 
                    {/* end of quiz list view */}

                </>
             } 
        </View>
    );
};