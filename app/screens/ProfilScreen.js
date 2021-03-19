import React, { useEffect, useState } from "react";
import { Linking } from "react-native";
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";

function ProfilScreen({ route }) {
  // prend la liste des params que j'ai passer depuis la page @home@
  const listeAnime = route.params.listeparam;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        contentContainerStyle={{ padding: 12 }}
        data={listeAnime}
        keyExtractor={(item) => item.mal_id.toString()}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => Linking.openURL(item.url)}
              style={
                ([StyleSheet.absoluteFillObject],
                {
                  backgroundColor: "white",
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 5,
                  },
                  shadowOpacity: 0.36,
                  shadowRadius: 6.68,

                  elevation: 11,
                  borderRadius: 16,
                  marginBottom: 12,
                })
              }
            >
              <View style={{ flex: 1, padding: 12, flexDirection: "row" }}>
                <View
                  style={{
                    flex: 1,
                  }}
                >
                  <Image
                    style={{
                      width: 90,
                      height: 90,
                      borderRadius: 8,
                    }}
                    source={{ uri: item.image_url }}
                  ></Image>
                </View>
                <View
                  style={{
                    flex: 2,
                    alignItems: "flex-start",
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 20,
                      fontWeight: "bold",
                    }}
                  >
                    {item.title}
                  </Text>

                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 14,
                    }}
                  >
                    Rank: {item.rank}
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                    }}
                  >
                    From: {item.animeography[0].name}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
export default ProfilScreen;
