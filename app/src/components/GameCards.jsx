
import React from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronRight, Gamepad2 } from 'lucide-react-native';

import RockPaperScissors from '../assets/rock-paper-scissors.jpg';
import Trivia from '../assets/trivia.jpg';
import Tictac from '../assets/tictac.jpg';
import Mines from '../assets/Mines.jpg';
import GuessNumber from '../assets/guess_number.jpg';

const games = [
  { id: '1', name: 'Rock Paper Scissors', image: RockPaperScissors },
  { id: '2', name: 'Trivia', image: Trivia },
  { id: '3', name: 'Tic Tac Toe', image: Tictac },
  { id: '4', name: 'Mines', image: Mines },
  { id: '5', name: 'Guess the Number', image: GuessNumber },
];

const GameCards = ({ onPlayGame }) => {
  const router = useRouter();

  const handlePlay = (game) => {
    if (onPlayGame) {
      onPlayGame(game);
    } else if (game.id === '1') {
      router.push('/games/rock-paper-scissors');
    } else {
      console.log(`Selected game: ${game.name}`);
    }
  };

  return (
    <View className="flex-row flex-wrap px-2">
      {games.map((item) => (
        <View key={item.id} className="w-1/2 p-2">
          <View className="overflow-hidden rounded-2xl border border-gray-100 bg-white">
            <Image
              source={item.image}
              className="h-36 w-full"
              resizeMode="cover"
            />

            <View className="p-3">
              <Text className="text-base font-bold text-gray-800">
                {item.name}
              </Text>

              <Pressable
                onPress={() => handlePlay(item)}
                className="mt-3 flex-row items-center justify-center rounded-xl bg-emerald-600 px-3 py-2.5"
                style={({ pressed }) => ({
                  opacity: pressed ? 0.8 : 1,
                })}
              >
                <Gamepad2 size={17} color="#FFFFFF" />

                <Text className="ml-2 font-semibold text-white">
                  Play Now
                </Text>

                <ChevronRight size={17} color="#FFFFFF" />
              </Pressable>
            </View>
          </View>
        </View>
      ))}
    </View>
  );
};

export default GameCards;
