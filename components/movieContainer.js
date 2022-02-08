import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Dimensions,
  Button,
  Image,
  Modal,
  TouchableOpacity,
} from "react-native";
import * as Linking from "expo-linking";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faExclamationCircle,
  faAngleDoubleUp,
} from "@fortawesome/free-solid-svg-icons";
import Stars from "react-native-stars";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import StarRating from "react-native-star-rating";

const MovieContainer = ({ movie }) => {
  const [showModal, setModal] = useState(false);
  return (
    <>
      <View>
        <TouchableOpacity onPress={() => setModal(true)}>
          <Image
            source={{ uri: movie.poster, width: 100, height: 150 }}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <View style={styles.icons}>
          {movie.rating >= 8.5 && (
            <FontAwesomeIcon icon={faAngleDoubleUp} size={20} color={"gold"} />
          )}
          {movie.classification === "18+" && (
            <FontAwesomeIcon
              icon={faExclamationCircle}
              size={20}
              color={"gold"}
            />
          )}
        </View>
      </View>
      <View>
        <Modal visible={showModal} animationType="slide">
          <ScrollView style={styles.modal}>
            <Image
              source={{
                uri: movie.backdrop,
                width: Dimensions.get("window").width,
                height: (Dimensions.get("window").width * 2) / 3,
              }}
              resizeMode="contain"
              style={{ marginTop: -20, position: "relative" }}
            />
            <View style={styles.title}>
              <View>
                <Image
                  source={{
                    uri: movie.poster,
                    width: 100,
                    height: 150,
                  }}
                  resizeMode="contain"
                />
              </View>
              <View style={{ paddingLeft: 10 }}>
                <View style={{ marginRight: 100, paddingBottom: 5 }}>
                  <Text style={styles.textTitle}>
                    {movie.title} ({movie.rating}/10)
                  </Text>
                </View>
                <View style={{ width: 100 }}>
                  <StarRating
                    disabled={true}
                    maxStars={5}
                    rating={(movie.rating / 10) * 5}
                    fullStarColor={"gold"}
                    starSize={20}
                    starStyle={{ width: 30, justifyContent: "center" }}
                  />
                </View>
              </View>
            </View>
            <View
              style={{
                flexDirection: "column",
                top: -95,
                marginTop: 20,
                marginLeft: 20,
                marginRight: 20,
              }}
            >
              <View style={styles.textSpacing}>
                <Text
                  style={{
                    color: "gold",
                    fontWeight: "bold",
                    fontSize: 15,
                  }}
                >
                  {movie.releaseDate} | {movie.length}
                </Text>
              </View>
              <View>
                {movie.rating >= 8.5 && (
                  <View
                    style={{
                      flexDirection: "row",
                      paddingTop: 5,
                      paddingBottom: 5,
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faAngleDoubleUp}
                      size={20}
                      color={"gold"}
                    />
                    <Text
                      style={{
                        fontWeight: "bold",
                        color: "gold",
                        fontSize: 15,
                      }}
                    >
                      {"  "}
                      Top Rated Movie!
                    </Text>
                  </View>
                )}
                {movie.classification === "18+" && (
                  <View
                    style={{
                      flexDirection: "row",
                      paddingTop: 5,
                      paddingBottom: 5,
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faExclamationCircle}
                      size={20}
                      color={"gold"}
                    />
                    <Text
                      style={{
                        fontWeight: "bold",
                        color: "gold",
                        fontSize: 15,
                      }}
                    >
                      {"  "}
                      Restricted: 18+
                    </Text>
                  </View>
                )}
              </View>
              <View style={styles.textSpacing}>
                <Text
                  style={{
                    color: "gold",
                    fontSize: 15,
                    fontWeight: "bold",
                  }}
                >
                  Starring:{" "}
                  {Array.isArray(movie.cast)
                    ? movie.cast.join(", ")
                    : movie.cast}
                </Text>
              </View>
              <View style={styles.textSpacing}>
                <Text
                  style={{
                    color: "gold",
                    fontSize: 15,
                  }}
                >
                  Directed by:{" "}
                  {Array.isArray(movie.director)
                    ? movie.director.join(", ")
                    : movie.director}
                </Text>
              </View>
              <View style={styles.textSpacing}>
                <Text style={{ color: "gold", fontSize: 15, marginBottom: 30 }}>
                  Synopsis: {movie.overview}
                </Text>
              </View>
              <View>
                <Button title="Close" onPress={() => setModal(false)} />
              </View>
            </View>
          </ScrollView>
        </Modal>
      </View>
    </>
  );
};

export default MovieContainer;

const styles = StyleSheet.create({
  icons: {
    flexDirection: "row",
    paddingTop: 10,
  },
  image: {
    flexDirection: "row",
    alignItems: "center",
  },
  modal: {
    backgroundColor: "#404040",
    height: Dimensions.get("window").height,
  },
  title: {
    marginLeft: 20,
    marginRight: 20,
    top: -95,
    flexDirection: "row",
    alignItems: "flex-end",
    position: "relative",
  },
  textTitle: {
    color: "gold",
    fontSize: 20,
    fontWeight: "bold",
    flexWrap: "wrap",
  },
  myStarStyle: {
    color: "yellow",
    backgroundColor: "transparent",
    textShadowColor: "black",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  myEmptyStarStyle: {
    color: "white",
  },
  textSpacing: {
    paddingTop: 5,
    paddingBottom: 5,
  },
});
