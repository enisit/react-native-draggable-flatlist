import React from "react";
import { ScrollViewProps } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
export declare const NestableScrollContainer: React.ForwardRefExoticComponent<
  {
    onEndReached?: (() => void) | undefined;
  } & ScrollViewProps &
    React.RefAttributes<ScrollView>
>;
