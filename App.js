import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faMusic, faSearch } from "@fortawesome/free-solid-svg-icons";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Button,
} from "react-native";
import axios from "axios";
import MusicContainer from "./components/musicContainer.js";

export default function App() {
  const [topHits, setTopHits] = useState([]);
  const [filteredHits, setFilteredHits] = useState([]);
  const [query, setQuery] = useState("");

  const searchQuery = () => {
    let filtered = topHits.filter(
      (hit) => hit["name"].includes(query) || hit["artists"].includes(query)
    );
    setFilteredHits(filtered);
  };

  useEffect(() => {
    axios
      .get(`https://itunes.apple.com/us/rss/topalbums/limit=100/json`)
      .then((response) => {
        let data = response.data.feed.entry;
        let hits = [];
        data.forEach((entry) => {
          hits.push({
            id: entry["id"]["attributes"]["im:id"],
            name: entry["im:name"]["label"],
            image: entry["im:image"][2]["label"],
            price: `${entry["im:price"]["attributes"]["amount"]} ${entry["im:price"]["attributes"]["currency"]}`,
            artists: entry["im:artist"]["label"],
            releaseDate: entry["im:releaseDate"]["attributes"]["label"],
            genre: entry["category"]["attributes"]["term"],
            record: entry["rights"]["label"],
            link: entry["link"]["attributes"]["href"],
          });
        });
        setTopHits(hits);
        setFilteredHits(hits);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.titleFont}>Our Top 100 Albums</Text>
        <FontAwesomeIcon icon={faMusic} size={30} color={"cornflowerblue"} />
      </View>
      <View style={styles.search}>
        <TextInput
          onChangeText={setQuery}
          value={query}
          placeholder="Search: Album Name or Artist"
          style={styles.input}
        />
        <TouchableOpacity onPress={() => searchQuery()}>
          <FontAwesomeIcon icon={faSearch} size={30} color={"cornflowerblue"} />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={styles.musicContainer}>
          {filteredHits.length ? (
            filteredHits.map((music) => (
              <View style={styles.music} key={music.id}>
                <MusicContainer music={music} />
              </View>
            ))
          ) : (
            <View>
              <Text>No Results Found: {query}</Text>
              <Button
                title="Go Back"
                onPress={() => {
                  setFilteredHits(topHits);
                  setQuery("");
                }}
              />
            </View>
          )}
        </View>
      </ScrollView>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginLeft: 20,
    marginRight: 20,
  },
  titleFont: {
    fontSize: 25,
    fontWeight: "bold",
  },
  title: {
    paddingTop: 40,
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginLeft: 20,
    marginRight: 20,
  },
  music: {
    padding: 5,
    borderColor: "grey",
    borderTopWidth: 0.5,
  },
  musicContainer: {
    paddingBottom: 30,
  },
  input: {
    width: "70%",
    height: 35,
    marginRight: 14,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
  search: {
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 15,
    paddingBottom: 15,
  },
});
