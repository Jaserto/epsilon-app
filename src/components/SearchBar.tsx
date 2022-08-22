// SearchBar.js
import React from "react";
import { StyleSheet, TextInput, View, Keyboard, Button } from "react-native";


const SearchBar = ({clicked, searchPhrase, setSearchPhrase, setCLicked}:any) => {
  return (
    <View style={styles.container}>
      <View
        style={
          clicked
            ? styles.searchBar__clicked
            : styles.searchBar__unclicked
        }
      >
        {/* search Icon */}
{/*         <Feather
          name="search"
          size={20}
          color="black"
          style={{ marginLeft: 1 }}
        /> */}
        {/* Input field */}
        <TextInput
          style={styles.input}
          placeholder="Buscar ejercicio"
          value={searchPhrase}
          onChangeText={setSearchPhrase}
          onFocus={() => {
            setCLicked(true);
          }}
        />
        {/* cross Icon, depending on whether the search bar is clicked or not */}
      {/*   {clicked && (
          <Entypo name="cross" size={20} color="black" style={{ padding: 1 }} onPress={() => {
              setSearchPhrase("")
          }}/>
        )} */}
      </View>
      {/* cancel button, depending on whether the search bar is clicked or not */}
    {/*   {clicked && (
        <View>
          <Button
            title="Cancel"
            onPress={() => {
              Keyboard.dismiss();
              setCLicked(false);
            }}
          ></Button>
          
        </View>
      )} */}
    </View>
  );
};
export default SearchBar;

// styles
const styles = StyleSheet.create({
  container: {
    margin: 5,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",

  },
  searchBar__unclicked: {
    paddingHorizontal: 4,
    flexDirection: "row",
    width: "95%",
    backgroundColor: "#d9dbda",
    borderRadius: 10,
    alignItems: "center",
  },
  searchBar__clicked: {
    paddingHorizontal: 4,
    flexDirection: "row",
    width: "95%",
    backgroundColor: "#d9dbda",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  input: {
    fontSize: 16,
    marginLeft: 0,
    width: "100%",
  },
});