import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Button,
  Image,
  Modal,
  TouchableOpacity,
} from "react-native";
import * as Linking from "expo-linking";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faEllipsisV, faPlayCircle } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const MusicContainer = ({ music }) => {
  const [showModal, setModal] = useState(false);
  return (
    <>
      <TouchableOpacity onPress={() => setModal(true)}>
        <View>
          <View style={styles.album}>
            <View style={styles.text}>
              <Text style={{ fontWeight: "bold", fontSize: 14 }}>
                {music.name}
              </Text>
              <Text
                style={{ color: "cornflowerblue", fontSize: 12 }}
                numberOfLines={1}
              >
                {music.artists}
              </Text>
            </View>
            <View style={styles.image}>
              <Image
                source={{
                  uri: music.image,
                  width: 50,
                  height: 50,
                }}
                resizeMode="contain"
              />
              <FontAwesomeIcon
                icon={faEllipsisV}
                size={18}
                color={"cornflowerblue"}
              />
            </View>
          </View>
        </View>
      </TouchableOpacity>
      <View>
        <Modal visible={showModal} animationType="slide">
          <SafeAreaView style={styles.modal}>
            <Image
              source={{
                uri: music.image,
                width: 200,
                height: 200,
              }}
              resizeMode="contain"
            />
            <Text
              style={{
                fontSize: 22,
                fontWeight: "bold",
                textAlign: "center",
                padding: 15,
              }}
            >
              {music.name}
            </Text>
            <Text
              style={{
                fontSize: 15,
                color: "grey",
                textAlign: "center",
              }}
            >
              {music.artists}
            </Text>
            <View style={styles.listen}>
              <View>
                <Text
                  style={{
                    color: "cornflowerblue",
                    fontWeight: "600",
                    fontSize: 20,
                  }}
                >
                  Listen Now
                </Text>
              </View>
              <View>
                <TouchableOpacity onPress={() => Linking.openURL(music.link)}>
                  <FontAwesomeIcon
                    icon={faPlayCircle}
                    size={30}
                    color={"cornflowerblue"}
                    paddingLeft={40}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <Text style={{ color: "cornflowerblue", fontSize: 15 }}>
              {music.genre} | {music.releaseDate}
            </Text>
            <Text style={{ padding: 15, fontSize: 13 }}>{music.record}</Text>
            <Button title="Close" onPress={() => setModal(false)} />
          </SafeAreaView>
        </Modal>
      </View>
    </>
  );
};

export default MusicContainer;

const styles = StyleSheet.create({
  album: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    paddingRight: 20,
    flex: 2,
    flexDirection: "column",
    justifyContent: "center",
  },
  image: {
    flexDirection: "row",
    alignItems: "center",
  },
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  listen: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
  },
});
