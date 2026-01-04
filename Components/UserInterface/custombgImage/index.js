import React from 'react';
import { ImageBackground, Dimensions, View } from 'react-native';


const CustomBackground = ({ children, width, height, borderTopLeftRadius, borderTopRightRadius }) => {
    return (
        <ImageBackground
            source={require("../../../Components/Assests/onboarding.jpg")}
            style={{
                width: width,
                height: height,
                borderTopRightRadius: borderTopRightRadius,
                borderTopLeftRadius: borderTopLeftRadius
            }}
        >
            <View style={{ flex: 1 }}>
                {children}
            </View>
        </ImageBackground>
    );
};

export default CustomBackground;
