import { useEffect } from "react";
import {
  Text,
  View,
  ImageBackground,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";
import { BaiJamjuree_700Bold } from "@expo-google-fonts/bai-jamjuree";
import { useAuthRequest, makeRedirectUri } from "expo-auth-session";
import * as SecureStore from "expo-secure-store";
import { api } from "../src/lib/api";
import { styled } from "nativewind";

import blurBg from "../src/assets/bg-blur.png";
import Stripes from "../src/assets/stripes.svg";
import NlwLogo from "../src/assets/nlw-spacetime.svg";

const StyledStripes = styled(Stripes);

const discovery = {
  authorizationEndpoint: "https://github.com/login/oauth/authorize",
  tokenEndpoint: "https://github.com/login/oauth/access_token",
  revocationEndpoint:
    "https://github.com/settings/connections/applications/0b0c3df543465bd41769",
};

export default function App() {
  const router = useRouter();

  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    BaiJamjuree_700Bold,
  });

  const [request, response, signIn] = useAuthRequest(
    {
      clientId: "0b0c3df543465bd41769",
      scopes: ["identity"],
      redirectUri: makeRedirectUri({
        scheme: "nlwspacetime",
      }),
    },
    discovery
  );

  async function handleGitHubOAuthCode(code: string) {
    const response = await api.post("/register", {
      code,
    });

    const { token } = response.data;

    await SecureStore.setItemAsync("token", token);

    router.push("/memories");
  }

  useEffect(() => {
    if (response?.type === "success") {
      const { code } = response.params;

      handleGitHubOAuthCode(code);
    }
  }, [response]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ImageBackground
      source={blurBg}
      className="relative flex-1 items-center bg-gray-900 px-8 py-10"
      imageStyle={{ position: "absolute", left: "-100%" }}
    >
      <StyledStripes className="absolute left-2" />
      <View className="flex-1 items-center justify-center gap-6">
        <NlwLogo />
        <View className="space-y-2">
          <Text className="text-center font-title text-2xl leading-tight text-gray-50">
            Sua cápsula do tempo
          </Text>
          <Text className="text-center font-body text-base leading-relaxed text-gray-100">
            Colecione momentos marcantes da sua jornada e compartilhe (se
            quiser) com o mundo!
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => signIn()}
          activeOpacity={0.7}
          className="inline-block rounded-full bg-green-500 px-5 py-2"
        >
          <Text className="font-alt text-sm uppercase text-black">
            Começar a cadastrar
          </Text>
        </TouchableOpacity>
      </View>
      <Text className="text-center font-body text-sm leading-relaxed text-gray-200">
        Feito com 💜 por Alexandre
      </Text>
      <StatusBar barStyle="light-content" translucent />
    </ImageBackground>
  );
}
