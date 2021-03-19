import React, { useEffect, useState } from "react";
import Toast from "react-native-toast-message";

import {
  FlatList,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";

function HomeScreen({ navigation }) {
  const [animeData, setAnimeData] = useState([]);
  const BASE_URI = "https://api.jikan.moe/v3";
  const ListeAnimeAime = [];

  useEffect(() => {
    getAnimeData();
  }, []);

  const getAnimeData = async () => {
    return fetch(BASE_URI + "/top/characters/1")
      .then((response) => response.json())
      .then((json) => {
        setAnimeData(json.top);
        /*json.top[0][.image_url]
        json.top[0].title
        json.top[0].rank*/
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const putAnimeFav = (item) => {
    if (!ListeAnimeAime.find((x) => x.mal_id === item.mal_id)) {
      ListeAnimeAime.push(item);
      return true;
    } else {
      const index = ListeAnimeAime.indexOf(item);
      if (index > -1) {
        ListeAnimeAime.splice(index, 1);
      }
      return false;
    }
  };
  // Layout pour la barre de navigation supérieur
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Profil", {
              listeparam: ListeAnimeAime,
            })
          }
        >
          <Image
            source={{ uri: "https://i.ytimg.com/vi/MdyVkIMS7Is/hqdefault.jpg" }}
            style={{ width: 30, height: 30, marginRight: 16, borderRadius: 20 }}
          />
        </TouchableOpacity>
      ),
    });
  });
  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      <FlatList
        contentContainerStyle={{ padding: 12 }}
        data={animeData}
        keyExtractor={(item) => item.mal_id.toString()}
        numColumns={2}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => {
                putAnimeFav(item)
                  ? Toast.show({
                      type: "success",
                      position: "bottom",
                      text1: "ADDED",
                      text2: item.title + " has been ADDED to your collection",
                      visibilityTime: 2000,
                      topOffset: 30,
                      onShow: () => {},
                      onHide: () => {},
                      onPress: () => {},
                    })
                  : Toast.show({
                      type: "info",
                      position: "bottom",
                      text1: "REMOVED",
                      text2:
                        item.title + " has been REMOVED from your collection",
                      visibilityTime: 2000,
                      topOffset: 30,
                      onShow: () => {},
                      onHide: () => {},
                      onPress: () => {},
                    });
              }}
              style={
                ([StyleSheet.absoluteFillObject],
                {
                  backgroundColor: "white",
                  borderRadius: 6,
                  margin: 12,
                  padding: 12,
                  width: "43%",
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 5,
                  },
                  shadowOpacity: 0.36,
                  shadowRadius: 6.68,

                  elevation: 11,

                  alignItems: "center",
                })
              }
            >
              <Image
                style={{
                  width: 90,
                  height: 90,
                  borderRadius: 100,
                }}
                source={{ uri: item.image_url }}
              ></Image>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 16,
                  fontWeight: "bold",
                }}
              >
                {item.title}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </SafeAreaView>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({});
