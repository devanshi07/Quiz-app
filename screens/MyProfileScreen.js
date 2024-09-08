import { DrawerActions, useIsFocused, useNavigation } from "@react-navigation/native";
import { Alert, Dimensions, FlatList, Image, ImageBackground, Pressable, ScrollView, Text, View } from "react-native";
import { externalStyles } from "../common/styles";
import images from "../assets/images";
import { colors } from "../common/color";
import { TextInput } from "react-native-paper";
import { CustomConsole, alertDialogDisplay, getMediumFont, getPopBoldFont, getPopMediumFont, getPopSemiBoldFont, getSemiBoldFont, progressView } from "../common/utils";
import { ACTIVE_QUIZ, DELETE_ACCOUNT, GET_PROFILE, LOGIN, LOGOUT, SLIDER_DETAILS, SLIDER_LIST } from "../common/webUtils";
import { useEffect, useRef, useState } from "react";
import { AVATAR, EMAIL, FCM_TOKEN, PHONE, ROLE, TOKEN, USER_ID, USER_NAME, clearAsyncStorage, getSession, saveSession } from "../common/LocalStorage";
import { SF, SH, SW } from "../common/dimensions";
import { APP_NAME } from "../common/string";

export default function MyProfileScreen({ navigation }) {

    const [loading, setLoading] = useState(false);
    const [user_name, setUserName] = useState("");
    const [user_email, setUserEmail] = useState("");
    const [user_phone, setUserPhone] = useState("");
    const [designation, setDesignation] = useState("");
    const [avatar, setAvatar] = useState("");
    const [profilePic, setProfilePic] = useState("");
    const focused = useIsFocused();
    let Flatlistref = useRef(null);

    useEffect(() => {
        if (focused) {
            getProfile();
        }
    }, [focused]);

    // profile api
    const getProfile = async () => {

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

            fetch(GET_PROFILE, requestOptions)
                .then((response) => response.json())
                .then((json) => {
                    CustomConsole(json);

                    if (json.status == 1) {
                        // success response

                        setUserName(json.data.user_name);
                        setUserEmail(json.data.user_email);
                        setUserPhone(json.data.user_phone);
                        setDesignation(json.data.designation);
                        setAvatar(json.data.avatar);
                        setProfilePic(json.data.profile_pic);
                        setLoading(false);
                    }
                    else {
                        // other reponse status
                        setLoading(false);
                    }

                })
                .catch((error) => {
                    setLoading(false);
                    CustomConsole("Profile Api Error: " + error);
                });
        } catch (error) {
            setLoading(false);
            CustomConsole("Profile Api Exception: " + error);
        }
    }

    // logout function
    const logoutFunction = async () => {
        Alert.alert(APP_NAME, 'Are you sure you want to log out?', [
            {
                text: 'Cancel',
                onPress: () => null,
                style: 'cancel',
            },
            {
                text: 'YES', onPress: async () => {

                    try {
                        const token = await getSession(TOKEN);
                        const myHeaders = new Headers();
                        myHeaders.append("Authorization", "Bearer " + token.split('|')[1].trim());

                        const requestOptions = {
                            method: "POST",
                            headers: myHeaders,
                            redirect: "follow"
                        };

                        setLoading(true);
                        fetch(LOGOUT, requestOptions)
                            .then((response) => response.json())
                            .then((json) => {
                                CustomConsole(json);
                                clearAsyncStorage();
                                navigation.navigate("LoginScreen");
                                navigation.reset({
                                    index: 0,
                                    routes: [{ name: 'LoginScreen' }],
                                });
                            })
                            .catch((error1) => {
                                setLoading(false);
                                CustomConsole("Logout Api Error: " + error1);
                            });
                    } catch (error) {
                        setLoading(false);
                        CustomConsole("Logout Api Exception: " + error);
                    }
                }
            },
        ]);
    }

    // delete function
    const deleteFunction = async () => {
        Alert.alert(APP_NAME, 'Are you sure you want to delete this account?', [
            {
                text: 'Cancel',
                onPress: () => null,
                style: 'cancel',
            },
            {
                text: 'YES', onPress: async () => {

                    try {
                        const token = await getSession(TOKEN);
                        const user_id = await getSession(USER_ID);
                        const myHeaders = new Headers();
                        myHeaders.append("Authorization", "Bearer " + token.split('|')[1].trim());

                        const requestOptions = {
                            method: "GET",
                            headers: myHeaders,
                            redirect: "follow"
                        };

                        CustomConsole(DELETE_ACCOUNT + user_id);

                        setLoading(true);
                        fetch(DELETE_ACCOUNT + user_id, requestOptions)
                            .then((response) => response.json())
                            .then((json) => {
                                CustomConsole(json);
                                clearAsyncStorage();
                                navigation.navigate("LoginScreen");
                                navigation.reset({
                                    index: 0,
                                    routes: [{ name: 'LoginScreen' }],
                                });
                            })
                            .catch((error1) => {
                                setLoading(false);
                                CustomConsole("Delete account Api Error: " + error1);
                            });
                    } catch (error) {
                        setLoading(false);
                        CustomConsole("Delete account Api Exception: " + error);
                    }
                }
            },
        ]);
    }

    return (
        <View style={externalStyles.coloredContainer}>

            {/* header view */}
            <View style={{ flexDirection: "row", alignItems: "center", marginHorizontal: SW(12), marginTop: SH(28.87) }}>
                <Pressable style={{ padding: 10 }} onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
                    <Image source={images.drawer_menu} style={{ height: SH(40), width: SH(40), resizeMode: "contain", tintColor: colors.white }} />
                </Pressable>
                <Text style={{ color: colors.white, fontSize: SF(18), fontFamily: getPopMediumFont() }}>My Profile</Text>
            </View>
            {/* end of header view */}

            {loading ? progressView(loading) :
                <>
                    <ScrollView>
                        <View style={{ marginHorizontal: SW(37) }}>

                            {/* profile section */}
                            <View style={{ borderRadius: 40, paddingHorizontal: SW(27), backgroundColor: colors.white, marginTop: SH(100), paddingBottom: SH(37) }}>

                                {/* profile photo vew */}
                                <View style={{
                                    flex: 1,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>

                                    <View style={[{
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }, { width: 38 * 2, height: 38 * 2, borderRadius: 38, backgroundColor: '#EAEBED', zIndex: 1, top: -38, borderWidth: 1, borderColor: colors.themeGreenColor }]}>
                                        <Image source={{ uri: profilePic != "" ? profilePic : avatar }} style={{ width: 38 * 2, height: 38 * 2, resizeMode: "cover", borderRadius: 38 }} />
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
                                {/* end of profile photo view */}

                                {/* update avatar button */}
                                <Pressable onPress={() => navigation.navigate('AvatarUpdateScreen', { paramImage: avatar, paramName: user_name, paramMobile: user_phone })}
                                    style={{ backgroundColor: colors.themeColor, borderRadius: 11, paddingHorizontal: SW(13), paddingVertical: SH(7), alignSelf: "center" }}>
                                    <Text style={{ color: colors.white, fontSize: SF(22), fontFamily: getPopSemiBoldFont() }}>{"Update Avatar"}</Text>
                                </Pressable>
                                {/* end of update avatar button */}

                                {/* profile details view */}
                                <View style={{ marginTop: SH(64) }}>

                                    <View
                                        style={{
                                            backgroundColor: colors.white,
                                            borderWidth: 1, borderColor: colors.optionBorder, borderRadius: 11, paddingVertical: 15, paddingHorizontal: 21, marginBottom: SH(22)
                                        }}>
                                        <Text style={{ color: colors.questionText, fontFamily: getPopMediumFont(), fontSize: SF(15), textAlign: 'center' }}>{user_name}</Text>
                                    </View>

                                    <View
                                        style={{
                                            backgroundColor: colors.white,
                                            borderWidth: 1, borderColor: colors.optionBorder, borderRadius: 11, paddingVertical: 15, paddingHorizontal: 21, marginBottom: SH(22)
                                        }}>
                                        <Text style={{ color: colors.questionText, fontFamily: getPopMediumFont(), fontSize: SF(15), textAlign: 'center' }}>{user_email}</Text>
                                    </View>

                                    <View
                                        style={{
                                            backgroundColor: colors.white,
                                            borderWidth: 1, borderColor: colors.optionBorder, borderRadius: 11, paddingVertical: 15, paddingHorizontal: 21, marginBottom: SH(22)
                                        }}>
                                        <Text style={{ color: colors.questionText, fontFamily: getPopMediumFont(), fontSize: SF(15), textAlign: 'center' }}>{user_phone}</Text>
                                    </View>


                                    <Pressable onPress={logoutFunction}
                                        style={{ backgroundColor: colors.themeColor, borderRadius: 11, paddingHorizontal: SW(13), paddingVertical: SH(7), alignSelf: "center", marginTop: SH(30) }}>
                                        <Text style={{ color: colors.white, fontSize: SF(22), fontFamily: getPopSemiBoldFont() }}>{"Logout"}</Text>
                                    </Pressable>
                                    <Pressable onPress={deleteFunction}
                                        style={{ backgroundColor: colors.themeColor, borderRadius: 11, paddingHorizontal: SW(13), paddingVertical: SH(7), alignSelf: "center", marginTop: SH(15) }}>
                                        <Text style={{ color: colors.white, fontSize: SF(22), fontFamily: getPopSemiBoldFont() }}>{"Delete Account"}</Text>
                                    </Pressable>
                                </View>
                                {/* end of profile details view */}

                            </View>
                            {/* end of profile section */}

                        </View>
                    </ScrollView>
                </>}
        </View>
    );
};