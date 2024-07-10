import { useIsFocused, useNavigation } from "@react-navigation/native";
import { Alert, Button, Dimensions, FlatList, Image, ImageBackground, Modal, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { externalStyles } from "../common/styles";
import images from "../assets/images";
import { colors } from "../common/color";
import { TextInput } from "react-native-paper";
import { CustomConsole, alertDialogDisplay, coloredProgressView, getMediumFont, getPopMediumFont, getPopSemiBoldFont, getSemiBoldFont, progressView } from "../common/utils";
import { ACTIVE_QUIZ, LOGIN, QUIZ_DETAILS, QUIZ_SUBMIT, SLIDER_DETAILS, SLIDER_LIST, TOTAL_QUIZ_ATTENDANCE } from "../common/webUtils";
import { useEffect, useRef, useState } from "react";
import { AVATAR, EMAIL, FCM_TOKEN, PHONE, ROLE, TOKEN, USER_ID, USER_NAME, getSession, saveSession } from "../common/LocalStorage";
import { SF, SH, SW } from "../common/dimensions";
import { APP_NAME } from "../common/string";
import * as Progress from 'react-native-progress';
import WebView from "react-native-webview";

export default function QuizScreen({ navigation, route }) {

    const paramItem = route.params !== undefined && route.params.paramItem !== undefined ? route.params.paramItem : null

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
    const [correctAns, setCorrectAns] = useState(0);
    const [selectedOption, setSelectedOption] = useState('');
    const [timeLeft, setTimeLeft] = useState(0); // 60 seconds for quiz
    const [progress, setProgress] = useState(0);
    const [answerArr, setAnswerArr] = useState([]);
    const [isAnswered, setIsAnswered] = useState(false);
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [timerRunning, setTimerRunning] = useState(false);
    const [typeModal, setTypeModal] = useState(false);
    const [totalParticipants, setTotalParticipants] = useState(0);

    // modal hide/show
    const showTypeModal = (text) => {
        setTypeModal(true);
    };
    const hideTypeModal = () => setTypeModal(false);

    // Function to format time in hh:mm:ss
    const formatTime = (seconds) => {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = Math.floor(seconds % 60);
        return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    useEffect(() => {
        let timer
        if (timerRunning) {
            if (timerRunning) {
                timer = setTimeout(() => {
                    if (timeLeft > 0) {
                        setTimeLeft(timeLeft - 1);
                    } else {
                        showTypeModal();
                        // Alert.alert(APP_NAME, `Quiz completed.`,
                        //     [
                        //         {
                        //             text: "OK",
                        //             onPress: () => {
                        //                 setTimerRunning(false);
                        //                 submitQuiz();
                        //             },
                        //             style: "cancel"
                        //         },

                        //     ]
                        // );
                    }
                }, 1000);
            }
        }
        // const timer = setTimeout(() => {
        //     if (timeLeft > 0) {
        //         setTimeLeft(timeLeft - 1);
        //     } else {
        //         // handleNext();
        //         Alert.alert(APP_NAME, `Quiz completed.`,
        //             [
        //                 {
        //                     text: "OK",
        //                     onPress: () => {
        //                         // navigation.navigate('QuizResultScreen', {
        //                         //     paramTotalQuestions: totalQuestions,
        //                         //     paramTotalScore: 100,
        //                         //     paramAttemptQuestions: attemptQuestion,
        //                         //     paramScore: score
        //                         // });
        //                         submitQuiz();
        //                     },
        //                     style: "cancel"
        //                 },

        //             ]
        //         );
        //     }
        // }, 1000); // 15 min = 1000 * 15
        return () => clearTimeout(timer);
    }, [timeLeft, timerRunning]);

    // total attendations of quiz
    useEffect(() => {
        const fetchData = async () => {
            try {
                CustomConsole("interval called===>")
                // const response = await fetch(TOTAL_QUIZ_ATTENDANCE);
                // const result = await response.json();
                setTotalParticipants(prev=> prev + 1);
            } catch (err) {
                setError(err);
            }
        };

        fetchData(); // Initial fetch

        const interval = setInterval(fetchData, 5000); // Fetch every 5 seconds

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, []);

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
                        setTimeLeft(json.quiz_details.total_time * 60);
                        setStartTime(formatTime(json.quiz_details.total_time * 60));
                        setTotalQuestion(json.quiz_details.total_questions);
                        setTimerRunning(true);
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

    // submit quiz
    const submitQuiz = async () => {
        try {
            const token = await getSession(TOKEN);
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", "Bearer " + token.split('|')[1].trim());

            let raw;
            if (answerArr.length == 0) {
                raw = JSON.stringify({
                    "quiz_id": paramItem?.quiz_id,
                    "start_time": startTime,
                    "end_time": formatTime(timeLeft)

                });
            } else {
                raw = JSON.stringify({
                    "quiz_id": paramItem?.quiz_id,
                    "start_time": startTime,
                    "end_time": formatTime(timeLeft),
                    "answers": answerArr
                });
            }

            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: raw,
                redirect: "follow"
            };

            CustomConsole("API: " + QUIZ_SUBMIT);
            CustomConsole(raw);
            setLoading(true);
            fetch(QUIZ_SUBMIT, requestOptions)
                .then((response) => response.json())
                .then((json) => {
                    CustomConsole(json);
                    if (json.status == 1) {
                        navigation.navigate('QuizResultScreen', {
                            paramTotalQuestions: totalQuestions,
                            paramTotalScore: 100,
                            paramAttemptQuestions: attemptQuestion,
                            paramScore: (correctAns * 100) / totalQuestions
                        });
                    } else {
                        setLoading(false);
                    }
                })
                .catch((error1) => {
                    setLoading(false);
                    CustomConsole("Submit quiz Api Error: " + error1);
                });

        } catch (error) {
            setLoading(false);
            CustomConsole("Submit Quiz Api Exception: " + error);
        }
    }

    // option pressed method
    // const handleOptionPress = (selectedOption, question_id) => {
    //     CustomConsole(selectedOption);
    //     setSelectedOption(selectedOption.option_id);
    //     if (selectedOption.is_currect === 1) {
    //         setScore(score + 1);
    //         setCorrectAns('1');
    //         setAttemptQuestion(attemptQuestion + 1);
    //         setProgress(((currentQuestion + 1) * 100) / totalQuestions);
    //         answerArr.push({
    //             "question_id": question_id,
    //             "answer_id": selectedOption.option_id
    //         });
    //         setShowExplanation(false);

    //     } else {
    //         setCorrectAns('0');
    //         setShowExplanation(true);
    //         setAttemptQuestion(attemptQuestion + 1);
    //         setProgress(((currentQuestion + 1) * 100) / totalQuestions);
    //         answerArr.push({
    //             "question_id": question_id,
    //             "answer_id": selectedOption.option_id
    //         });
    //     }

    //     handleNext();
    // };

    const handleOptionPress = (index, selectedOption, question_id) => {
        if (!isAnswered) {
            if (selectedOption.is_currect === 1) {
                setCorrectAns(correctAns + 1);
            }
            setSelectedOption(index);
            setIsAnswered(true);
            setAttemptQuestion(attemptQuestion + 1);
            setProgress(((currentQuestion + 1) * 100) / totalQuestions);
            answerArr.push({
                "question_id": question_id,
                "answer_id": selectedOption.option_id
            });
        }
    };

    const getOptionStyle = (index) => {
        if (!isAnswered) return styles.option;
        if (index === selectedOption && questionList[currentQuestion].question_options[index].is_currect === 0) return styles.wrongOption;
        if (index === selectedOption && questionList[currentQuestion].question_options[index].is_currect === 1) return styles.correctOption;
        // if (questionList[currentQuestion].question_options[index].is_currect === 1) return styles.correctOption;
        return styles.option;
    };

    const getOptionTextStyle = (index) => {
        if (!isAnswered) return styles.optionText;
        if (index === selectedOption && questionList[currentQuestion].question_options[index].is_currect === 0) return styles.wrongOptionText;
        if (index === selectedOption && questionList[currentQuestion].question_options[index].is_currect === 1) return styles.correctOptionText;
        // if (questionList[currentQuestion].question_options[index].is_currect === 1) return styles.correctOptionText;
        return styles.optionText;
    };

    const shouldShowExplanation = () => {
        if (!isAnswered) return false;
        return questionList[currentQuestion].question_options[selectedOption].is_currect === 0;
    };

    const getExplanation = () => {
        if (!isAnswered) return null;
        if (questionList[currentQuestion].question_options[selectedOption].is_currect === 0) {
            const correctOption = questionList[currentQuestion].question_options.find(option => option.is_currect === 1);
            return (
                <View style={styles.explanationContainer}>
                    <Text style={styles.correctAnswer}>Correct answer: {correctOption.option_text}</Text>
                    <Text style={styles.explanation}>Explanation: {questionList[currentQuestion].answer_explained}</Text>
                </View>
            );
        }
        return null;
    };

    // handle next button press
    const handleNext = () => {
        setIsAnswered(false);
        if (currentQuestion < questionList.length - 1) {

            setSelectedOption('');
            setCurrentQuestion(currentQuestion + 1);
            setShowExplanation(false);
        } else {
            // Quiz ends
            // Navigate to result screen or show result
            setTimerRunning(false);
            CustomConsole(answerArr);
            submitQuiz();
            // Alert.alert(APP_NAME, `Quiz completed.`,
            //     [
            //         {
            //             text: "OK",
            //             onPress: () => {
            //                 navigation.navigate('QuizResultScreen', {
            //                     paramTotalQuestions: totalQuestions,
            //                     paramTotalScore: 100,
            //                     paramAttemptQuestions: attemptQuestion,
            //                     paramScore: score
            //                 });
            //             },
            //             style: "cancel"
            //         },

            //     ]
            // );

        }
    };

    const injectedJavaScript = `
    document.querySelectorAll('video').forEach(video => {
      video.autoplay = false;
      video.pause();
    });
  `;
    return (
        <View style={externalStyles.coloredContainer}>

            {/* header view */}
            <View style={externalStyles.headerView}>
                <Pressable style={externalStyles.headerIconView} onPress={() => navigation.goBack()}>
                    <Image source={images.back_arrow} style={externalStyles.headerIcon} />
                </Pressable>
                <Text style={externalStyles.headerText}>{paramItem?.quiz_title}</Text>
            </View>
            {/* end of header view */}

            {loading ? coloredProgressView(loading) :
                <>
                    <ScrollView>
                        <View style={{ marginHorizontal: SW(27), marginBottom: SH(20) }}>

                            {/* progress bar view */}
                            <View style={{ marginTop: SH(31), marginBottom: SH(27) }}>
                                <Progress.Bar progress={progress / 100} width={Dimensions.get('window').width - 64} color={colors.themeColor} unfilledColor={"#D9D9D9"} borderWidth={0} height={11} />
                            </View>
                            {/* end of progress bar view */}

                            {/* timer view */}
                            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <Text style={{ color: colors.white, fontSize: SF(18), fontFamily: getMediumFont(), marginRight: SW(14)  }}>Participants</Text>
                                    <View style={{ flexDirection: "row", alignItems: "center", borderWidth: 1, borderColor: colors.themeColor, backgroundColor: colors.timerBackground, borderRadius: 5, paddingVertical: 5, paddingHorizontal: 7 }}>
                                        <Image source={images.fill_user} style={{ height: SH(20), width: SH(20), resizeMode: "contain" }} />
                                        <Text style={{ fontFamily: getPopMediumFont(), fontSize: SF(15), color: colors.black, marginLeft: 5, marginTop: 5 }}>{totalParticipants}</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <Text style={{ color: colors.white, fontSize: SF(18), fontFamily: getMediumFont(), marginRight: SW(14) }}>Timer</Text>
                                    <View style={{ flexDirection: "row", alignItems: "center", borderWidth: 1, borderColor: colors.themeColor, backgroundColor: colors.timerBackground, borderRadius: 5, paddingVertical: 5, paddingHorizontal: 7 }}>
                                        <Image source={images.timer_icon} style={{ height: SH(20), width: SH(20), resizeMode: "contain" }} />
                                        <Text style={{ fontFamily: getPopMediumFont(), fontSize: SF(15), color: colors.black, marginLeft: 5, marginTop: 5 }}>{formatTime(timeLeft)}</Text>
                                    </View>
                                </View>
                            </View>
                            {/* end of timer view */}

                            {/* quiz section */}
                            <View style={{ borderRadius: 40, paddingHorizontal: SW(27), backgroundColor: colors.white, marginTop: SH(70), paddingBottom: SH(37) }}>

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
                                <View style={{ borderWidth: 1, borderColor: colors.themeGreenColor, borderRadius: 11, paddingVertical: SH(15), paddingHorizontal: SW(21), marginTop: SH(-15) }}>
                                    <Text style={{ color: colors.questionText, fontFamily: getPopMediumFont(), fontSize: SF(15), textAlign: 'justify' }}>{questionList[currentQuestion]?.question_text}</Text>
                                </View>
                                {questionList[currentQuestion]?.question_media != "" ?
                                    <WebView
                                        source={{ uri: questionList[currentQuestion]?.question_media }}
                                        // source={{ uri: "https://www.computerhope.com/jargon/m/example.mp3" }}
                                        style={{ height: 200, marginTop: 10 }}
                                        mediaPlaybackRequiresUserAction={true}
                                        allowsInlineMediaPlayback={false}
                                        injectedJavaScript={injectedJavaScript}
                                    />
                                    : null
                                }
                                {/* question */}

                                {/* option view */}
                                <View style={{ marginTop: SH(39) }}>

                                    {questionList[currentQuestion]?.question_options?.map((option, index) => (
                                        // <Pressable
                                        //  key={option.option_id} onPress={() => handleOptionPress(option)}
                                        //     style={{
                                        //         backgroundColor: (correctAns == '1' && selectedOption == option.option_id) ? colors.themeYellowColor : (correctAns == '0' && selectedOption == option.option_id) ? colors.themeColor : colors.white,
                                        //         borderWidth: selectedOption == option.option_id ? 0 : 1, borderColor: colors.optionBorder, borderRadius: 11, paddingVertical: 15, paddingHorizontal: 21, marginBottom: SH(22)
                                        //     }}>
                                        <Pressable
                                            key={option.option_id}
                                            style={getOptionStyle(index)}
                                            onPress={() => handleOptionPress(index, option, questionList[currentQuestion]?.question_id)}
                                            disabled={isAnswered}>
                                            <Text style={getOptionTextStyle(index)}>{option.option_text}</Text>
                                        </Pressable>
                                    ))}

                                </View>
                                {/* end of option view */}

                                {getExplanation()}

                                {/* next button */}
                                <Pressable onPress={handleNext}
                                    style={{ backgroundColor: colors.themeYellowColor, alignSelf: "center", paddingHorizontal: SW(14), paddingVertical: SH(13), borderRadius: 10, marginTop: SH(54) }}>
                                    <Text style={{ color: colors.white, fontFamily: getPopMediumFont(), fontSize: SF(18) }}>{currentQuestion < questionList.length - 1 ? "Next" : "Complete"}</Text>
                                </Pressable>
                                {/* end of next button */}

                            </View>
                            {/* end of quiz section */}

                        </View>
                    </ScrollView>
                </>}

            <Modal
                onRequestClose={hideTypeModal}
                // transparent
                visible={typeModal}
                animationType={'slide'}
            >
                <View style={externalStyles.hospital_details_locateModalMainView} >
                    <View style={externalStyles.hospital_details_locateModalSubView} >

                        <Image source={images.timer_gif} style={{ width: SH(200), height: SH(200), resizeMode: "contain", alignSelf: "center" }}
                        />
                        <Text style={{ color: colors.black, fontFamily: getPopMediumFont(), fontSize: SF(20), textAlign: "center", marginTop: SH(20) }}>{"Oops! Time is over."}</Text>

                        {/* submit button */}
                        <Pressable
                            onPress={() => {
                                setTimerRunning(false);
                                submitQuiz();
                            }}
                            style={externalStyles.hospital_details_locateModalCancelView}>
                            <Text style={externalStyles.hospital_details_locateModalCancelText}>Submit</Text>
                        </Pressable>
                        {/* end of submit */}

                    </View>
                </View>
            </Modal>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    question: {
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 20,
    },
    option: {
        width: '100%',
        padding: 15,
        marginVertical: 5,
        backgroundColor: colors.white,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#828282"
    },
    correctOption: {
        width: '100%',
        padding: 15,
        marginVertical: 5,
        backgroundColor: 'green',
        borderRadius: 5,
    },
    wrongOption: {
        width: '100%',
        padding: 15,
        marginVertical: 5,
        backgroundColor: 'red',
        borderRadius: 5,
    },
    optionText: {
        textAlign: 'left',
        fontSize: SF(15),
        color: "#000",
        fontFamily: getPopMediumFont(),
    },
    correctOptionText: {
        textAlign: 'left',
        fontSize: SF(15),
        color: '#fff',
        fontFamily: getPopMediumFont(),
    },
    wrongOptionText: {
        textAlign: 'left',
        fontSize: SF(15),
        color: '#fff',
        fontFamily: getPopMediumFont(),
    },
    explanationContainer: {
        marginTop: 20,
        // alignItems: 'center',
        borderWidth: 1,
        borderColor: "#D9D9D9",
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 10
    },
    correctAnswer: {
        fontSize: SF(20),
        color: 'green',
        textAlign: 'left',
        marginBottom: 10,
    },
    explanation: {
        fontSize: SF(18),
        textAlign: 'left',
        color: '#828282', // red color for explanation
    },
});

