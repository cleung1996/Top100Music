import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faFilm, faSearch } from "@fortawesome/free-solid-svg-icons";
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
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MovieContainer from "./components/movieContainer.js";

export default function App() {
  const [allMovies, setAllMovies] = useState([]);
  const [allGenres, setAllGenres] = useState({});
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [filteredGenres, setFilteredGenres] = useState({});
  const [query, setQuery] = useState("");

  const searchQuery = () => {
    if (query === "") {
      setFilteredGenres(allGenres);
      setFilteredMovies(allMovies);
    }

    let filtered = allMovies.filter((movie) => movie["title"].includes(query));

    let genres = {};

    filtered.forEach((movie) => {
      movie["genre"].forEach((aGenre) => {
        genres[aGenre.toString()]
          ? (genres[aGenre.toString()] = [...genres[aGenre.toString()], movie])
          : (genres[aGenre.toString()] = [movie]);
      });
    });

    setFilteredGenres(genres);
    setFilteredMovies(filtered);
  };

  useEffect(() => {
    axios
      .get(`https://wookie.codesubmit.io/movies?q=${query}`, {
        headers: {
          Authorization: "Bearer Wookie2019",
        },
      })
      .then((response) => {
        let data = response.data.movies;
        let genres = {};
        let allMovies = [];

        data.forEach((movie) => {
          let item = {
            cast: movie.cast,
            director: movie.director,
            genre: movie.genres,
            id: movie.id,
            length: movie.length,
            rating: movie.imdb_rating,
            overview: movie.overview,
            title: movie.title,
            releaseDate: movie.released_on.substring(0, 10),
            poster: movie.poster,
            classification: movie.classification,
            backdrop: movie.backdrop,
          };

          allMovies.push(item);

          movie.genres.forEach((genre) => {
            genres[genre.toString()]
              ? (genres[genre.toString()] = [...genres[genre.toString()], item])
              : (genres[genre.toString()] = [item]);
          });
        });

        setAllMovies(allMovies);
        setFilteredMovies(allMovies);
        setAllGenres(genres);
        setFilteredGenres(genres);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.title}>
        <FontAwesomeIcon icon={faFilm} size={40} color={"gold"} />
        <Text style={styles.titleFont}>WOOKIE MOVIES</Text>
        <FontAwesomeIcon icon={faFilm} size={40} color={"gold"} />
      </View>
      <View style={styles.search}>
        <TextInput
          onChangeText={setQuery}
          value={query}
          placeholder="Search: Movie Name or Actors"
          style={styles.input}
        />
        <TouchableOpacity onPress={() => searchQuery()}>
          <FontAwesomeIcon icon={faSearch} size={30} color={"gold"} />
        </TouchableOpacity>
      </View>
      <ScrollView>
        {Object.keys(filteredGenres).length ? (
          Object.keys(filteredGenres).map((genre) => {
            return (
              <View key={genre}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    color: "gold",
                    marginLeft: 20,
                  }}
                >
                  {genre}
                </Text>
                <ScrollView
                  horizontal={true}
                  style={{ marginLeft: 0, marginRight: 0 }}
                >
                  {Object.values(filteredGenres[genre.toString()]).map(
                    (movie) => {
                      return (
                        <View
                          style={{
                            marginLeft: 20,
                            marginTop: 10,
                            marginBottom: 25,
                          }}
                          key={genre.toString() + movie.id}
                        >
                          <MovieContainer
                            movie={movie}
                            key={genre.toString() + movie.id}
                          />
                        </View>
                      );
                    }
                  )}
                </ScrollView>
              </View>
            );
          })
        ) : (
          <View
            style={{
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontWeight: "bold", color: "gold", fontSize: 20 }}>
              No Results Found: {query}
            </Text>
            <Button
              title="Go Back"
              onPress={() => {
                setFilteredMovies(allMovies);
                setFilteredGenres(allGenres);
                setQuery("");
              }}
            />
          </View>
        )}
      </ScrollView>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#404040",
  },
  titleFont: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "center",
  },
  title: {
    paddingTop: 40,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginLeft: 50,
    marginRight: 50,
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
    color: "#fff",
    marginRight: 14,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "gold",
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
