import { View, StyleSheet, SafeAreaView, FlatList } from "react-native";
import React from "react";
import { connect } from "react-redux";
import { Text, Card, Button, Icon, Divider } from "react-native-elements";

class QuizScreen extends React.Component {
  render() {
    const { deckObj } = this.props.route.params;
    return (
      <SafeAreaView style={styles.container}>
        <Text>Quiz Screen</Text>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },
  buttonHorizontal: {
    flexDirection: "row",
    marginTop: 20
  }
});

function mapStateToProps({ decks }) {
  return {
    decks: Object.values(decks)
  };
}

export default connect(mapStateToProps)(QuizScreen);
