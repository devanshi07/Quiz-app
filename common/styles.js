import { Dimensions, StyleSheet } from 'react-native';
import { colors } from './color';
import { getBoldFont, getMediumFont, getPopMediumFont, getPopRegularFont, getPopSemiBoldFont, getRegularFont, getSemiBoldFont } from './utils';
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
        backgroundColor: colors.white
    },
    coloredContainer: {
        flex: 1,
        backgroundColor: colors.themeGreenColor
    },

    // common loading view
    loadingMainView: {
        flex: 1, backgroundColor: '#dcdcdc', alignItems: 'center', justifyContent: 'center'
    },
    loadingSubView: {
        borderRadius: 10, backgroundColor: 'white', padding: 25
    },
    coloredLoadingSubView: {
        borderRadius: 10, backgroundColor: colors.themeGreenColor, padding: 25
    },
    loadingText: {
        fontSize: SF(18), color: colors.black, fontWeight: "300"
    },
    coloredLoadingText: {
        fontSize: SF(18), color: colors.white, fontWeight: "300"
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
        flexDirection: "row", alignItems: "center", marginHorizontal: SW(12), marginTop: SH(28.87)
    },
    headerIconView: {
        padding: 10
    },
    headerIcon: {
        height: SH(23), width: SH(23), resizeMode: "contain" 
    },
    headerText: {
        color: colors.white, fontSize: SF(18), fontFamily: getPopMediumFont()
    },

    // top navigation tabs
    topTabsView: {
        backgroundColor: colors.white, flex: 1
    },
    topTabsBarStyle: {
        backgroundColor: '#E9E9E9', borderTopLeftRadius: 15, borderTopRightRadius: 15, paddingRight: SW(15), height: SH(60)
    },
    topTabsBarLabelStyle: {
        color: colors.white, fontSize: SF(10), fontFamily: getRegularFont(), fontWeight: "500"
    },
    topTabsBarIcon: {
        height: SH(25), width: SH(25), resizeMode: "contain"
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
    login_formTextinput: {
        marginBottom: 20, color: colors.black, fontSize: SF(18), fontFamily: getMediumFont(), borderRadius: 5, backgroundColor: colors.textInputColor
    },

    // home screen
    home_sliderMainView: {
        marginTop: 28
    },
    banner_item_view: {
        alignSelf: "center"
    },
    banner_item_image: {
        width: 415, height: 415, borderRadius: 360, marginHorizontal: 10
    },
    banner_main_view: {
        backgroundColor: colors.themeColor, borderRadius: 360, width: 450, height: 450, alignItems: "center", top: -150, alignSelf: "center"
    },
    banner_sub_view: {
        backgroundColor: colors.white, borderRadius: 360, width: 435, height: 435, alignItems: "center"
    },
    home_active_quiz_text: {
        color: colors.black, fontFamily: getSemiBoldFont(), fontSize: SF(28), alignSelf: "center", marginTop: -110
    },
    home_active_quiz_list: {
        marginTop: SH(55), marginBottom: SH(30)
    },
    home_active_quiz_list_separator: {
        height: SH(32)
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
    home_quiz_render_item_button_active: {
        backgroundColor: colors.themeGreenColor, borderRadius: 5, paddingVertical: SH(5), paddingHorizontal: SW(12)
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
        marginHorizontal: 20, marginTop: 21, borderRadius: 40, paddingHorizontal: 20, paddingTop: 41, borderWidth: 1
    },
    query_formTextinput: {
        marginBottom: 20, color: colors.black, fontSize: SF(15), fontFamily: getPopRegularFont(), borderWidth: 1, borderRadius: 14,
    },
    query_formTextarea: {
        height: 100, textAlignVertical: "top", borderWidth: 1, color: colors.black, fontSize: SF(15), fontFamily: getPopRegularFont(), borderRadius: 14
    },
    query_submitbutton: {
        backgroundColor: colors.themeColor, paddingVertical: 10, paddingHorizontal: 31, borderRadius: 9, alignItems: "center", marginTop: 46, marginBottom: 30, alignSelf: "center"
    },
    query_submitbuttonText: {
        fontSize: SF(18), color: colors.white, fontFamily: getPopSemiBoldFont(), fontWeight: "500"
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