import React from "react";
import {
  LayoutChangeEvent,
  NativeScrollEvent,
  ScrollViewProps,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedScrollHandler,
} from "react-native-reanimated";
import {
  NestableScrollContainerProvider,
  useSafeNestableScrollContainerContext,
} from "../context/nestableScrollContainerContext";
import { useStableCallback } from "../hooks/useStableCallback";

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);
const isCloseToBottom = ({
  layoutMeasurement,
  contentOffset,
  contentSize,
}: NativeScrollEvent) => {
  const paddingToBottom = 20;
  return (
    layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom
  );
};
type NestableScrollContainerInnerProps = {
  onEndReached?: () => void;
} & ScrollViewProps;
function NestableScrollContainerInner(
  props: NestableScrollContainerInnerProps
) {
  const {
    outerScrollOffset,
    containerSize,
    scrollViewSize,
    scrollableRef,
    outerScrollEnabled,
  } = useSafeNestableScrollContainerContext();
  console.log("From nesatable scroll");
  const handleEndReached = useStableCallback(() => {
    props.onEndReached?.();
  });

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (scrollProps) => {
      outerScrollOffset.value = scrollProps.contentOffset.y;
      if (isCloseToBottom(scrollProps)) {
        runOnJS(handleEndReached)();
      }
    },
  });

  const onLayout = useStableCallback((event: LayoutChangeEvent) => {
    const {
      nativeEvent: { layout },
    } = event;
    containerSize.value = layout.height;
  });

  const onContentSizeChange = useStableCallback((w: number, h: number) => {
    scrollViewSize.value = h;
    props.onContentSizeChange?.(w, h);
  });

  return (
    <AnimatedScrollView
      {...props}
      onLayout={onLayout}
      onContentSizeChange={onContentSizeChange}
      scrollEnabled={outerScrollEnabled}
      ref={scrollableRef}
      scrollEventThrottle={1}
      onScroll={scrollHandler}
    />
  );
}

export const NestableScrollContainer = React.forwardRef(
  (
    props: NestableScrollContainerInnerProps,
    forwardedRef?: React.ForwardedRef<ScrollView>
  ) => {
    return (
      <NestableScrollContainerProvider
        forwardedRef={
          (forwardedRef as React.MutableRefObject<ScrollView>) || undefined
        }
      >
        <NestableScrollContainerInner {...props} />
      </NestableScrollContainerProvider>
    );
  }
);
