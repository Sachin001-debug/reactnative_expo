
import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Navbar = () => {
  return (
    <SafeAreaView className="bg-blue-600">
      <View className="flex-row items-center justify-between px-5 py-4">
        <Text className="text-2xl font-bold text-white">
          GameZone
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Navbar;
