
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';

import { useAuth } from '../context/AuthContextProvider';

const LoginForm = () => {
  const { login, register, loading } = useAuth();

  const [current, setCurrent] = useState('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const isLogin = current === 'login';

  const handleSubmit = async () => {
    const cleanEmail = email.trim().toLowerCase();

    if (!isLogin && !name.trim()) {
      Alert.alert('Validation Error', 'Please enter your full name.');
      return;
    }

    if (!cleanEmail) {
      Alert.alert('Validation Error', 'Please enter your email.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(cleanEmail)) {
      Alert.alert('Validation Error', 'Please enter a valid email.');
      return;
    }

    if (password.length < 8) {
      Alert.alert(
        'Validation Error',
        'Password must contain at least 8 characters.'
      );
      return;
    }

    try {
      if (isLogin) {
        await login({
          email: cleanEmail,
          password,
        });

        Alert.alert('Success', 'You are logged in!');
      } else {
        const result = await register({
          name: name.trim(),
          email: cleanEmail,
          password,
        });

        Alert.alert(
          'Success',
          result.message || 'Account created successfully.'
        );

        setCurrent('login');
        setPassword('');
      }
    } catch (error) {
      Alert.alert(
        isLogin ? 'Login Failed' : 'Signup Failed',
        error.response?.data?.message ||
          error.message ||
          'Unable to connect to the server. Please try again.'
      );
    }
  };

  const switchForm = () => {
    setCurrent(isLogin ? 'signup' : 'login');
    setShowPassword(false);
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-slate-50"
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerClassName="flex-grow justify-center px-6 py-10"
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View className="mb-8 items-center">
          <View className="mb-5 h-20 w-20 items-center justify-center rounded-3xl bg-emerald-600">
            <Text className="text-4xl font-bold text-white">L</Text>
          </View>

          <Text className="text-3xl font-bold text-slate-900">
            {isLogin ? 'Welcome Back!' : 'Create Account'}
          </Text>

          <Text className="mt-2 text-center text-base text-slate-500">
            {isLogin
              ? 'Sign in to continue to your account'
              : 'Create an account to get started'}
          </Text>
        </View>

        <View className="rounded-3xl bg-white p-6 shadow-sm">
          <Text className="mb-6 text-xl font-bold text-slate-800">
            {isLogin ? 'Login to your account' : 'Sign up for free'}
          </Text>

          {!isLogin && (
            <View className="mb-5">
              <Text className="mb-2 font-semibold text-slate-700">
                Full Name
              </Text>

              <TextInput
                className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-4 text-base text-slate-900"
                placeholder="Enter your full name"
                placeholderTextColor="#94A3B8"
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
                autoCorrect={false}
              />
            </View>
          )}

          <View className="mb-5">
            <Text className="mb-2 font-semibold text-slate-700">
              Email Address
            </Text>

            <TextInput
              className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-4 text-base text-slate-900"
              placeholder="you@example.com"
              placeholderTextColor="#94A3B8"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View className="mb-3">
            <Text className="mb-2 font-semibold text-slate-700">
              Password
            </Text>

            <View className="flex-row items-center rounded-xl border border-slate-200 bg-slate-50">
              <TextInput
                className="flex-1 px-4 py-4 text-base text-slate-900"
                placeholder="At least 8 characters"
                placeholderTextColor="#94A3B8"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="done"
                onSubmitEditing={handleSubmit}
              />

              <Pressable
                className="px-4 py-4"
                onPress={() => setShowPassword(!showPassword)}
                accessibilityRole="button"
                accessibilityLabel={
                  showPassword ? 'Hide password' : 'Show password'
                }
              >
                <Text className="font-semibold text-emerald-700">
                  {showPassword ? 'Hide' : 'Show'}
                </Text>
              </Pressable>
            </View>
          </View>

          {isLogin && (
            <Pressable
              className="mb-6 mt-2 self-end"
              onPress={() =>
                Alert.alert(
                  'Forgot Password',
                  'Password reset is not implemented yet.'
                )
              }
            >
              <Text className="font-semibold text-emerald-700">
                Forgot Password?
              </Text>
            </Pressable>
          )}

          <Pressable
            className={`mt-4 items-center rounded-xl py-4 ${
              loading ? 'bg-emerald-400' : 'bg-emerald-600'
            }`}
            onPress={handleSubmit}
            disabled={loading}
            accessibilityRole="button"
          >
            {loading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text className="text-base font-bold text-white">
                {isLogin ? 'Login' : 'Create Account'}
              </Text>
            )}
          </Pressable>

          <View className="mt-6 flex-row justify-center">
            <Text className="text-slate-500">
              {isLogin
                ? "Don't have an account? "
                : 'Already have an account? '}
            </Text>

            <Pressable onPress={switchForm} disabled={loading}>
              <Text className="font-bold text-emerald-700">
                {isLogin ? 'Sign Up' : 'Login'}
              </Text>
            </Pressable>
          </View>
        </View>

        <Text className="mt-8 text-center text-sm text-slate-400">
          Secure login · Welcome to our app
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginForm;
