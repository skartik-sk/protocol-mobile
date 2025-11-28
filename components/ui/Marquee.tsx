import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  Dimensions,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  interpolate,
  runOnJS,
} from 'react-native-reanimated';

interface MarqueeProps {
  text: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
  duration?: number;
  spacing?: number;
  loop?: boolean;
  pauseOnHover?: boolean;
}

const Marquee: React.FC<MarqueeProps> = ({
  text,
  style,
  textStyle,
  duration = 15000,
  spacing = 50,
  loop = true,
  pauseOnHover = false,
}) => {
  const translateX = useSharedValue(0);
  const textWidthRef = useRef(0);
  const containerWidthRef = useRef(Dimensions.get('window').width);

  const animatedStyle = useAnimatedStyle(() => {
    const progress = translateX.value;

    // Create continuous scrolling animation
    const scrollDistance = textWidthRef.current + spacing;
    const fullDistance = scrollDistance * 2; // For seamless loop

    return {
      transform: [
        {
          translateX: interpolate(
            progress,
            [0, 1],
            [0, -scrollDistance]
          ),
        },
      ],
    };
  });

  useEffect(() => {
    // Start the animation
    translateX.value = withRepeat(
      withTiming(1, { duration }),
      -1, // Infinite repeats
      false // No reverse
    );
  }, [duration, translateX]);

  const onTextLayout = (event: any) => {
    textWidthRef.current = event.nativeEvent.layout.width;
  };

  const onContainerLayout = (event: any) => {
    containerWidthRef.current = event.nativeEvent.layout.width;
  };

  return (
    <View
      style={[styles.container, style]}
      onLayout={onContainerLayout}
    >
      <Animated.View style={[styles.marqueeContainer, animatedStyle]}>
        <Text
          style={[styles.marqueeText, textStyle]}
          onLayout={onTextLayout}
        >
          {text}
        </Text>
        {loop && (
          <Text
            style={[styles.marqueeText, textStyle, { paddingLeft: spacing }]}
          >
            {text}
          </Text>
        )}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  marqueeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  marqueeText: {
    // Text styles will be passed via props
  },
});

export default Marquee;