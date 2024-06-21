import React, { useEffect, useRef, useState } from 'react';
import { View, SafeAreaView, Pressable, Image, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import { PRIVACY_POLICY } from '../common/string';
import { getRegularFont, progressView } from '../common/utils';
import { colors } from '../common/color';
import { externalStyles } from '../common/styles';
import images from '../assets/images';

function CommonWeb({ route, navigation }) {
  const [isLoading, setLoading] = useState(true);

  return (
    <SafeAreaView style={externalStyles.coloredContainer}>
      <View style={externalStyles.headerView}>
        <Pressable onPress={() => navigation.goBack()} style={externalStyles.headerIconView}>
          <Image source={images.back_arrow} style={externalStyles.headerIcon} />
        </Pressable>
        <Text style={externalStyles.headerText}>Privacy Policy</Text>
      </View>
      {/* {isLoading ? progressView(isLoading) :  */}
      <View style={externalStyles.coloredContainer}>
        <WebView
          onLoad={() => setLoading(false)}
          source={{ uri: PRIVACY_POLICY }}
          style={{ backgroundColor: colors.themeGreenColor }}
        />
      </View>
      {/* } */}
    </SafeAreaView>
  );
}

export default CommonWeb;