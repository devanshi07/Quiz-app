import { useIsFocused, useNavigation } from "@react-navigation/native";
import { Image, ImageBackground, Pressable, Text, View, TextInput, Modal, FlatList } from "react-native";
import { externalStyles } from "../common/styles";
import images from "../assets/images";
import { colors } from "../common/color";
import { CustomConsole, alertDialogDisplay, getBoldFont, getMediumFont, getRegularFont, getSemiBoldFont, progressView } from "../common/utils";
import { LOGIN, LOGIN_AS_GUEST, TALUKA_LIST, VILLAGE_LIST } from "../common/webUtils";
import { useEffect, useState } from "react";
import { AVATAR, DESIGNATION, DESIGNATION_ID, EMAIL, FCM_TOKEN, GUEST_ID, GUEST_TOKEN, PHONE, ROLE, TOKEN, USER_ID, USER_NAME, getSession, saveSession } from "../common/LocalStorage";
import { APP_NAME } from "../common/string";
import { RadioButton } from 'react-native-paper';
import { SF, SH } from "../common/dimensions";
import db from "../LocalDb/database";

export default function LoginAsGuestScreen({ navigation }) {

    const [loading, setLoading] = useState(false);
    const [name, setName] = useState("");
    const [taluka, setTaluka] = useState(null);
    const [talukaId, setTalukaId] = useState(null);
    const [talukaList, setTalukaList] = useState([]);
    const [villageList, setVillageList] = useState([]);
    const [village, setVillage] = useState("");
    const [villageId, setVillageId] = useState("");
    const [sex, setSex] = useState("");
    const [age, setAge] = useState("");
    const [talukaModal, setTalukaModal] = useState(false);
    const [modalType, setModalType] = useState('');
    const [searchVillage, setSearchVillage] = useState("");
    const [copyVillageList, setCopyVillageList] = useState([]);
    const focused = useIsFocused();

    const showTypeModal = (text) => {
        setTalukaModal(true);
        setModalType(text);
    };

    useEffect(() => {
        // fetch taluka list
        getTalukaList();
    }, [focused]);

    // taluka list api
    const getTalukaList = async () => {

        try {
            // setLoading(true);
            // const requestOptions = {
            //     method: "GET",
            //     redirect: "follow"
            // };
            // CustomConsole(TALUKA_LIST)
            // fetch(TALUKA_LIST, requestOptions)
            //     .then((response) => response.json())
            //     .then((json) => {
            //         CustomConsole("json==>");
            //         CustomConsole(json);

            //         // if (json.status == 1) {
            //         // success response
            //         talukaList.length = 0;
            //         for (var i = 0; i < json.cities.length; i++) {
            //             talukaList.push({
            //                 name: json.cities[i].name,
            //                 id: json.cities[i].id
            //             });
            //         }
            //         setTalukaList(talukaList);
            //         CustomConsole("Talukalist" + talukaList)
            //         setLoading(false);
            //         // }
            //         // else {
            //         //     // other reponse status
            //         //     setLoading(false);
            //         // }

            //     })
            //     .catch((error) => {
            //         setLoading(false);
            //         CustomConsole("Taluka list Api Error: " + error);
            //     });

            db.transaction(tx => {
                tx.executeSql(
                    'SELECT * FROM talukas',
                    [],
                    (_, { rows }) => {
                        // console.log("talukas", rows.raw()[0]);
                        talukaList.length = 0;
                        for (var i = 0; i < rows.raw().length; i++) {
                            talukaList.push({
                                name: rows.raw()[i].taluka_name,
                                id: rows.raw()[i].taluka_id
                            });
                        }
                        setTalukaList(talukaList);
                    },
                    error => console.error('Fetch Talukas Error:', error)
                );
            });

        } catch (error) {
            setLoading(false);
            CustomConsole("Ttaluka List Api Exception: " + error);
        }
    }

    // village list api
    const getVillageList = async (talukaId) => {

        try {
            // const requestOptions = {
            //     method: "GET",
            //     redirect: "follow"
            // };
            // setLoading(true);
            // CustomConsole(VILLAGE_LIST + talukaId)
            // fetch(VILLAGE_LIST + talukaId, requestOptions)
            //     .then((response) => response.json())
            //     .then((json) => {
            //         CustomConsole("json==>");
            //         CustomConsole(json);

            //         // if (json.status == 1) {
            //         // success response
            //         villageList.length = 0;
            //         copyVillageList.length = 0;
            //         for (var i = 0; i < json.villages.length; i++) {
            //             villageList.push({
            //                 name: json.villages[i].village_name,
            //                 id: json.villages[i].id
            //             });
            //         }
            //         setVillageList(villageList);
            //         setCopyVillageList(villageList);
            //         CustomConsole("VillageList" + villageList)
            //         setLoading(false);
            //         // }
            //         // else {
            //         //     // other reponse status
            //         //     setLoading(false);
            //         // }

            //     })
            //     .catch((error) => {
            //         setLoading(false);
            //         CustomConsole("Village list Api Error: " + error);
            //     });

            db.transaction(tx => {
                tx.executeSql(
                    'SELECT * FROM villages WHERE city_id = ?',
                    [talukaId],
                    (_, { rows }) => {
                        // console.log("villages", rows.raw()[0]);
                        villageList.length = 0;
                        copyVillageList.length = 0;
                        for (var i = 0; i < rows.raw().length; i++) {
                            villageList.push({
                                name: rows.raw()[i].village_name,
                                id: rows.raw()[i].id
                            });
                        }
                        setVillageList(villageList);
                        setCopyVillageList(villageList);
                        // console.log(villageList);
                    },
                    error => console.error('Fetch Villages Error:', error)
                );
            });

        } catch (error) {
            setLoading(false);
            CustomConsole("Village List Api Exception: " + error);
        }
    }

    // login as guest api call   
    async function onSubmit() {
        try {
            if (name.trim().length == 0) {
                alertDialogDisplay(APP_NAME, "Please enter name");
            }
            else if (taluka == "" || taluka == null) {
                alertDialogDisplay(APP_NAME, "Please select taluka");
            }
            else if (village.trim().length == 0) {
                alertDialogDisplay(APP_NAME, "Please enter village");
            }
            else if (sex.trim().length == 0) {
                alertDialogDisplay(APP_NAME, "Please select sex");
            }
            else if (age.trim().length == 0) {
                alertDialogDisplay(APP_NAME, "Please enter age");
            }
            else {
                setLoading(true);

                const myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");
                // myHeaders.append("Authorization", "Bearer " + token.split('|')[1].trim());

                let raw = JSON.stringify({
                    "name": name,
                    "taluka": talukaId,
                    "village": village,
                    "village_id": villageId,
                    "sex": sex,
                    "age": age
                });

                const requestOptions = {
                    method: "POST",
                    headers: myHeaders,
                    body: raw,
                    redirect: "follow"
                };

                CustomConsole(LOGIN_AS_GUEST + "\n");
                CustomConsole(raw);

                fetch(LOGIN_AS_GUEST, requestOptions)
                    .then((response) => response.json())
                    .then(async (json) => {
                        CustomConsole(json);

                        // if (json.status == 1) {
                        // success response
                        // navigation.navigate("HomeScreen");
                        // navigation.reset({
                        //     index: 0,
                        //     routes: [{ name: 'HomeScreen' }]
                        // });
                        if (json.staff) {
                            saveSession(GUEST_ID, json.staff.id.toString());
                            navigation.navigate("CommonQuizListScreen", { paramItem: json.staff });
                            setLoading(false);

                            // const fcm_token = await getSession(FCM_TOKEN);
                            // const formdata = new FormData();
                            // formdata.append("unique_id", json.staff.unique_id);
                            // formdata.append("password", '123456');
                            // formdata.append("fcm_token", fcm_token);

                            // const requestOptions = {
                            //     method: "POST",
                            //     body: formdata,
                            //     redirect: "follow"
                            // };

                            // CustomConsole(LOGIN + "\n");
                            // CustomConsole(formdata);

                            // fetch(LOGIN, requestOptions)
                            //     .then((response_login) => response_login.json())
                            //     .then((json_login) => {
                            //         CustomConsole(json_login);

                            //         if (json_login.status == 1) {
                            //             // success response
                            //             // saveSession(GUEST_TOKEN, json.staff.id);


                            //         }
                            //         else {
                            //             // other reponse status
                            //             setLoading(false);
                            //         }

                            //     })
                            //     .catch((error) => {
                            //         setLoading(false);
                            //         CustomConsole("Login Api Error: " + error);
                            //     });

                        }
                        // }
                        // else {
                        //     // other reponse status
                        //     setLoading(false);
                        // }

                    })
                    .catch((error) => {
                        setLoading(false);
                        CustomConsole("Login Api Error: " + error);
                    });

            }

        } catch (error) {
            setLoading(false);
            CustomConsole("Login as guest Api Exception: " + error);
        }
    }

    return (
        <View style={externalStyles.container}>
            {loading ? progressView(loading) :
                <ImageBackground source={images.login_background} style={externalStyles.login_imageBackground}>
                    <Image source={images.app_logo} style={externalStyles.login_app_logo} />
                    <Text style={externalStyles.login_as_guest_text}>Login As Guest</Text>

                    <View style={externalStyles.login_formview}>

                        {/* name */}
                        <TextInput
                            style={externalStyles.login_formTextinput}
                            value={name}
                            onChangeText={txt => { setName(txt); }}
                            placeholderTextColor={colors.black}
                            placeholder="Name"
                            theme={{
                                colors: {
                                    primary: colors.textInputColor,
                                },
                            }} />
                        {/* end of name */}

                        {/* taluka */}
                        <Pressable onPress={() => showTypeModal('Taluka')}
                            style={{ flexDirection: "row", alignItems: "center", backgroundColor: colors.textInputColor, paddingTop: 15, paddingBottom: 15, marginBottom: 20, borderRadius: 5, }}>
                            <View style={{ flex: 1, justifyContent: "center" }}>
                                <Text style={{
                                    color: colors.black, fontSize: SF(18), fontFamily: getMediumFont(), textAlignVertical: "center",
                                }}>{taluka == "" || taluka == null ? "Taluka" : taluka}</Text>
                            </View>
                            {taluka !== "" && taluka !== null ? <Pressable onPress={() => { setTaluka(null); setVillageList([]); setCopyVillageList([]); setVillage(''); setVillageId(''); }} style={{ paddingHorizontal: 5, paddingVertical: 5, marginRight: 5 }}>
                                <Image source={images.close} style={{
                                    width: SH(13), height: SH(13), resizeMode: "contain", tintColor: colors.themeColor
                                }} />
                            </Pressable> : null}
                            <Image source={images.down_arrow} style={{
                                width: SH(25), height: SH(25), resizeMode: "contain", tintColor: colors.black, marginRight: 10
                            }} />
                        </Pressable>
                        {/* end of taluka */}

                        {/* vilage */}
                        {/* <TextInput
                            style={externalStyles.login_formTextinput}
                            value={village}
                            onChangeText={txt => { setVillage(txt); }}
                            placeholderTextColor={colors.black}
                            placeholder="Village"
                            theme={{
                                colors: {
                                    primary: colors.textInputColor,
                                    secondary: colors.textInputColor,
                                },
                            }} /> */}
                        <Pressable onPress={() => showTypeModal('Village')}
                            style={{ flexDirection: "row", alignItems: "center", backgroundColor: colors.textInputColor, paddingTop: 15, paddingBottom: 15, marginBottom: 20, borderRadius: 5, }}>
                            <View style={{ flex: 1, justifyContent: "center" }}>
                                <Text style={{
                                    color: colors.black, fontSize: SF(18), fontFamily: getMediumFont(), textAlignVertical: "center",
                                }}>{village == "" || village == null ? "Village" : village}</Text>
                            </View>
                            {village !== "" && village !== null ? <Pressable onPress={() => setVillage(null)} style={{ paddingHorizontal: 5, paddingVertical: 5, marginRight: 5 }}>
                                <Image source={images.close} style={{
                                    width: SH(13), height: SH(13), resizeMode: "contain", tintColor: colors.themeColor
                                }} />
                            </Pressable> : null}
                            <Image source={images.down_arrow} style={{
                                width: SH(25), height: SH(25), resizeMode: "contain", tintColor: colors.black, marginRight: 10
                            }} />
                        </Pressable>
                        {/* end of village */}

                        {/* gender */}
                        <Text style={{ color: colors.black, fontSize: SF(18), fontFamily: getSemiBoldFont(), }}>{"Gender"}</Text>
                        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: SH(10) }}>
                            <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
                                <RadioButton
                                    color={colors.themeColor}
                                    value="Male"
                                    status={sex === 'Male' ? 'checked' : 'unchecked'}
                                    onPress={() => setSex('Male')}
                                />
                                <Text style={{ color: colors.black, fontSize: SF(18), fontFamily: getRegularFont(), }}>{"Male"}</Text>
                            </View>
                            <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
                                <RadioButton
                                    color={colors.themeColor}
                                    value="Female"
                                    status={sex === 'Female' ? 'checked' : 'unchecked'}
                                    onPress={() => setSex('Female')}
                                />
                                <Text style={{ color: colors.black, fontSize: SF(18), fontFamily: getRegularFont(), }}>{"Female"}</Text>
                            </View>
                        </View>
                        {/* end of gender */}

                        {/* age */}
                        <TextInput
                            style={externalStyles.login_formTextinput}
                            value={age}
                            onChangeText={txt => { setAge(txt); }}
                            placeholderTextColor={colors.black}
                            placeholder="Age"
                            keyboardType='number-pad'
                            theme={{
                                colors: {
                                    primary: colors.textInputColor,
                                    secondary: colors.textInputColor,
                                },
                            }} />
                        {/* end of age */}

                        {/* submit button */}
                        <Pressable onPress={() => onSubmit()} style={externalStyles.login_submitbutton}>
                            <Text style={externalStyles.login_submitbuttonText}>Login As Guest</Text>
                        </Pressable>
                        {/* end of submit button */}

                    </View>

                </ImageBackground>
            }

            {/* taluka modal */}
            <Modal
                onRequestClose={() => setTalukaModal(false)}
                // transparent
                visible={talukaModal}
                animationType={'slide'}
            >
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)', }} >
                    <View style={{
                        backgroundColor: 'white',
                        borderColor: '#eee',
                        borderRadius: 10,
                        borderWidth: 1,
                        justifyContent: 'space-between',
                        margin: 'auto',
                        padding: 20,
                        width: "90%",
                    }} >

                        {/* data view */}
                        <View style={{
                            maxHeight: 250
                        }}>
                            <Text style={{
                                textAlign: 'left', fontSize: SF(18), color: colors.black, fontFamily: getBoldFont(), textTransform: "capitalize"
                            }}>{modalType}</Text>

                            {modalType == "Taluka" ?
                                <FlatList data={talukaList} style={{ marginTop: 10 }}
                                    ItemSeparatorComponent={<View style={{ borderBottomWidth: 1, borderBottomColor: colors.borderColor, marginHorizontal: 10 }} />}
                                    renderItem={({ item }) => (

                                        <Pressable
                                            onPress={() => {
                                                if (taluka == item.name) {
                                                    setTaluka('');
                                                    setTalukaId('');
                                                    setVillage('');
                                                    setVillageId('');
                                                    setSearchVillage('');
                                                    setVillageList([]);
                                                    setCopyVillageList([]);
                                                } else {
                                                    setTaluka(item.name);
                                                    setTalukaId(item.id);
                                                    setVillage('');
                                                    setVillageId('');
                                                    setSearchVillage('');
                                                    getVillageList(item.id);
                                                    setTalukaModal(false);
                                                }
                                            }}
                                            style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingVertical: 10, paddingHorizontal: 15, }}>
                                            <Text style={{ textAlign: 'left', fontSize: SF(15), color: colors.black, textTransform: "uppercase", fontFamily: getRegularFont(), }}>{item.name}</Text>
                                            {taluka == item.name ? <Image source={images.check} style={{ width: SH(20), height: SH(20), resizeMode: "contain", tintColor: colors.themeColor }} />
                                                : null}
                                        </Pressable>
                                    )} />
                                :
                                <>
                                    <TextInput
                                        style={{
                                            marginTop: 20, color: colors.black, fontSize: SF(18), fontFamily: getMediumFont(), borderRadius: 5, borderWidth: 1, borderColor: colors.borderColor, marginHorizontal: SH(12), paddingVertical: SH(10)
                                        }}
                                        value={searchVillage}
                                        onChangeText={txt => {
                                            setSearchVillage(txt);
                                            if (txt == "") {
                                                setVillageList(copyVillageList);
                                            } else {
                                                const filtered = copyVillageList.filter((item) =>
                                                    item.name.toLowerCase().includes(txt.toLowerCase())
                                                );
                                                setVillageList(filtered);
                                            }
                                        }}
                                        placeholderTextColor={colors.grey}
                                        placeholder="Search"
                                        theme={{
                                            colors: {
                                                primary: colors.textInputColor,
                                                secondary: colors.textInputColor,
                                            },
                                        }} />

                                    <FlatList data={villageList} style={{ marginTop: 10 }}
                                        ItemSeparatorComponent={<View style={{ borderBottomWidth: 1, borderBottomColor: colors.borderColor, marginHorizontal: 10 }} />}
                                        renderItem={({ item }) => (

                                            <Pressable
                                                onPress={() => {
                                                    if (village == item.name) {
                                                        setVillage('');
                                                        setVillageId('');
                                                        setSearchVillage('');
                                                        setVillageList(copyVillageList);
                                                    } else {
                                                        setVillage(item.name);
                                                        setVillageId(item.id);
                                                        setSearchVillage('');
                                                        setTalukaModal(false);
                                                        setVillageList(copyVillageList);
                                                    }
                                                }}
                                                style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingVertical: 10, paddingHorizontal: 15, }}>
                                                <Text style={{ textAlign: 'left', fontSize: SF(15), color: colors.black, textTransform: "uppercase", fontFamily: getRegularFont(), }}>{item.name}</Text>
                                                {village == item.name ? <Image source={images.check} style={{ width: SH(20), height: SH(20), resizeMode: "contain", tintColor: colors.themeColor }} />
                                                    : null}
                                            </Pressable>
                                        )} />
                                </>
                            }
                        </View>
                        {/* end of data view */}

                        {/* cancel button */}
                        <Pressable
                            onPress={() => setTalukaModal(false)}
                            style={{
                                alignSelf: "flex-end", justifyContent: "center", paddingVertical: 5, paddingHorizontal: 15, borderRadius: 5, marginTop: 20
                            }}>
                            <Text style={{
                                textAlign: 'center', fontSize: SF(14), color: colors.black, textTransform: "uppercase", fontFamily: getSemiBoldFont(),
                            }}>Cancel</Text>
                        </Pressable>
                        {/* end of cancel */}

                    </View>
                </View>
            </Modal>
            {/* end of taluka modal */}

        </View>
    );
};