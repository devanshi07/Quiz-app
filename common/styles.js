import { Dimensions, StyleSheet } from 'react-native';
import { colors } from './color';
import { getBoldFont, getRegularFont, getSemiBoldFont } from './utils';
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
        backgroundColor: colors.themeColor
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
        height: SH(148),
        width: SH(148),
        resizeMode: "contain",
        marginTop: 35,
        marginBottom: 34,
    },

    // common properties
    container: {
        flex: 1,
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

    // queries screen
    query_scrollview: {
        paddingHorizontal: 15
    },
    query_mainview: {
        marginTop: 37
    },
    query_headingview: {
        alignItems: "center"
    },
    query_headingText: {
        fontSize: SF(20), fontFamily: getBoldFont(), color: colors.black
    },
    query_formView: {
        backgroundColor: colors.themeColor, marginHorizontal: 20, marginTop: 21, borderRadius: 20, paddingHorizontal: 20, paddingTop: 41
    },
    query_formTextinput: {
        borderBottomWidth: 1, marginBottom: 20, borderBottomColor: colors.white, color: colors.white, fontSize: SF(12), fontFamily: getRegularFont()
    },
    query_formTextarea: {
        height: 100, textAlignVertical: "top", borderBottomWidth: 1, borderBottomColor: colors.white, color: colors.white, fontSize: SF(12), fontFamily: getRegularFont()
    },
    query_submitbutton: {
        backgroundColor: colors.lightThemeColor, paddingVertical: 7, borderRadius: 20, alignItems: "center", marginTop: 46, marginBottom: 30
    },
    query_submitbuttonText: {
        fontSize: SF(15), color: colors.themeColor, fontFamily: getRegularFont(), fontWeight: "500"
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

    // top navigation tabs
    topTabsView: {
        backgroundColor: colors.white, flex: 1
    },
    topTabsBarStyle: {
        backgroundColor: colors.themeColor, marginHorizontal: SW(20), borderTopLeftRadius: 20, borderTopRightRadius: 20, paddingRight: SW(15), height: SH(55)
    },
    topTabsBarLabelStyle: {
        color: colors.white, fontSize: SF(10), fontFamily: getRegularFont(), fontWeight: "500"
    },
    topTabsItemStyle: {
        flexDirection: "row"
    },
    topTabsBarIndicatorStyle: {
        borderBottomWidth: SH(3), borderBottomColor: colors.white
    },
    topTabsBarIcon: {
        height: SH(17), width: SH(17), resizeMode: "contain"
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

    // home screen
    banner_item_videoView: {
        height: SH(207), width: Dimensions.get("window").width - 40
    },
    banner_item_video: {
        borderRadius: 30, width: Dimensions.get("window").width - 40, height: SH(207)
    },
    banner_item_image: {
        width: Dimensions.get("window").width - 40, height: SH(207), borderRadius: 27
    },
    banner_indicator: {
        flexDirection: "row", alignItems: "center", justifyContent: "space-between", position: 'absolute', top: 85, left: 0, right: 0,
    },
    banner_indicators_view: {
        padding: 9
    },
    banner_indicator_icon: {
        width: SH(20), height: SH(20)
    },
    home_mainView: {
        flex: 1, backgroundColor: colors.themeColor
    },
    home_header_view: {
        marginTop: 28, alignItems: "center", marginBottom: 30
    },
    home_header_text: {
        color: colors.white, fontFamily: getRegularFont(), fontWeight: "500", fontSize: SF(25)
    },
    home_queryButtonView: {
        marginTop: 30, backgroundColor: colors.themeColor, borderRadius: 10, paddingVertical: 10, alignItems: "center"
    },
    home_queryButtonText: {
        fontSize: SF(14), fontFamily: getBoldFont(), color: colors.white
    },
    home_subview: {
        backgroundColor: colors.white, borderTopRightRadius: 30, borderTopLeftRadius: 30, paddingHorizontal: SW(20), flex: 1, paddingTop: 3
    },
    home_sliderMainView: {
        marginTop: 28
    },
    home_pmjayMainView: {
        flexDirection: "row", alignItems: "center", marginTop: 37
    },
    home_pmjaySubView: {
        borderRadius: 20, shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 2,
        backgroundColor: colors.white, flex: 1
    },
    home_pmjayImage: {
        width: SH(49), height: SH(49), resizeMode: "contain", marginTop: 17, marginBottom: 7, alignSelf: "center"
    },
    home_pmjayTextView: {
        backgroundColor: colors.themeColor, paddingVertical: 5, borderBottomLeftRadius: 20, borderBottomRightRadius: 20, paddingHorizontal: 7, alignItems: "center"
    },
    home_pmjayText: {
        fontFamily: getBoldFont(), color: colors.white, fontSize: SF(14), paddingVertical: 5
    },
    home_pmjay_seperator: {
        width: SW(21)
    },

    // empty state
    empty_mainview: {
        flex: 1, alignItems: "center", justifyContent: "center"
    },
    empty_text: {
        color: colors.black, fontSize: SF(20), fontFamily: getRegularFont(), textAlign: "center", textAlignVertical: "center",
    },

    // pmjay details
    pmjay_details_subview: {
        backgroundColor: colors.ellipseback, borderTopLeftRadius: 360, borderTopRightRadius: 360, marginTop: SH(119), paddingHorizontal: SW(27), paddingBottom: Dimensions.get("window").height * 0.15
    },
    pmjay_details_mainview: {
        backgroundColor: colors.white
    },
    pmjay_details_logo: {
        width: SH(154), height: SH(154), resizeMode: "contain", marginTop: -68, alignSelf: "center"
    },
    pmjay_details_title: {
        color: colors.title, fontFamily: getBoldFont(), fontSize: SF(23), marginTop: SH(18), textAlign: "center"
    },
    pmjay_details_text: {
        color: colors.black, fontFamily: getRegularFont(), fontWeight: "500", fontSize: SF(10), textAlign: "justify", marginTop: SH(5)
    },
    pmjay_details_pdfview: {
        marginTop: SH(11), backgroundColor: colors.themeColor, flexDirection: "row", alignItems: "center", borderRadius: 10, justifyContent: "space-between", padding: 7
    },
    pmjay_details_pdftext: {
        fontSize: SF(10), fontFamily: getRegularFont(), fontWeight: "500", color: colors.white
    },
    pmjay_details_buttonview: {
        backgroundColor: "#FFEAE1", padding: 3, borderRadius: 6, paddingHorizontal: 7
    },
    pmjay_details_buttontext: {
        fontSize: SF(10), fontFamily: getRegularFont(), fontWeight: "500", color: colors.black
    },
    pmjay_details_p: {
        color: colors.black, fontFamily: getRegularFont(), fontSize: SF(10)
    },

    // hospital list screen
    hospital_item_mainview: {
        flexDirection: "row", paddingVertical: SH(26),
    },
    hospital_item_image: {
        width: SH(81), height: SH(81), resizeMode: "cover", borderRadius: 360
    },
    hospital_item_image_contain: {
        width: SH(81), height: SH(81), resizeMode: "contain", borderRadius: 360
    },
    hospital_item_subview: {
        marginLeft: 17, flex: 1
    },
    hospital_item_name: {
        color: colors.themeColor, fontFamily: getBoldFont(), fontSize: SF(20)
    },
    hospital_item_speciality: {
        color: colors.lightblack, fontFamily: getRegularFont(), fontSize: SF(12)
    },
    hospital_item_addressview: {
        flexDirection: "row", marginTop: 5
    },
    hospital_item_addressIcon: {
        width: SH(14), height: SH(14), resizeMode: "contain"
    },
    hospital_item_addressText: {
        flex: 1, color: colors.lightblack, fontFamily: getRegularFont(), fontSize: SF(11), marginLeft: 5
    },
    hospital_pageview: {
        paddingHorizontal: 10, alignItems: "center", justifyContent: "center"
    },
    hospital_pageActiveText: {
        fontSize: SF(15), fontFamily: getSemiBoldFont(), color: colors.themeColor
    },
    hospital_pageInActiveText: {
        fontSize: SF(15), fontFamily: getSemiBoldFont(), color: colors.black
    },
    hospital_mainview: {
        flex: 1, backgroundColor: colors.white
    },
    hospital_headerView: {
        flexDirection: "row", alignItems: "center", paddingLeft: 20, paddingRight: 20, paddingTop: 24, paddingBottom: 7, backgroundColor: colors.white
    },
    hospital_headerBackImage: {
        width: 31, height: 31, resizeMode: "contain"
    },
    hospital_headerTextView: {
        flex: 1, marginLeft: 8, justifyContent: "center"
    },
    hospital_headerText: {
        color: colors.themeColor, fontSize: SF(19), fontFamily: getBoldFont(), textAlign: "center", textAlignVertical: "center",
    },
    hospital_headerRightView: {
        width: SH(31), height: SH(31),
    },
    hospital_list: {
        marginHorizontal: 30,
    },
    hospital_list_sparator: {
        borderBottomWidth: 1, borderColor: colors.borderColor
    },
    hospital_paginationView: {
        flexDirection: "row", marginHorizontal: 51, alignSelf: "center", marginBottom: 22.45,
        borderRadius: 10, shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 2,
        backgroundColor: colors.white,
        justifyContent: "space-between"
    },
    hospital_paginationLeftIconView: {
        padding: 10
    },
    hospital_paginationLeftIcon: {
        width: 13, height: 13, resizeMode: "contain"
    },
    hospital_paginationRightIcon: {
        width: 13, height: 13, resizeMode: "contain", transform: [{ rotate: '180deg' }]
    },
    hospital_paginationIcon: {
        width: 13, height: 13,
    },
    hospital_paginationList: {
        flex: 1
    },
    hospital_paginationListSeparator: {
        width: 20
    },

    // hospital details screen 
    hospital_details_image: {
        width: "100%", height: SH(341)
    },
    hospital_details_backView: {
        position: "absolute", marginTop: 22, marginLeft: 15
    },
    hospital_details_mainView: {
        backgroundColor: colors.white, borderTopRightRadius: 30, borderTopLeftRadius: 30, top: -84, paddingTop: 23, paddingLeft: 28, paddingRight: 27, height: (Dimensions.get("window").height - 341) + 30
    },
    hospital_details_name: {
        color: colors.themeColor, fontFamily: getBoldFont(), fontSize: SF(22)
    },
    hospital_details_description: {
        color: colors.black, fontFamily: getSemiBoldFont(), fontSize: SF(15)
    },
    hospital_details_locateView: {
        alignItems: "center", position: "absolute", bottom: 0, alignSelf: "center"
    },
    hospital_details_locatePressable: {
        backgroundColor: colors.themeColor, flexDirection: "row", alignItems: "center", paddingTop: 9, paddingBottom: 8.29, paddingHorizontal: 16, borderTopLeftRadius: 20, borderTopRightRadius: 20
    },
    hospital_details_locatePressableImage: {
        width: SH(27.71), height: SH(27.71), resizeMode: "contain", tintColor: colors.white
    },
    hospital_details_locatePressableText: {
        color: colors.white, fontFamily: getSemiBoldFont(), fontSize: SF(15), marginLeft: 15
    },
    hospital_details_contactView: {
        flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 30
    },
    hospital_details_contactPressable: {
        flexDirection: "row",
    },
    hospital_details_contactIcon: {
        width: SH(12), height: SH(12), resizeMode: "contain", marginTop: 7
    },
    hospital_details_contactMobile: {
        marginLeft: 6
    },
    hospital_details_contactText: {
        color: colors.themeColor, fontFamily: getRegularFont(), fontSize: SF(15),
    },
    hospital_details_contactNo: {
        color: colors.black, fontFamily: getBoldFont(), fontSize: SF(14)
    },
    hospital_details_brochureText: {
        color: colors.black, fontFamily: getRegularFont(), fontSize: SF(12), marginLeft: 20
    },
    hospital_details_brochure_dowload: {
        backgroundColor: colors.themeColor, paddingHorizontal: 13, paddingVertical: 1, borderRadius: 6
    },
    hospital_details_brochure_dowload_text: {
        color: colors.white, fontFamily: getRegularFont(), fontSize: SF(12), fontWeight: "500"
    },

    // hospital locator
    hospital_locator_scroll: {
        backgroundColor: colors.white
    },
    hospital_locator_mainView: {
        paddingHorizontal: SW(19), paddingTop: SH(28)
    },
    hospital_locator_searchView: {
        flexDirection: "row", alignItems: "center",
    },
    hospital_locator_searchSubView: {
        flexDirection: "row", alignItems: "center", borderWidth: 1, borderColor: "#B5B5B5", flex: 1, borderRadius: 10, paddingHorizontal: 9,
    },
    hospital_locator_searchIcon: {
        height: SH(18), width: SH(18), resizeMode: "contain"
    },
    hospital_locator_searchTextinput: {
        height: SH(35), padding: 0, flex: 1, marginLeft: 16, fontFamily: getRegularFont(), fontSize: SF(15), color: colors.black
    },
    hospital_locator_goButton: {
        backgroundColor: colors.themeColor, borderRadius: 8, alignItems: "center", width: SH(35), height: SH(35), marginLeft: 14, justifyContent: "center"
    },
    hospital_locator_goButtonText: {
        color: colors.white, fontSize: SF(15), fontFamily: getRegularFont()
    },
    hospital_locator_subView: {
        backgroundColor: colors.lightThemeColor, borderRadius: 20, paddingTop: 14, paddingHorizontal: 20, paddingBottom: 15, marginTop: 27, marginBottom: 22
    },
    hospital_locator_title: {
        color: colors.black, fontFamily: getSemiBoldFont(), fontSize: SF(18)
    },
    hospital_locator_subsubView: {
        marginTop: 17
    },
    hospital_locator_filterView: {
        flexDirection: "row", alignItems: "center", paddingLeft: 9, paddingRight: 14, borderRadius: 49, backgroundColor: colors.white, paddingTop: 6, paddingBottom: 7
    },
    hospital_locator_filterLeftIcon: {
        width: SH(15), height: SH(15), resizeMode: "contain"
    },
    hospital_locator_filterReset: {
        paddingHorizontal: 5, paddingVertical: 5, marginRight: 5
    },
    hospital_locator_filterResetIcon: {
        width: SH(13), height: SH(13), resizeMode: "contain", tintColor: colors.themeColor
    },
    hospital_locator_filterRightIcon: {
        width: SH(13), height: SH(13), resizeMode: "contain"
    },
    hospital_locator_filterTextView: {
        flex: 1, marginLeft: 8, justifyContent: "center"
    },
    hospital_locator_filterText: {
        color: colors.themeColor, fontSize: SH(15), fontFamily: getRegularFont(), fontWeight: "500", textAlignVertical: "center", textTransform: "capitalize"
    },
    hospital_locator_filterSeparator: {
        height: SH(17)
    },
    hospital_locator_serchview: {
        marginTop: SH(26), backgroundColor: colors.themeColor, borderRadius: 50, paddingVertical: 6, alignItems: "center"
    },
    hospital_locator_serchviewText: {
        fontSize: SF(20), fontFamily: getRegularFont(), color: colors.white, fontWeight: "500"
    },
    hospital_locator_totalDataView: {
        paddingHorizontal: 15, paddingTop: 12, paddingBottom: 15, borderRadius: 15, borderWidth: 1, borderColor: colors.borderColor
    },
    hospital_locator_totalDataView_title: {
        color: colors.black, fontFamily: getSemiBoldFont(), fontSize: SF(15)
    },
    hospital_locator_totalDataSubView: {
        flexDirection: "row", alignItems: "center", marginTop: 26
    },
    hospital_locator_totalDataSubSubView: {
        borderRadius: 15, borderWidth: 1, borderColor: colors.borderColor, paddingVertical: 15, paddingLeft: 7, flex: 1
    },
    hospital_locator_totalData_sepator: {
        width: SW(8)
    },
    hospital_locator_totalDataTitle: {
        color: colors.themeColor, fontFamily: getBoldFont(), fontSize: SF(20)
    },
    hospital_locator_totalDataSubTitle: {
        color: colors.black, fontFamily: getRegularFont(), fontSize: SF(13), marginTop: -10
    },
    hospital_details_locateModalMainView: {
        flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)',
    },
    hospital_details_locateModalSubView: {
        backgroundColor: 'white',
        borderColor: '#eee',
        borderRadius: 10,
        borderWidth: 1,
        justifyContent: 'space-between',
        margin: 'auto',
        padding: 20,
        width: "90%",
    },
    hospital_details_locateModalCancelView: {
        alignSelf: "flex-end", justifyContent: "center", paddingVertical: 5, paddingHorizontal: 15, borderRadius: 5, marginTop: 20
    },
    hospital_details_locateModalCancelText: {
        textAlign: 'center', fontSize: SF(12), color: colors.black, textTransform: "uppercase", fontFamily: getSemiBoldFont(),
    },
    hospital_details_locateModalSubSubView: {
        maxHeight: 250
    },
    hospital_details_locateModaltitle: {
        textAlign: 'left', fontSize: SF(18), color: colors.black, fontFamily: getBoldFont(), textTransform: "capitalize"
    },
    hospital_details_locateModalList: {
        marginTop: 10
    },
    hospital_details_locateModalListSeparator: {
        borderBottomWidth: 1, borderBottomColor: colors.borderColor, marginHorizontal: 10
    },
    hospital_details_locateModalListItem: {
        flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingVertical: 10, paddingHorizontal: 15,
    },
    hospital_details_locateModalListItemText: {
        textAlign: 'left', fontSize: SF(12), color: colors.black, textTransform: "uppercase", fontFamily: getRegularFont(),
    },
    hospital_details_locateModalListItemImage: {
        width: SH(20), height: SH(20), resizeMode: "contain", tintColor: colors.themeColor
    },






});