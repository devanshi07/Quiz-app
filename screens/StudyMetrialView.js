import React, { useEffect, useRef, useState } from 'react';
import { View, SafeAreaView, Pressable, Image, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import { PRIVACY_POLICY } from '../common/string';
import { getPopMediumFont, getRegularFont, progressView } from '../common/utils';
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

      {/* {isLoading ? progressView(isLoading) :  */}
      <View style={externalStyles.container}>
        <WebView
          onLoad={() => setLoading(false)}
          source={{ uri: paramItem?.pdf != "" && paramItem?.pdf != null ? paramItem?.pdf : paramItem?.video_link }}
        />
      </View>
      {/* } */}
    </SafeAreaView>
  );
}

export default StudyMetrialView;