import React from "react";
import { Stack } from "expo-router";

const MainLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
};

export default MainLayout;
