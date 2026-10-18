import React from 'react';
import {
  View,
  Text,
  Pressable,
  ScrollView,
  Alert,
  SafeAreaView,
} from 'react-native';
import { useAuth } from '../context/AuthContextProvider';

const Dashboard = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    Alert.alert(
      'Log Out',
      'Are you sure you want to log out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Log Out', style: 'destructive', onPress: logout },
      ]
    );
  };

  const initial = user?.name ? user.name.charAt(0).toUpperCase() : 'U';

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <ScrollView
        contentContainerClassName="p-6"
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="mb-6 flex-row items-center justify-between">
          <View>
            <Text className="text-sm font-medium text-slate-500">
              Welcome back,
            </Text>
            <Text className="text-2xl font-bold text-slate-900">
              {user?.name || 'User'}
            </Text>
          </View>
          <View className="h-12 w-12 items-center justify-center rounded-full bg-emerald-600 shadow-sm">
            <Text className="text-xl font-bold text-white">{initial}</Text>
          </View>
        </View>

        {/* Profile Card */}
        <View className="mb-6 rounded-3xl bg-white p-6 shadow-sm border border-slate-100">
          <Text className="text-lg font-bold text-slate-800 mb-4">
            Account Information
          </Text>

          <View className="mb-4">
            <Text className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Full Name
            </Text>
            <Text className="text-base font-medium text-slate-800 mt-1">
              {user?.name || 'N/A'}
            </Text>
          </View>

          <View className="mb-4">
            <Text className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Email Address
            </Text>
            <Text className="text-base font-medium text-slate-800 mt-1">
              {user?.email || 'N/A'}
            </Text>
          </View>

          {user?.id && (
            <View className="mb-2">
              <Text className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                User ID
              </Text>
              <Text className="text-base font-medium text-slate-800 mt-1">
                #{user.id}
              </Text>
            </View>
          )}
        </View>

        {/* Status card */}
        <View className="mb-8 rounded-3xl bg-emerald-50 p-6 border border-emerald-100">
          <View className="flex-row items-center mb-2">
            <View className="h-3 w-3 rounded-full bg-emerald-500 mr-2" />
            <Text className="text-sm font-semibold text-emerald-800">
              Status: Active & Logged In
            </Text>
          </View>
          <Text className="text-sm text-emerald-700 leading-relaxed">
            Your session is authenticated and securely connected to your backend API.
          </Text>
        </View>

        {/* Log Out Button */}
        <Pressable
          onPress={handleLogout}
          className="items-center justify-center rounded-2xl bg-rose-600 py-4 shadow-sm active:bg-rose-700"
          accessibilityRole="button"
          accessibilityLabel="Log Out"
        >
          <Text className="text-base font-bold text-white">Log Out</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Dashboard;
