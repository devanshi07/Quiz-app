import React, { useEffect, useRef, useState } from 'react';
import { View, SafeAreaView, Pressable, Image, Text, ScrollView, Linking } from 'react-native';
import { WebView } from 'react-native-webview';
import { PRIVACY_POLICY } from '../common/string';
import { getPopBoldFont, getPopMediumFont, getRegularFont, progressView } from '../common/utils';
import { colors } from '../common/color';
import { externalStyles } from '../common/styles';
import images from '../assets/images';
import { SF, SH, SW } from '../common/dimensions';

function StudyMetrialView({ route, navigation }) {
  const [isLoading, setLoading] = useState(true);
  const paramItem = route.params?.paramItem;

  return (
    <SafeAreaView style={externalStyles.container}>

      {/* header view */}
      <View style={{ flexDirection: "row", alignItems: "center", marginHorizontal: SW(12), marginTop: SH(28.87) }}>
        <Pressable style={{ padding: 10 }} onPress={() => navigation.goBack()}>
          <Image source={images.back_arrow} style={{ height: SH(23), width: SH(23), resizeMode: "contain", tintColor: colors.black }} />
        </Pressable>
        <Text style={{ color: colors.black, fontSize: SF(18), fontFamily: getPopMediumFont() }}>{paramItem?.title}</Text>
      </View>
      {/* end of header view */}

      <ScrollView>
        {paramItem?.video_link != null && paramItem?.video_link != "" ? <View style={externalStyles.container}>
          <WebView style={{ height: 300 }}
            onLoad={() => setLoading(false)}
            source={{ uri: paramItem?.video_link }}
          />
        </View> : null}
        <View style={{ marginHorizontal: SW(30), marginTop: SH(30) }}>
          {/* <Text style={{ color: colors.black, fontSize: SF(20), fontFamily: getPopBoldFont() }}>{"Details"}</Text> */}
          <Text style={{ color: colors.black, fontSize: SF(18), fontFamily: getPopMediumFont(), textAlign: "justify" }}>{paramItem?.description}</Text>
        </View>
      </ScrollView>
      {paramItem?.pdf_url != "" && paramItem?.pdf_url != null ? <Pressable onPress={() => Linking.openURL(paramItem?.pdf_url)}
        style={{ backgroundColor: colors.themeYellowColor, alignSelf: "flex-end", paddingHorizontal: SW(14), paddingVertical: SH(13), borderRadius: 360, marginTop: SH(54), marginRight: SW(20), marginBottom: SH(20) }}>
        <Image source={images.document_file} style={{ height: SH(45), width: SH(45), resizeMode: "contain", tintColor: colors.white }} />
      </Pressable> : null}
    </SafeAreaView>
  );
}

export default StudyMetrialView;