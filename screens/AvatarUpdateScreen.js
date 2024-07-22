import { useIsFocused, } from "@react-navigation/native";
import { FlatList, Image, Modal, Pressable, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { externalStyles } from "../common/styles";
import { CustomConsole, getPopMediumFont, getPopSemiBoldFont, getRegularFont, getSemiBoldFont, progressView } from "../common/utils";
import { ACTIVE_QUIZ, AVATAR_LIST, PROFILE_EDIT, SLIDER_DETAILS, SLIDER_LIST } from "../common/webUtils";
import { useEffect, useRef, useState } from "react";
import { AVATAR, DESIGNATION_ID, TOKEN, getSession, } from "../common/LocalStorage";
import moment from "moment";
import { SF, SH, SW } from "../common/dimensions";
import { colors } from "../common/color";
import images from "../assets/images";
import { launchCamera, launchImageLibrary, ImagePicker } from 'react-native-image-picker';
import * as Animatable from 'react-native-animatable'

export default function AvatarUpdateScreen({ navigation, route }) {

    const [loading, setLoading] = useState(false);
    const [imageList, setImageList] = useState([]);
    const [image, setImage] = useState('');
    const [userName, setUserName] = useState('');
    const [userPhone, setUserPhone] = useState('');
    const [avatar_id, setAvatarId] = useState('');
    const [imageUploadPath, setImageUploadPath] = useState(null);
    const [typeModal, setTypeModal] = useState(false);
    const focused = useIsFocused();

    // modal hide/show
    const showTypeModal = (text) => {
        setTypeModal(true);
    };
    const hideTypeModal = () => setTypeModal(false);

    useEffect(() => {
        if (focused) {
            if (route.params && route.params.paramImage) {
                setImage(route.params.paramImage);
            }
            if (route.params && route.params.paramName) {
                setUserName(route.params.paramName);
            }
            if (route.params && route.params.paramMobile) {
                setUserPhone(route.params.paramMobile);
            }
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
                        setImageList(json.data);
                        setLoading(false);
                    }
                    else {
                        // other reponse status
                        setLoading(false);
                    }
                })
                .catch((error) => {
                    setLoading(false);
                    CustomConsole("Avatar List Api Error: " + error);
                });
        } catch (error) {
            setLoading(false);
            CustomConsole("Avatar List Api Exception: " + error);
        }
    }

    // select image
    const openImagePicker = async () => {
        var options = {
            title: 'Select Profile Image',
            mediaType: 'photo',
        };
        const result = await launchImageLibrary(options);
        console.log("result==>", result);
        console.log("result==>", result.assets[0].uri);
        setImage(result.assets[0].uri);
        setImageUploadPath({ uri: result.assets[0].uri, name: result.assets[0].fileName, filename: result.assets[0].fileName, type: result.assets[0].type });
        console.log(imageUploadPath)
    }

    // quiz item view
    const renderQuizItem = ({ item, index }) => {
        if (item.plusImage) {
            return (
                <Animatable.View
                    animation={'zoomIn'}
                    duration={1000}
                    delay={index * 300}>
                    <Pressable onPress={openImagePicker}
                        style={{ alignItems: "center", borderRadius: 360, borderWidth: imageUploadPath != null ? 2 : 1, height: SH(130), width: SH(130), justifyContent: "center", margin: SH(20), opacity: imageUploadPath != null ? 0.5 : 1 }}>
                        {imageUploadPath != null ?
                            <Image source={{ uri: image }} style={{ height: SH(110), width: SH(110), resizeMode: "cover", borderRadius: 360, }} />
                            :
                            <>
                                <Image source={images.choose_image} style={{ width: SH(50), height: SH(50), resizeMode: "contain" }} />
                                <Text style={{ color: colors.black, fontFamily: getRegularFont(), fontSize: SF(15), textAlign: "center" }}>{"Choose\nAvatar"}</Text>
                            </>
                        }
                    </Pressable>
                </Animatable.View>
            );
        } else {
            return (
                <Animatable.View
                    animation={'zoomIn'}
                    duration={1000}
                    delay={index * 300}>

                <TouchableOpacity onPress={() => {
                    setImage(item.avatar_image);
                    setAvatarId(item.avatar_id);
                }}
                    style={{ margin: SH(20), borderWidth: image == item.avatar_image ? 3 : 0, borderRadius: 360, opacity: image == item.avatar_image ? 0.5 : 1 }}>
                    <Image source={{ uri: item.avatar_image }} style={{ height: SH(120), width: SH(120), resizeMode: "cover", borderRadius: 360, }} />
                </TouchableOpacity>
                    </Animatable.View>
            );
        }
    }

    // update avatar api call
    const updateAvatarApiCall = async () => {
        try {
            const token = await getSession(TOKEN);
            const myHeaders = new Headers();
            myHeaders.append("Authorization", "Bearer " + token.split('|')[1].trim());

            const formdata = new FormData();
            formdata.append("fname", userName.split(" ")[0]);
            formdata.append("lname", userName.split(" ")[1]);
            formdata.append("mo", userPhone);
            if (imageUploadPath != null) {
                formdata.append("photo", imageUploadPath);
            } else {
                formdata.append("avatar_id", avatar_id);
            }

            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: formdata,
                redirect: "follow"
            };
            setLoading(true);
            fetch(PROFILE_EDIT, requestOptions)
                .then((response) => response.json())
                .then((json) => {
                    console.log(json);
                    if (json.status == 1) {
                        setLoading(false);
                        showTypeModal();
                    } else {
                        setLoading(false);
                    }

                })
                .catch((error) => {
                    setLoading(false);
                    CustomConsole("Avatar Update Api Error: " + error);
                });
        } catch (error) {
            setLoading(false);
            CustomConsole("Avatar Update Api Exception: " + error);
        }
    }

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

                    {/* <View style={{ alignSelf: "center", marginTop: SH(50) }}>
                        <Image source={{ uri: image }} style={{ height: SH(150), width: SH(150), resizeMode: "cover", borderRadius: 360 }} />
                    </View> */}

                    {/* quiz list view */}
                    <FlatList
                        data={[...imageList, { plusImage: true }]}
                        numColumns={2}
                        style={{ marginTop: SH(55), marginBottom: SH(30), alignSelf: "center" }}
                        renderItem={renderQuizItem}
                        ListEmptyComponent={() => {
                            return (
                                <View style={{ width: "100%", alignItems: "center", flex: 1, marginTop: SH(50) }}>
                                    <Text style={{ color: colors.black, fontFamily: getRegularFont(), fontSize: SF(25), }}>No Avatars Found</Text>
                                </View>
                            );
                        }}
                    // ListFooterComponent={() => {
                    //     return (
                    //         <Pressable onPress={openImagePicker}
                    //             style={{ alignItems: "center", borderRadius: 360, borderWidth: 1, height: SH(120), width: SH(120), justifyContent: "center", margin: SH(20) }}>
                    //             <Image source={images.choose_image} style={{ width: SH(50), height: SH(50), resizeMode: "contain" }} />
                    //             <Text style={{ color: colors.black, fontFamily: getRegularFont(), fontSize: SF(15), textAlign: "center" }}>{"Choose\nAvatar"}</Text>
                    //         </Pressable>
                    //     );
                    // }}
                    />
                    {/* end of quiz list view */}

                    <Pressable onPress={() => updateAvatarApiCall()}
                        style={{ backgroundColor: colors.themeColor, borderRadius: 11, paddingHorizontal: SW(13), paddingVertical: SH(7), alignSelf: "center" }}>
                        <Text style={{ color: colors.white, fontSize: SF(22), fontFamily: getPopSemiBoldFont() }}>{"Select"}</Text>
                    </Pressable>


                </>}

            <Modal
                onRequestClose={hideTypeModal}
                // transparent
                visible={typeModal}
                // visible={true}
                animationType={'slide'}
            >
                <View style={externalStyles.hospital_details_locateModalMainView} >
                    <View style={externalStyles.hospital_details_locateModalSubView} >

                        <Image source={images.success_gif} style={{ width: SH(200), height: SH(200), resizeMode: "contain", alignSelf: "center" }}
                        />
                        <Text style={{ color: colors.black, fontFamily: getPopMediumFont(), fontSize: SF(20), textAlign: "center", marginTop: SH(20) }}>{"Your Avatar Updated Successfully."}</Text>

                        {/* submit button */}
                        <Pressable
                            onPress={() => {
                                hideTypeModal();
                                navigation.navigate("MyProfileScreen");
                            }}
                            style={externalStyles.hospital_details_locateModalCancelView}>
                            <Text style={externalStyles.hospital_details_locateModalCancelText}>Go to Profile</Text>
                        </Pressable>
                        {/* end of submit */}

                    </View>
                </View>
            </Modal>
        </View>
    );
};