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
import { launchCamera, launchImageLibrary, ImagePicker } from 'react-native-image-picker';

export default function AvatarUpdateScreen({ navigation, route }) {

    const [loading, setLoading] = useState(false);
    const [imageList, setImageList] = useState([]);
    const [image, setImage] = useState('');
    const [imageUploadPath, setImageUploadPath] = useState(null);
    const focused = useIsFocused();
    let Flatlistref = useRef(null);

    useEffect(() => {
        if (focused) {
            if (route.params && route.params.paramImage) {
                setImage(route.params.paramImage);
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
                    CustomConsole("Slider List Api Error: " + error);
                });
        } catch (error) {
            setLoading(false);
            CustomConsole("Slider List Api Exception: " + error);
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
    const renderQuizItem = ({ item, index }) => (
        <View style={{}}>
            <Image source={{ uri: item.avatar_image }} style={{ height: SH(120), width: SH(120), resizeMode: "cover", borderRadius: 360 }} />
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

                    <View style={{ alignSelf: "center", marginTop: SH(50) }}>
                        <Image source={{ uri: image }} style={{ height: SH(150), width: SH(150), resizeMode: "cover", borderRadius: 360 }} />
                    </View>

                    {/* quiz list view */}
                    <FlatList
                        refreshing={loading}
                        data={imageList}
                        numColumns={2}
                        style={{ marginTop: SH(55), marginBottom: SH(30), alignSelf: "center" }}
                        ItemSeparatorComponent={() => (<View style={externalStyles.home_active_quiz_list_separator} />)}
                        renderItem={renderQuizItem}
                        ListEmptyComponent={() => {
                            return (
                                <View style={{ width: "100%", alignItems: "center", flex: 1, marginTop: SH(50) }}>
                                    <Text style={{ color: colors.black, fontFamily: getRegularFont(), fontSize: SF(25), }}>No Avatars Found</Text>
                                </View>
                            );
                        }}
                        ListFooterComponent={() => {
                            return (
                                <Pressable onPress={openImagePicker}
                                    style={{ alignItems: "center", borderRadius: 360, borderWidth: 1, height: SH(120), width: SH(120), justifyContent: "center" }}>
                                    <Image source={images.choose_image} style={{ width: SH(50), height: SH(50), resizeMode: "contain" }} />
                                    <Text style={{ color: colors.black, fontFamily: getRegularFont(), fontSize: SF(15), textAlign: "center" }}>{"Choose\nAvatar"}</Text>
                                </Pressable>
                            );
                        }}
                    />
                    {/* end of quiz list view */}

                    <Image source={{ uri: 'https://quiz.primaldevs.com/images/staff/avatar17191348891242.jpg' }}
                        style={{
                            height: SH(200), width: SH(200), resizeMode: "contain"
                        }} />

                </>}
        </View>
    );
};