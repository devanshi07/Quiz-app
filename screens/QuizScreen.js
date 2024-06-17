import { useIsFocused, useNavigation } from "@react-navigation/native";
import { Alert, Button, Dimensions, FlatList, Image, ImageBackground, Pressable, ScrollView, Text, View } from "react-native";
import { externalStyles } from "../common/styles";
import images from "../assets/images";
import { colors } from "../common/color";
import { TextInput } from "react-native-paper";
import { CustomConsole, alertDialogDisplay, coloredProgressView, getMediumFont, getPopMediumFont, getPopSemiBoldFont, getSemiBoldFont, progressView } from "../common/utils";
import { ACTIVE_QUIZ, LOGIN, QUIZ_DETAILS, SLIDER_DETAILS, SLIDER_LIST } from "../common/webUtils";
import { useEffect, useRef, useState } from "react";
import { AVATAR, EMAIL, FCM_TOKEN, PHONE, ROLE, TOKEN, USER_ID, USER_NAME, getSession, saveSession } from "../common/LocalStorage";
import { SF, SH, SW } from "../common/dimensions";
import { APP_NAME } from "../common/string";
import * as Progress from 'react-native-progress';

export default function QuizScreen({ navigation, route }) {

    const quizData = [
        {
            question: "What is the capital of France?",
            options: ["Paris", "Madrid", "Rome", "Berlin"],
            correctAnswer: "Paris",
            explanation: "Paris is the capital of France."
        },
        {
            question: "Which planet is known as the Red Planet?",
            options: ["Mars", "Jupiter", "Mercury", "Venus"],
            correctAnswer: "Mars",
            explanation: "Mars is known as the Red Planet due to its reddish appearance."
        },
        // Add more questions as needed
    ];


    const paramItem = route.params.paramItem

    const [loading, setLoading] = useState(false);
    const [timer, setTimer] = useState(0);
    const [totalQuestions, setTotalQuestion] = useState(0);
    const [questionList, setQuestionList] = useState([]);
    const [activeQuizList, setActiveQuizList] = useState("");
    const [attemptQuestion, setAttemptQuestion] = useState(0);
    const focused = useIsFocused();
    let Flatlistref = useRef(null);

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showExplanation, setShowExplanation] = useState(false);
    const [correctAns, setCorrectAns] = useState('');
    const [selectedOption, setSelectedOption] = useState('');
    const [timeLeft, setTimeLeft] = useState(0); // 60 seconds for quiz
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (timeLeft > 0) {
                setTimeLeft(timeLeft - 1);
            } else {
                // handleNext();
                Alert.alert(APP_NAME, `Quiz completed.`,
                    [
                        {
                            text: "OK",
                            onPress: () => {
                                navigation.navigate('QuizResultScreen', {
                                    paramTotalQuestions: totalQuestions,
                                    paramTotalScore: 100,
                                    paramAttemptQuestions: attemptQuestion,
                                    paramScore: score
                                });
                            },
                            style: "cancel"
                        },

                    ]
                );
            }
        }, 1000 * 60);
        return () => clearTimeout(timer);
    }, [timeLeft]);

    useEffect(() => {
        if (focused) {
            getActiveQuizList();
        }
    }, [focused]);

    // quiz list api
    const getActiveQuizList = async () => {

        try {
            setLoading(true);

            const token = await getSession(TOKEN);
            const role = await getSession(ROLE);

            const myHeaders = new Headers();
            myHeaders.append("Authorization", "Bearer " + token.split('|')[1].trim());

            const formdata = new FormData();
            formdata.append("quiz_id", paramItem?.quiz_id);

            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: formdata,
                redirect: "follow"
            };

            CustomConsole("API: " + QUIZ_DETAILS);
            CustomConsole(formdata);
            fetch(QUIZ_DETAILS, requestOptions)
                .then((response) => response.json())
                .then((json) => {
                    CustomConsole(json);

                    if (json.status == 1) {
                        // success response
                        setActiveQuizList(json.quiz_list);
                        setQuestionList(json.quiz_details.questions);
                        setTimeLeft(json.quiz_details.total_time);
                        setTotalQuestion(json.quiz_details.total_questions);
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

    // option pressed method
    const handleOptionPress = (selectedOption) => {
        CustomConsole(selectedOption);
        setSelectedOption(selectedOption.option_id);
        if (selectedOption.option_text === questionList[currentQuestion].question_text) {
            setScore(score + 1);
            setCorrectAns('1');
            setAttemptQuestion(attemptQuestion + 1);
            setProgress(((currentQuestion + 1) * 100) / totalQuestions);
        } else {
            setCorrectAns('0');
            setShowExplanation(true);
            setAttemptQuestion(attemptQuestion + 1);
            setProgress(((currentQuestion + 1) * 100) / totalQuestions);
        }
    };

    // handle next button press
    const handleNext = () => {
        if (currentQuestion < questionList.length - 1) {
            setCorrectAns('');
            setSelectedOption('');
            setCurrentQuestion(currentQuestion + 1);
            setShowExplanation(false);
        } else {
            // Quiz ends
            // Navigate to result screen or show result
            Alert.alert(APP_NAME, `Quiz completed.`,
                [
                    {
                        text: "OK",
                        onPress: () => {
                            navigation.navigate('QuizResultScreen', {
                                paramTotalQuestions: totalQuestions,
                                paramTotalScore: 100,
                                paramAttemptQuestions: attemptQuestion,
                                paramScore: score
                            });
                        },
                        style: "cancel"
                    },

                ]
            );
        }
    };

    return (
        <View style={externalStyles.coloredContainer}>

            {/* header view */}
            <View style={externalStyles.headerView}>
                <Pressable style={externalStyles.headerIconView} onPress={() => navigation.goBack()}>
                    <Image source={images.back_arrow} style={externalStyles.headerIcon} />
                </Pressable>
                <Text style={externalStyles.headerText}>{paramItem.quiz_title}</Text>
            </View>
            {/* end of header view */}

            {loading ? coloredProgressView(loading) :
                <>
                    <ScrollView>
                        <View style={{ marginHorizontal: SW(37) }}>
                          
                            {/* progress bar view */}
                            <View style={{ marginTop: SH(31), marginBottom: SH(27) }}>
                                <Progress.Bar progress={progress / 100} width={Dimensions.get('window').width - 64} color={colors.themeColor} unfilledColor={"#D9D9D9"} borderWidth={0} height={11} />
                            </View>
                            {/* end of progress bar view */}

                            {/* timer view */}
                            <View style={{ flexDirection: "row", alignItems: "center", alignSelf: "flex-end" }}>
                                <Text style={{ color: colors.white, fontSize: SF(18), fontFamily: getMediumFont(), marginRight: SW(14) }}>Timer</Text>
                                <View style={{ flexDirection: "row", alignItems: "center", borderWidth: 1, borderColor: colors.themeColor, backgroundColor: colors.timerBackground, borderRadius: 5, paddingVertical: 5, paddingHorizontal: 7 }}>
                                    <Image source={images.timer_icon} style={{ height: SH(20), width: SH(20), resizeMode: "contain" }} />
                                    <Text style={{ fontFamily: getPopMediumFont(), fontSize: SF(15), color: colors.black, marginLeft: 5, marginTop: 5 }}>{timeLeft} min</Text>
                                </View>
                            </View>
                            {/* end of timer view */}


                            {/* quiz section */}
                            <View style={{ borderRadius: 40, paddingHorizontal: SW(27), backgroundColor: colors.white, marginTop: SH(100), paddingBottom: SH(37) }}>

                                {/* question no vew */}
                                <View style={{
                                    flex: 1,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>

                                    <View style={[{
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }, { width: 38 * 2, height: 38 * 2, borderRadius: 38, backgroundColor: colors.white, zIndex: 1, top: -38 }]}>
                                        <Text style={{ color: colors.themeGreenColor, fontFamily: getPopMediumFont(), fontSize: SF(23), textAlign: "center" }}>{currentQuestion + 1}</Text>
                                    </View>

                                    <View style={[{
                                        width: 50 * 2,
                                        height: 50,
                                        overflow: 'hidden',
                                    }, { borderTopLeftRadius: 50, borderTopRightRadius: 50, backgroundColor: colors.white, position: "absolute", top: -48 }]}>
                                    </View>
                                    <View style={[{
                                        width: 45 * 2,
                                        height: 45,
                                        overflow: 'hidden',
                                    }, { borderTopLeftRadius: 45, borderTopRightRadius: 45, backgroundColor: colors.themeGreenColor, position: "absolute", top: -45 }]}>
                                    </View>
                                </View>
                                {/* end of question no view */}

                                {/* question view */}
                                <View style={{ borderWidth: 1, borderColor: colors.themeGreenColor, borderRadius: 11, paddingVertical: 15, paddingHorizontal: 21, marginTop: -15 }}>
                                    <Text style={{ color: colors.questionText, fontFamily: getPopMediumFont(), fontSize: SF(15), textAlign: 'justify' }}>{questionList[currentQuestion]?.question_text}</Text>
                                </View>
                                {/* question */}

                                {/* option view */}
                                <View style={{ marginTop: SH(39) }}>

                                    {questionList[currentQuestion]?.question_options?.map(option => (
                                        <Pressable onPress={() => handleOptionPress(option)}
                                            style={{
                                                backgroundColor: (correctAns == '1' && selectedOption == option.option_id) ? colors.themeYellowColor : (correctAns == '0' && selectedOption == option.option_id) ? colors.themeColor : colors.white,
                                                borderWidth: selectedOption == option.option_id ? 0 : 1, borderColor: colors.optionBorder, borderRadius: 11, paddingVertical: 15, paddingHorizontal: 21, marginBottom: SH(22)
                                            }}>
                                            <Text style={{ color: selectedOption == option.option_id ? colors.white : colors.questionText, fontFamily: getPopMediumFont(), fontSize: SF(15), textAlign: 'justify' }}>{option.option_text}</Text>
                                        </Pressable>
                                    ))}

                                </View>
                                {/* end of option view */}

                                {showExplanation && (
                                    <View style={{ borderWidth: 1, borderColor: colors.themeColor, borderRadius: 11, paddingVertical: 15, paddingHorizontal: 21, }}>
                                        <Text style={{ color: colors.questionText, fontFamily: getPopMediumFont(), fontSize: SF(15), textAlign: 'justify' }}>{`Explanation: ${questionList[currentQuestion]?.answer_explained}`}</Text>
                                    </View>
                                )}

                                {/* next button */}
                                <Pressable onPress={handleNext}
                                    style={{ backgroundColor: colors.themeYellowColor, alignSelf: "center", paddingHorizontal: 14, paddingVertical: 13, borderRadius: 10, marginTop: 54 }}>
                                    <Text style={{ color: colors.white, fontFamily: getPopMediumFont(), fontSize: SF(18) }}>{currentQuestion < questionList.length - 1 ? "Next" : "Complete"}</Text>
                                </Pressable>
                                {/* end of next button */}

                            </View>
                            {/* end of quiz section */}

                        </View>
                    </ScrollView>
                </>}
        </View>
    );
};