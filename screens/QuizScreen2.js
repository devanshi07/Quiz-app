import { useIsFocused, useNavigation } from "@react-navigation/native";
import { Alert, Animated, Button, Dimensions, FlatList, Image, ImageBackground, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { externalStyles } from "../common/styles";
import images from "../assets/images";
import { colors } from "../common/color";
import { TextInput } from "react-native-paper";
import { CustomConsole, alertDialogDisplay, coloredProgressView, getMediumFont, getPopMediumFont, getPopSemiBoldFont, getSemiBoldFont, progressView } from "../common/utils";
import { ACTIVE_QUIZ, LOGIN, QUIZ_DETAILS, QUIZ_SUBMIT, SLIDER_DETAILS, SLIDER_LIST } from "../common/webUtils";
import { useEffect, useRef, useState } from "react";
import { AVATAR, EMAIL, FCM_TOKEN, PHONE, ROLE, TOKEN, USER_ID, USER_NAME, getSession, saveSession } from "../common/LocalStorage";
import { SF, SH, SW } from "../common/dimensions";
import { APP_NAME } from "../common/string";
import * as Progress from 'react-native-progress';

const questions = [
    {
        question_id: 30,
        question_text: "HTTP full form",
        question_media: "",
        answer_explained: "HTTP stands for Hypertext Transfer Protocol.",
        question_options: [
            {
                option_id: 107,
                option_text: "Hypertext Transfer Protocol",
                is_currect: 1
            },
            {
                option_id: 108,
                option_text: "Hypertext Transfer Prototype",
                is_currect: 0
            },
            {
                option_id: 109,
                option_text: "Hypertext Transport Protocol",
                is_currect: 0
            },
            {
                option_id: 110,
                option_text: "Hyper Transfer Protoco",
                is_currect: 0
            }
        ]
    },
    {
        question_id: 31,
        question_text: "MS-Word is an example of _____",
        question_media: "",
        answer_explained: "MS-Word is an example of application software.",
        question_options: [
            {
                option_id: 111,
                option_text: "An operating system",
                is_currect: 0
            },
            {
                option_id: 112,
                option_text: "Application software",
                is_currect: 1
            },
            {
                option_id: 113,
                option_text: "A processing device",
                is_currect: 0
            },
            {
                option_id: 114,
                option_text: "An input device",
                is_currect: 0
            }
        ]
    }
];

export default function QuizScreen2({ navigation, route }) {

    const paramItem = route.params?.paramItem

    const [loading, setLoading] = useState(false);
    const [totalQuestions, setTotalQuestion] = useState(0);
    const [questionList, setQuestionList] = useState([]);
    const [attemptQuestion, setAttemptQuestion] = useState(0);
    const focused = useIsFocused();
    let Flatlistref = useRef(null);

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [correctAns, setCorrectAns] = useState('');

    const [timeLeft, setTimeLeft] = useState(0); // 60 seconds for quiz
    const [progress, setProgress] = useState(0);
    const [answerArr, setAnswerArr] = useState([]);

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [showExplanation, setShowExplanation] = useState(false);

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

    const handleOptionPress = (index) => {
        setSelectedOption(index);
    };

    const handleNextPress = (selectedOption, question_id) => {
        const currentQuestion = questions[currentQuestionIndex];
        if (currentQuestion.question_options[selectedOption].is_currect === 0) {
            setShowExplanation(true);
            setAttemptQuestion(attemptQuestion + 1);
            setProgress(((currentQuestion + 1) * 100) / totalQuestions);

            answerArr.push({
                "question_id": question_id,
                "answer_id": selectedOption.option_id
            });
        } else {
            setAttemptQuestion(attemptQuestion + 1);
            setProgress(((currentQuestion + 1) * 100) / totalQuestions);

            answerArr.push({
                "question_id": question_id,
                "answer_id": selectedOption.option_id
            });

            setShowExplanation(false);
            setSelectedOption(null);
            if (currentQuestionIndex < questions.length - 1) {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
            } else {
                // Quiz end
                Alert.alert("Quiz completed!");
            }
        }
    };

    const handleExplanationAcknowledged = () => {
        setShowExplanation(false);
        setSelectedOption(null);
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            // Quiz end
            Alert.alert("Quiz completed!");
        }
    };

    const getOptionStyle = (index) => {
        if (selectedOption === index) {
            return questions[currentQuestionIndex].question_options[index].is_currect === 1
                ? styles.correctOption
                : styles.wrongOption;
        }
        return styles.option;
    };

    const getOptionTextStyle = (index) => {
        if (selectedOption === index) {
            return questions[currentQuestionIndex].question_options[index].is_currect === 1
                ? styles.correctOptionText
                : styles.wrongOptionText;
        }
        return styles.optionText;
    };

    const animation = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(animation, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start();
    }, [questions]);

    return (
        <View style={styles.container}>
            <Text style={styles.question}>{questions[currentQuestionIndex].question_text}</Text>
            {questions[currentQuestionIndex].question_options.map((option, index) => {
                // const scale = animation.interpolate({
                //     inputRange: [0, 1],
                //     outputRange: [0.5, 1],
                // });
                const translateX = animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [500, 0], // Start from 500 (off-screen right) to 0 (on-screen)
                  });
              
                return (
                    <Animated.View style={{ transform: [{ translateX }] }}>

                        <TouchableOpacity
                            key={option.option_id}
                            style={getOptionStyle(index)}
                            onPress={() => handleOptionPress(index)}
                        >
                            <Text style={getOptionTextStyle(index)}>{option.option_text}</Text>
                        </TouchableOpacity>
                    </Animated.View>

                );
            }
            )}
            <Button
                title="Next"
                onPress={handleNextPress(selectedOption, questions[currentQuestionIndex].question_id)}
                disabled={selectedOption === null}
            />
            {showExplanation && (
                <View style={styles.explanationContainer}>
                    <Text style={styles.explanation}>
                        {questions[currentQuestionIndex].answer_explained}
                    </Text>
                    <Button
                        title="OK"
                        onPress={handleExplanationAcknowledged}
                    />
                </View>
            )}
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
        backgroundColor: '#ddd',
        borderRadius: 5,
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
        textAlign: 'center',
        fontSize: 18,
        color: '#000',
    },
    correctOptionText: {
        textAlign: 'center',
        fontSize: 18,
        color: '#fff',
    },
    wrongOptionText: {
        textAlign: 'center',
        fontSize: 18,
        color: '#fff',
    },
    explanationContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    explanation: {
        fontSize: 16,
        textAlign: 'center',
        color: '#ff0000', // red color for explanation
        marginBottom: 20,
    },
});