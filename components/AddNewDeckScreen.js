import { View, StyleSheet, SafeAreaView, FlatList, Alert } from "react-native";
import React from "react";
import { connect } from "react-redux";
import { Text, Input, Icon, Button } from "react-native-elements";
import { handleAddNewDeck } from "../actions/shared";

class AddNewDeckScreen extends React.Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);

    this.state = {
      title: "",
      description: ""
    };
  }

  handleFormSubmit() {
    const { title, description } = this.state;
    if (title === "" || description === "") {
      Alert.alert("Either Title or Description can not be blank");
    } else {
      //   console.log("form value: ", title, description);
      this.setState({
        title: "",
        description: ""
      });
      //dispatch new deck and route to Home
      this.props.dispatch(handleAddNewDeck(title, description));
      this.props.navigation.navigate("Home");
    }
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text h4 style={{ marginTop: 40 }}>
          Add New Deck Screen
        </Text>
        <Input
          labelStyle={{ marginTop: 20 }}
          label="Deck Title"
          value={this.state.title}
          onChangeText={text => this.setState({ title: text })}
        />
        <Input
          labelStyle={{ marginTop: 20 }}
          label="Description"
          value={this.state.description}
          onChangeText={text => this.setState({ description: text })}
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
            onPress={() => this.props.navigation.navigate("Home")}
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
    flexDirection: "row"
  }
});

function mapStateToProps({ decks }) {
  return {
    decks: Object.values(decks)
  };
}

export default connect(mapStateToProps)(AddNewDeckScreen);
