
import React from "react";
import { View, Image, Text, Pressable, ScrollView } from "react-native";
import {
  Bot,
  Users,
  Gamepad2,
  ChevronRight,
  Sparkles,
  Trophy,
} from "lucide-react-native";

import GameCards from "../components/GameCards";
import Navbar from "../components/Navbar";

import BotImage from "../assets/bot.jpg";
import OnlineUser from "../assets/onlineUser.jpg";

const Dashboard = () => {
  const modes = [
    {
      id: "1",
      name: "Play with Bot",
      subtitle: "Challenge AI",
      image: BotImage,
      icon: Bot,
      color: "#D1FAE5",
      iconColor: "#047857",
    },
    {
      id: "2",
      name: "Play Online",
      subtitle: "Challenge a player for 1v1",
      image: OnlineUser,
      icon: Users,
      color: "#DBEAFE",
      iconColor: "#2563EB",
    },
  ];

  return (
    <ScrollView
      className="flex-1 bg-blue-100"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 32 }}
    >
      <View>
        <Navbar />

        {/* Welcome */}
        <View className="flex-row items-center justify-between px-5 pb-6 pt-5">
          <View className="flex-1">
            <Text className="text-sm font-medium text-gray-500">
              READY TO PLAY?
            </Text>

            <Text className="mt-1 text-3xl font-extrabold text-gray-900">
              Game On!
            </Text>

            <Text className="mt-2 text-sm text-gray-500">
              Challenge yourself or compete with others.
            </Text>
          </View>

          <View className="h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100">
            <Gamepad2 size={30} color="#059669" />
          </View>
        </View>

        {/* Game Modes */}
        <View className="mb-1 flex-row items-center gap-2 px-5">
          <Sparkles size={20} color="#059669" />
          <Text className="text-xl font-bold text-gray-900">
            Choose Your Mode For 1v1 of 5 Games
          </Text>
        </View>

        <View className="flex-row gap-4 px-5 py-4">
          {modes.map((mode) => {
            const ModeIcon = mode.icon;

            return (
              <Pressable
                key={mode.id}
                onPress={() => {
                  // TODO: Navigate to the selected mode
                }}
                className="flex-1 overflow-hidden rounded-2xl border border-gray-100 bg-white"
                style={({ pressed }) => ({
                  opacity: pressed ? 0.85 : 1,
                })}
              >
                <View>
                  <Image
                    source={mode.image}
                    className="h-32 w-full"
                    resizeMode="cover"
                  />

                  <View
                    className="absolute right-2 top-2 h-9 w-9 items-center justify-center rounded-xl"
                    style={{ backgroundColor: mode.color }}
                  >
                    <ModeIcon size={19} color={mode.iconColor} />
                  </View>
                </View>

                <View className="p-3">
                  <Text className="text-sm font-bold text-gray-900">
                    {mode.name}
                  </Text>

                  <Text className="mt-1 text-xs text-gray-500">
                    {mode.subtitle}
                  </Text>

                  <View className="mt-3 flex-row items-center justify-between">
                    <Text className="text-xs font-semibold text-emerald-700">
                      Play now
                    </Text>
                    <ChevronRight size={17} color="#047857" />
                  </View>
                </View>
              </Pressable>
            );
          })}
        </View>

        {/* Game Collection Heading */}
        <View className="mb-1 mt-3 flex-row items-center justify-between px-5">
          <View className="flex-row items-center gap-2">
            <Trophy size={20} color="#059669" />

            <Text className="text-xl font-bold text-gray-900">
              Game Collection
            </Text>
          </View>

          <Text className="text-sm font-medium text-emerald-700">
            5 Games
          </Text>
        </View>

        <Text className="mb-2 px-5 text-sm text-gray-500">
          Pick your favorite and prove your skills.
        </Text>
      </View>
      <GameCards />
    </ScrollView>
  );
};

export default Dashboard;
