import { DrawerActions, useIsFocused, useNavigation } from "@react-navigation/native";
import { Dimensions, FlatList, Image, ImageBackground, Pressable, ScrollView, Text, View } from "react-native";
import { externalStyles } from "../common/styles";
import images from "../assets/images";
import { colors } from "../common/color";
import { TextInput } from "react-native-paper";
import { CustomConsole, alertDialogDisplay, getMediumFont, getPopBoldFont, getPopMediumFont, getPopSemiBoldFont, getRegularFont, getSemiBoldFont, progressView } from "../common/utils";
import { ACTIVE_QUIZ, LOGIN, SLIDER_DETAILS, SLIDER_LIST, TOP_WINNERS, TOP_WINNERS_CONSISTENT } from "../common/webUtils";
import { useEffect, useRef, useState } from "react";
import { AVATAR, DESIGNATION, DESIGNATION_ID, EMAIL, FCM_TOKEN, PHONE, ROLE, TOKEN, USER_ID, USER_NAME, getSession, saveSession } from "../common/LocalStorage";
import { SF, SH, SW } from "../common/dimensions";
import * as Animatable from 'react-native-animatable'

export default function ConsistResultsScreen({ navigation }) {

    const [loading, setLoading] = useState(false);
    const [performerList, setPerformerList] = useState([]);
    const [activeTaluka, setActiveTaluka] = useState('');
    const focused = useIsFocused();

    useEffect(() => {
        if (focused) {
            getTopPerformersList();
        }
    }, [focused]);

    // top performer list api
    const getTopPerformersList = async () => {

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

            CustomConsole(TOP_WINNERS_CONSISTENT);

            fetch(TOP_WINNERS_CONSISTENT, requestOptions)
                .then((response) => response.json())
                .then((json) => {
                    CustomConsole(json);

                    if (json.status == 1) {
                        // success response
                        if (json.top_winners.length != 0) {
                            setPerformerList(json.top_winners);
                            setActiveTaluka(json.top_winners[0].city)
                            setLoading(false);
                        } else {
                            setLoading(false);
                        }
                    }
                    else {
                        // other reponse status
                        setLoading(false);
                    }

                })
                .catch((error) => {
                    setLoading(false);
                    CustomConsole("Top performer list Api Error: " + error);
                });
        } catch (error) {
            setLoading(false);
            CustomConsole("Top performer List Api Exception: " + error);
        }
    }

    // toppers item view
    const renderTopperItem = ({ item, index }) => (
        <View style={{ marginHorizontal: 30, }}>
            <Pressable onPress={() => {
                if (activeTaluka == item.city) {
                    setActiveTaluka('');
                } else {
                    setActiveTaluka(item.city);
                }
            }}
                style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 10, paddingVertical: 7, }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Image source={images.location} style={{ height: SH(30), width: SH(30), resizeMode: "contain", marginRight: 10 }} />
                    <Text style={{ fontSize: SF(18), color: colors.black, fontFamily: getPopSemiBoldFont() }}>{item.city}</Text>
                </View>
                <Image source={activeTaluka == item.city ? images.up_arrow : images.down_arrow} style={{ height: SH(20), width: SH(20), resizeMode: "contain", tintColor: colors.black }} />
            </Pressable>

            {activeTaluka == item.city ?
                <>
                    {item.top_winners.map((item1) => (
                        <Animatable.View
                            animation={'slideInRight'}
                            duration={1000}
                            delay={index * 300} style={{ flexDirection: "row", backgroundColor: colors.themeYellowColor, height: 70, borderRadius: 20, justifyContent: "center", marginVertical: 5 }}>
                            <View style={{ flex: 0.3, padding: 10, borderRightColor: colors.white, borderRightWidth: 5, borderTopRightRadius: 100, borderBottomRightRadius: 100, justifyContent: "center", alignItems: "center" }}>
                                <Image source={{ uri: item1.avatar }} style={{ width: SH(60), height: SH(60), borderRadius: 360 }} />
                            </View>
                            <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", marginHorizontal: SW(10) }}>
                                <View style={{ flex: 1, justifyContent: "center" }}>
                                    <Text style={{ fontFamily: getSemiBoldFont(), fontSize: SF(20), color: colors.white }}>{item1.name}</Text>
                                </View>
                                <View style={{ backgroundColor: colors.white, borderRadius: 360, alignSelf: "center", width: SH(41), height: SH(41), alignItems: "center", justifyContent: "center" }}>
                                    <Text style={{ fontFamily: getSemiBoldFont(), fontSize: SF(20), color: colors.themeYellowColor }}>{item1.rank}</Text>
                                </View>
                            </View>
                        </Animatable.View>
                    ))}
                </>
                : null}
        </View>
    );

    return (
        <View style={externalStyles.container}>

            {/* header view */}
            <View style={{ flexDirection: "row", alignItems: "center", marginHorizontal: SW(12), marginTop: SH(28.87) }}>
                <Pressable style={{ padding: 10 }} onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
                    <Image source={images.drawer_menu} style={{ height: SH(40), width: SH(40), resizeMode: "contain", tintColor: colors.black }} />
                </Pressable>
                <Text style={{ color: colors.black, fontSize: SF(18), fontFamily: getPopMediumFont() }}>{"Taluka wise Toppers"}</Text>
            </View>
            {/* end of header view */}

            {loading ? progressView(loading) :
                performerList.length == 0 ?
                    <View style={{ width: "100%", alignItems: "center", flex: 1, justifyContent: "center" }}>
                        <Text style={{ color: colors.black, fontFamily: getRegularFont(), fontSize: SF(25), }}>No performer found</Text>
                    </View>
                    : <FlatList
                        data={performerList}
                        style={{ marginTop: 30 }}
                        ItemSeparatorComponent={() => (<View style={{ height: SH(20) }} />)}
                        renderItem={renderTopperItem}
                        ListFooterComponent={() => {
                            return (
                                <View style={{ height: 50 }} />
                            );
                        }}

                    />
            }
            {/* {loading ? progressView(loading) :
                <ScrollView>
                    <View style={{ backgroundColor: colors.themeColor, borderRadius: 360, height: 450, alignItems: "center", top: -170, alignSelf: "center" }}>

                        {/* sub header view 
                        <View style={{ backgroundColor: colors.white, borderRadius: 360, width: 435, height: 435, alignItems: "center", justifyContent: "center" }}>
                            <View style={{ backgroundColor: colors.themeColor, borderRadius: 11, paddingHorizontal: SW(13), paddingVertical: SH(7), marginTop: 100 }}>
                                <Text style={{ color: colors.white, fontSize: SF(30), fontFamily: getPopBoldFont() }}>{"Taluka wise Toppers"}</Text>
                            </View>
                            <Text style={{ color: '#292929', fontSize: SF(22), fontFamily: getPopSemiBoldFont(), marginTop: SH(31) }}>{"Top 10 Results"}</Text>
                        </View>
                        {/* end of sub header view

                        {/* rankers view
                        <View style={{ flexDirection: "row", alignItems: "center", marginTop: -30 }}>

                            <View style={{ alignItems: "center", flex: 1 }}>
                                <View style={{ backgroundColor: "#D9D9D9", width: SH(100), height: SH(100), borderRadius: 360 }}>
                                    <Image source={{ uri: performerList?.find(element => element.rank == 2)?.avatar }} style={{ width: SH(100), height: SH(100), borderRadius: 360 }} />
                                </View>
                                <View style={{ backgroundColor: "#D9D9D9", borderRadius: 18, marginTop: 13, paddingHorizontal: SW(19), paddingVertical: SH(5) }}>
                                    <Text style={{ color: colors.black, fontSize: SF(15), fontFamily: getPopMediumFont(), textAlign: "center" }}>{performerList?.find(element => element.rank == 2)?.name}</Text>
                                </View>
                                <View style={{ backgroundColor: colors.themeGreenColor, borderRadius: 18, marginTop: 13, width: SH(35), height: SH(35), alignItems: "center", justifyContent: "center" }}>
                                    <Text style={{ color: colors.white, fontSize: SF(20), fontFamily: getSemiBoldFont(), textAlign: "center" }}>{"2"}</Text>
                                </View>
                            </View>

                            <View style={{ width: SW(15) }} />

                            <View style={{ alignItems: "center", flex: 1 }}>
                                <View style={{ backgroundColor: "#D9D9D9", width: SH(128), height: SH(128), borderRadius: 360, marginTop: -40 }}>
                                    <Image source={{ uri: performerList?.find(element => element.rank == 1)?.avatar }} style={{ width: SH(128), height: SH(128), borderRadius: 360 }} />
                                </View>
                                <View style={{ backgroundColor: "#D9D9D9", borderRadius: 18, marginTop: 13, paddingHorizontal: SW(19), paddingVertical: SH(5) }}>
                                    <Text style={{ color: colors.black, fontSize: SF(15), fontFamily: getPopMediumFont(), textAlign: "center" }}>{performerList?.find(element => element.rank == 1)?.name}</Text>
                                </View>
                                <View style={{ backgroundColor: colors.themeColor, borderRadius: 18, marginTop: 13, width: SH(35), height: SH(35), alignItems: "center", justifyContent: "center" }}>
                                    <Text style={{ color: colors.white, fontSize: SF(20), fontFamily: getSemiBoldFont(), textAlign: "center" }}>{"1"}</Text>
                                </View>
                            </View>

                            <View style={{ width: SW(15) }} />

                            <View style={{ alignItems: "center", flex: 1 }}>
                                <View style={{ backgroundColor: "#D9D9D9", width: SH(100), height: SH(100), borderRadius: 360 }}>
                                    <Image source={{ uri: performerList?.find(element => element.rank == 3)?.avatar }} style={{ width: SH(100), height: SH(100), borderRadius: 360 }} />
                                </View>
                                <View style={{ backgroundColor: "#D9D9D9", borderRadius: 18, marginTop: 13, paddingHorizontal: SW(19), paddingVertical: SH(5) }}>
                                    <Text style={{ color: colors.black, fontSize: SF(15), fontFamily: getPopMediumFont(), textAlign: "center" }}>{performerList?.find(element => element.rank == 3)?.name}</Text>
                                </View>
                                <View style={{ backgroundColor: colors.themeGreenColor, borderRadius: 18, marginTop: 13, width: SH(35), height: SH(35), alignItems: "center", justifyContent: "center" }}>
                                    <Text style={{ color: colors.white, fontSize: SF(20), fontFamily: getSemiBoldFont(), textAlign: "center" }}>{"3"}</Text>
                                </View>
                            </View>
                        </View>
                        {/* <Text style={{ color: '#292929', fontSize: SF(22), fontFamily: getPopSemiBoldFont(), marginTop: SH(31) }}>{"No one found"}</Text> 
                        {/* end of rankers view 

                    </View>
                    {/* other toppers 
                    <FlatList
                        data={performerList.slice(3, performerList.length)}
                        ItemSeparatorComponent={() => (<View style={externalStyles.home_active_quiz_list_separator} />)}
                        renderItem={renderTopperItem}
                        ListFooterComponent={() => {
                            return (
                                <View style={{ height: 50 }} />
                            );
                        }}
                    />
                    {/* end of other toppers
                </ScrollView>

            } */}
        </View>
    );
};