import { View, StyleSheet, SafeAreaView, FlatList, Alert } from "react-native";
import React from "react";
import { connect } from "react-redux";
import {
  Text,
  Card,
  Button,
  Icon,
  Divider,
  Input
} from "react-native-elements";

import { handleAddNewCard } from "../actions/shared";

class AddNewCardScreen extends React.Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.state = {
      question: "",
      answer: ""
    };
  }

  handleFormSubmit() {
    let { question, answer } = this.state;
    const { deckObj } = this.props.route.params;
    if (question === "" || answer === "") {
      Alert.alert("Either Title or Description can not be blank");
    } else if (
      answer.toLowerCase() === "yes" ||
      answer.toLowerCase() === "no" ||
      answer.toLowerCase() === "y" ||
      answer.toLowerCase() === "n"
    ) {
      if (answer.toLowerCase() === "yes" || answer.toLowerCase() === "y") {
        answer = 1;
      } else if (
        answer.toLowerCase() === "no" ||
        answer.toLowerCase() === "n"
      ) {
        answer = 0;
      }
      //   console.log("form value: ", title, description);
      this.setState({
        question: "",
        answer: ""
      });
      //dispatch new deck and route to Home
      this.props.dispatch(handleAddNewCard(question, answer, deckObj));
      this.props.navigation.navigate("DeckDetail");
    } else {
      Alert.alert("Answer can only be Yes or No");
    }
  }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text h4 style={{ marginTop: 40 }}>
          Add New Card Screen
        </Text>
        <Input
          labelStyle={{ marginTop: 20 }}
          label="Your Question"
          value={this.state.title}
          onChangeText={text => this.setState({ question: text })}
        />
        <Input
          labelStyle={{ marginTop: 20 }}
          label="Answer (Y/N)"
          value={this.state.description}
          onChangeText={text => this.setState({ answer: text })}
        />
        <View style={styles.buttonHorizontal}>
          <Button
            icon={<Icon name="add" color="#ffffff" />}
            buttonStyle={{
              borderRadius: 0,
              margin: 20
            }}
            title="SUBMIT"
            onPress={() => this.handleFormSubmit()}
          />
          <Button
            icon={<Icon name="cancel" color="#ffffff" />}
            buttonStyle={{
              borderRadius: 0,
              margin: 20,
              backgroundColor: "#E66549"
            }}
            title="CANCEL"
            onPress={() => this.props.navigation.navigate("DeckDetail")}
          />
        </View>
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

export default connect(mapStateToProps)(AddNewCardScreen);
