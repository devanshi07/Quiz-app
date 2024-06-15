import React, { useState, useRef, useEffect } from 'react';
import { Alert, FlatList, Image, ImageBackground, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, } from 'react-native';
import { externalStyles } from '../common/styles';
import { colors } from '../common/color';
import { CustomConsole, alertDialogDisplay, getBoldFont, getPopMediumFont, progressView, validateEmail } from '../common/utils';
import { useIsFocused } from '@react-navigation/native';
import { APP_NAME } from '../common/string';
import { CONTACT_US } from '../common/webUtils';
import images from '../assets/images';
import { SF, SH, SW } from '../common/dimensions';

export function FeedbackFormScreen({ navigation, route }) {

    const focused = useIsFocused();
    var onlyDigitReg = /^\d+$/;

    const [title, setTitle] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [query, setQuery] = useState("");
    const [selectedValue, setSelectedValue] = useState("");
    const [phoneNo, setPhoneNo] = useState('');
    const [loading, setLoading] = useState(false);

    // add query api call
    async function onSubmit() {
        try {
            // if (title.trim().length == 0) {
            //     alertDialogDisplay(APP_NAME, "Please enter title");
            // }
            if (name.trim().length == 0) {
                alertDialogDisplay(APP_NAME, "Please enter name");
            }
            // else if (email.trim().length == 0) {
            //     alertDialogDisplay(APP_NAME, "Please enter email");
            // }
            else if (email != "" && !validateEmail(email)) {
                alertDialogDisplay(APP_NAME, "Please enter proper email");
            }
            else if (phoneNo.trim().length == 0) {
                Alert.alert(APP_NAME, "Enter Mobile Number");
            }
            else if (!onlyDigitReg.test(phoneNo)) {
                Alert.alert(APP_NAME, "Mobile Number should be only digits");
            }
            else if (query.trim().length == 0) {
                alertDialogDisplay(APP_NAME, "Please enter query");
            }
            else {
                // alertDialogDisplay(APP_NAME, "success");
                setLoading(true);
                const formdata = new FormData();
                formdata.append("name", name);
                if (email !== "") {
                    formdata.append("email", email);
                }
                formdata.append("description", query);
                formdata.append("phone", phoneNo);

                const requestOptions = {
                    method: "POST",
                    body: formdata,
                    redirect: "follow"
                };

                CustomConsole(formdata);

                fetch(CONTACT_US, requestOptions)
                    .then((response) => response.json())
                    .then((json) => {
                        CustomConsole(json);

                        if (json.status == 1) {
                            // success response
                            alertDialogDisplay(APP_NAME, json.message);
                            setName('');
                            setEmail('');
                            setQuery('');
                            setPhoneNo('');
                            setLoading(false);
                        }
                        else {
                            // other reponse status
                            setLoading(false);
                        }

                    })
                    .catch((error) => {
                        setLoading(false);
                        CustomConsole("Add query Api Error: " + error);
                    });
            }
        } catch (error) {
            setLoading(false);
            CustomConsole("Add query Api Exception: " + error);
        }
    }

    return (
        <View style={externalStyles.container}>

            {/* header view */}
            <View style={{ flexDirection: "row", alignItems: "center", marginHorizontal: SW(12), marginTop: SH(28.87) }}>
                <Pressable style={{ padding: 10 }} onPress={() => navigation.goBack()}>
                    <Image source={images.back_arrow} style={{ height: SH(23), width: SH(23), resizeMode: "contain", tintColor: colors.black }} />
                </Pressable>
                <Text style={{ color: colors.black, fontSize: SF(18), fontFamily: getPopMediumFont() }}>Feedback form</Text>
            </View>
            {/* end of header view */}

            {/* loader view */}
            {loading ? progressView(loading) :
                <ScrollView keyboardShouldPersistTaps="always" style={externalStyles.query_scrollview}>

                    <View style={externalStyles.query_mainview}>



                        {/* query form */}
                        <View style={externalStyles.query_formView}>

                            <View style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>

                                <View style={{
                                    width: 137,
                                    height: 137,
                                    backgroundColor: colors.themeColor,
                                    borderRadius: 360,
                                    top: -105,
                                    alignItems:"center",
                                    justifyContent:"flex-end"
                                }}>
                                <View style={[{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }, { width: 130, height: 130, borderRadius: 360, backgroundColor: colors.white, zIndex: 1 }]}>
                                    <Text style={{ color: colors.themeColor, fontFamily: getPopMediumFont(), fontSize: SF(23), textAlign: "center" }}>01</Text>
                                </View>
                                </View>
                            </View>

                            {/* name */}
                            <TextInput
                                style={externalStyles.query_formTextinput}
                                value={name}
                                onChangeText={txt => { setName(txt); }}
                                placeholderTextColor={colors.black}
                                placeholder="Full Name" />
                            {/* end of name */}

                            {/* email */}
                            <TextInput
                                style={externalStyles.query_formTextinput}
                                value={email}
                                onChangeText={txt => { setEmail(txt) }}
                                placeholderTextColor={colors.black}
                                inputMode="email"
                                keyboardType="email-address"
                                placeholder="Enter Email" />
                            {/* end of email */}

                            {/* name */}
                            <TextInput
                                style={externalStyles.query_formTextinput}
                                value={phoneNo}
                                onChangeText={txt => { setPhoneNo(txt); }}
                                placeholderTextColor={colors.black}
                                keyboardType="number-pad"
                                inputMode="numeric"
                                placeholder="Mobile Number" />
                            {/* end of name */}

                            {/* query */}
                            <TextInput
                                style={externalStyles.query_formTextarea}
                                value={query}
                                multiline={true}
                                onChangeText={txt => { setQuery(txt) }}
                                placeholderTextColor={colors.black}
                                placeholder="Enter Query" />
                            {/* end of query */}

                            {/* submit button */}
                            <Pressable onPress={onSubmit}
                                style={externalStyles.query_submitbutton}>
                                <Text style={externalStyles.query_submitbuttonText}>Submit</Text>
                            </Pressable>
                            {/* end of submit button */}

                            {/* <Pressable onPress={() => navigation.navigate("CommonWeb")} style={externalStyles.query_privacyView}>
                                <Text style={externalStyles.query_privacyText}>Privacy Policy</Text>
                            </Pressable> */}

                        </View>
                        {/* end of query form */}

                    </View>



                </ScrollView>}
            {/* end of loader view */}



        </View>
    );
}
