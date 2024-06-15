import { Dimensions, StyleSheet } from 'react-native';
import { colors } from './color';
import { getBoldFont, getMediumFont, getPopRegularFont, getRegularFont, getSemiBoldFont } from './utils';
import { SF, SH, SW } from './dimensions';

export const externalStyles = StyleSheet.create({

    // splash screen
    splash_safeAreaView: {
        flex: 1
    },
    splash_imageBackground: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    splash_titleText: {
        fontSize: SF(55),
        color: colors.white,
        fontWeight: "bold"
    },
    splash_subTitleText: {
        fontSize: SF(20),
        color: colors.white,
        fontWeight: "500",
        fontFamily: getRegularFont(),
        textAlign: "center",
        marginTop: SH(19)
    },
    splash_image: {
        height: SH(241),
        width: SW(253),
        resizeMode: "contain",
        marginTop: 35,
        marginBottom: 34,
    },

    // common properties
    container: {
        flex: 1,
        backgroundColor:colors.white
    },
    coloredContainer: {
        flex: 1,
        backgroundColor:colors.themeGreenColor
    },

    // common loading view
    loadingMainView: {
        flex: 1, backgroundColor: '#dcdcdc', alignItems: 'center', justifyContent: 'center'
    },
    loadingSubView: {
        borderRadius: 10, backgroundColor: 'white', padding: 25
    },
    loadingText: {
        fontSize: SF(15), color: "black", fontWeight: "300"
    },

    // app.js
    safeAreaViewContainer: {
        flex: 1,
    },

    // empty state
    empty_mainview: {
        flex: 1, alignItems: "center", justifyContent: "center"
    },
    empty_text: {
        color: colors.black, fontSize: SF(20), fontFamily: getRegularFont(), textAlign: "center", textAlignVertical: "center",
    },

    // common web
    headerView: {
        flexDirection: "row", alignItems: "center", backgroundColor: colors.themeColor, paddingVertical: 15
    },
    headerIconView: {
        marginLeft: 15
    },
    headerIcon: {
        width: 31, height: 31, resizeMode: "contain", tintColor: colors.white
    },
    headerText: {
        color: colors.white, marginLeft: 15, fontSize: 18, fontFamily: getRegularFont()
    },

    // login screen
    login_imageBackground: {
        flex: 1,
        justifyContent: "center",
    },
    login_app_logo: {
        width: SH(200), height: SH(200), resizeMode: "contain", alignSelf: "center"
    },
    login_formview: {
        marginTop: SH(72),
        marginHorizontal: SW(53)
    },
    login_submitbutton: {
        backgroundColor: colors.themeColor, paddingVertical: 8.5, borderRadius: 5, alignItems: "center", marginTop: SH(38.27),
    },
    login_submitbuttonText: {
        fontSize: SF(18), color: colors.white, fontFamily: getMediumFont(),
    },

    // home screen
    home_sliderMainView: {
        marginTop: 28
    },
    banner_item_image: {
        width: SH(500), height: SH(500), borderRadius: 360
    },
    home_active_quiz_text: {
        color: colors.black, fontFamily: getSemiBoldFont(), fontSize: SF(28), marginTop: SH(48), alignSelf: "center"
    },
    home_active_quiz_list: {
        marginTop: SH(55)
    },
    home_quiz_render_item_mainview: {
        marginHorizontal: SW(32), justifyContent: "space-between", flexDirection: "row", alignItems: "center"
    },
    home_quiz_render_item_title: {
        color: colors.black, fontFamily: getMediumFont(), fontSize: SF(18)
    },
    home_quiz_render_item_button: {
        backgroundColor: colors.themeColor, borderRadius: 5, paddingVertical: SH(5), paddingHorizontal: SW(12)
    },
    home_quiz_render_item_buttonText: {
        color: colors.white, fontFamily: getSemiBoldFont(), fontSize: SF(20)
    },



    // queries screen
    query_scrollview: {
        paddingHorizontal: 15
    },
    query_mainview: {
        marginTop: SH(133)
    },
    query_headingview: {
        alignItems: "center"
    },
    query_headingText: {
        fontSize: SF(20), fontFamily: getBoldFont(), color: colors.black
    },
    query_formView: {
         marginHorizontal: 20, marginTop: 21, borderRadius: 40, paddingHorizontal: 20, paddingTop: 41,borderWidth:1
    },
    query_formTextinput: {
        marginBottom: 20, color: colors.black, fontSize: SF(15), fontFamily: getPopRegularFont(), borderWidth:1, borderRadius: 14,
    },
    query_formTextarea: {
        height: 100, textAlignVertical: "top", borderWidth: 1,  color: colors.black, fontSize: SF(15), fontFamily: getPopRegularFont(),borderRadius:14
    },
    query_submitbutton: {
        backgroundColor: colors.themeColor, paddingVertical: 10,paddingHorizontal:31, borderRadius: 9, alignItems: "center", marginTop: 46, marginBottom: 30,alignSelf:"center"
    },
    query_submitbuttonText: {
        fontSize: SF(15), color: colors.white, fontFamily: getRegularFont(), fontWeight: "500"
    },
    query_image: {
        height: SH(151), width: SW(270), resizeMode: "contain", alignSelf: "center", marginTop: 41, marginBottom: 20.9
    },
    query_privacyView: {
        marginBottom: 30, alignItems: "center"
    },
    query_privacyText: {
        fontSize: SF(15), fontFamily: getBoldFont(), color: colors.white
    },

});