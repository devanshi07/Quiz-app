import React, { useEffect, useMemo } from 'react';
import { ActivityIndicator, FlatList, useWindowDimensions, Alert, ImageBackground, TextInput } from 'react-native';
import { Modal, Text, View, Image, Pressable, } from 'react-native';
import { colors } from './color.js';
import { externalStyles } from './styles.js';
import moment from 'moment';

// custom loading view
export const progressView = (isProgressVisible) => {
    return (
        // <Modal
        //     animationType="slide"
        //     transparent={true}
        //     visible={isProgressVisible}>
        //     <View style={externalStyles.loadingMainView}>
        //         <View style={externalStyles.loadingSubView}>
        //             <Text style={externalStyles.loadingText}>Loading</Text>
        //             <ActivityIndicator size="large" color={colors.themeColor} />
        //         </View>
        //     </View>
        // </Modal>
        <View style={[externalStyles.loadingMainView, { backgroundColor: '#ffffff' }]}>
            <View style={externalStyles.loadingSubView}>
                <Text style={externalStyles.loadingText}>Loading</Text>
                <ActivityIndicator size="large" color={colors.themeColor} />
            </View>
        </View>
    );
}




// custom console
export const CustomConsole = (visible) => {
    console.log(visible);
}

// common alert box
export function alertDialogDisplay(title, msg) {
    Alert.alert(title, msg, [
        { text: 'OK' },
    ]);
}

// .00 digits
// export const CustomDigits = (text) => {
//     return parseFloat(text).toFixed(2);
// }

//validate email method
export const validateEmail = (text) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(text) === false) {
        return false;
    }
    else {
        return true;
    }
}

// format date dd-mm-yyyy
export const formatDate = (date) => {
    const datefor = date.getDate() > 9 ? date.getDate() : "0" + date.getDate();
    const month = (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : "0" + date.getMonth() + 1
    const year = date.getFullYear()

    return datefor + "-" + month + "-" + year;
}

// get only date
export const getOnlyDateNo = (date) => {
    const datefor = date.getDate() > 9 ? date.getDate() : "0" + date.getDate();
    return datefor;
}

// get only year
export const dateYear = (date) => {
    const dateyear = date.getFullYear();
    return dateyear;
}

// get time hh:mm a format
export const getTimehhmma = (date) => {
    const time_string = moment(date, "YYYY-MM-DD").format("HH:mm");
    CustomConsole("Month===> ", time_string);
    return time_string;
}

// regular fonts
export const getRegularFont = () => {
    if (Platform.OS === 'ios') {
        return "Inter-Regular"
    } else {
        return "inter_regular"
    }
}

// semi bold fonts
export const getSemiBoldFont = () => {
    if (Platform.OS === 'ios') {
        return "Inter-SemiBold"
    } else {
        return "inter_semibold"
    }
}

// bold fonts
export const getBoldFont = () => {
    if (Platform.OS === 'ios') {
        return "Inter-Bold"
    } else {
        return "inter_bold"
    }
}

// medium fonts
export const getMediumFont = () => {
    if (Platform.OS === 'ios') {
        return "Inter-Medium"
    } else {
        return "inter_medium"
    }
}

// regular fonts
export const getPopRegularFont = () => {
    if (Platform.OS === 'ios') {
        return "Poppins-Regular"
    } else {
        return "poppins_regular"
    }
}

// semi bold fonts
export const getPopSemiBoldFont = () => {
    if (Platform.OS === 'ios') {
        return "Poppins-SemiBold"
    } else {
        return "poppins_semibold"
    }
}

// bold fonts
export const getPopBoldFont = () => {
    if (Platform.OS === 'ios') {
        return "Poppins-Bold"
    } else {
        return "poppins_bold"
    }
}

// mediun fonts
export const getPopMediumFont = () => {
    if (Platform.OS === 'ios') {
        return "Poppins-Medium"
    } else {
        return "poppins_medium"
    }
}

// get month name
// export const getMonthName = (date) => {
//     // date.toLocaleString('en-US', { month: 'short' }); // {month:'long'}

//     const month = moment(date).format("MMM");
//     CustomConsole("Month===> ", month);
//     return month;
// }

// get date format
// export const getFormatDate = (date) => {

//     const month = moment(date).format("DD MMM, YYYY HH:mm a");
//     CustomConsole("Month===> ", month);
//     return month;
// }

// export const formatDateYMD = (date) => {
//     const datefor = date.getDate()
//     const month = date.getMonth() + 1
//     const year = date.getFullYear()

//     return year + "-" + month + "-" + datefor;
// }

// get date YYYY-MM-DD format
// export const getDateYYYYMMDD = (date) => {
//     const date_string = moment(date, "YYYY-MM-DD").format("YYYY-MM-DD");
//     CustomConsole("Date===> ", date_string);
//     return date_string;
// }

// // get time hh:mm a format
// export const getTimehhmma = (date) => {
//     const time_string = moment(date, "YYYY-MM-DD").format("hh:mm a");
//     CustomConsole("Month===> ", time_string);
//     return time_string;
// }

