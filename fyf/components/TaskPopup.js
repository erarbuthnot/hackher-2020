import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, Button, Touchable, Alert } from 'react-native';
import { Icon } from 'react-native-elements';

export default class TaskPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        task: this.props.task,
    };
  }

  hide_window = () => {
    this.props.hide();
  }

  done_task = () => {
      this.props.done();
  }

  render() {
    return (
        <View style={styles.container}>
            <View style={styles.task_widget}>
                <View style={styles.task_widget_top}>
                    <Text style={styles.widget_time}>{this.state.task.duration}</Text>
                    <Text style={styles.widget_text}>{this.state.task.description}</Text>
                    <Text style={styles.widget_details}>Points: {this.state.task.points}</Text>
                </View>

                <View style={styles.button_box}>
                    <TouchableOpacity style={styles.done_button} onPress={() => this.done_task()}>
                        <Text style={styles.button_text}>DONE!</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.nope_button} onPress={() => this.hide_window()}>
                        <Text style={styles.nope_button_text}>nope.</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <StatusBar style="auto" />
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.5)',
    paddingHorizontal: 50,
    paddingVertical: 100,
    zIndex: 2,
  },
  tasks_header: {
    width: '100%',
    height: 110,
    paddingTop: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'transparent',
    backgroundColor: '#FEA47F',
  },
  tasks_title: {
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold'
  },
  scroll_box: {
    height: '100%',
    backgroundColor: 'white',
    marginBottom: 70,
  },
  task_widget: {
    flex: 1,
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 15,
    backgroundColor: '#D6A2E8',
  },
  task_widget_top: {
    flex: 1,
    height: '50%',
    padding: 10,
    borderRadius: 15,
    backgroundColor: '#FD7272',
    flexWrap: 'wrap',
  },
  widget_time: {
    width: '100%',
    textAlign: 'left',
    borderWidth: 0,
    paddingBottom: 0,
    paddingTop: 2,
    paddingLeft: 10,
    justifyContent: 'center',
    fontSize: 20,
    fontWeight: "bold",
    color: 'white',
  },
  widget_text: {
    width: '100%',
    textAlign: 'left',
    borderWidth: 0,
    paddingBottom: 5,
    paddingTop: 2,
    paddingLeft: 10,
    justifyContent: 'center',
    fontSize: 25,
    fontWeight: "bold",
    color: '#2C3A47',
  },
  widget_details: {
    width: '100%',
    textAlign: 'left',
    borderWidth: 0,
    paddingBottom: 5,
    paddingTop: 10,
    paddingLeft: 10,
    alignSelf: 'baseline',
    justifyContent: 'flex-end',
    fontSize: 20,
    fontWeight: "bold",
    color: '#2C3A47',
  },
  button_box: {
    height: 100,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  done_button: {
      width: 120,
      height: 60,
      marginTop: 20,
      marginBottom: 50,
      borderRadius: 30,
      backgroundColor: '#82589F',
      justifyContent: 'center',
      alignContent: 'center'
  },
  nope_button: {
    width: 120,
    height: 60,
    marginTop: 20,
    marginBottom: 50,
    borderRadius: 30,
    borderColor: '#82589F',
    borderWidth: 5,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignContent: 'center'
    },
  button_text: {
    textAlign: 'center',
    borderWidth: 0,
    justifyContent: 'center',
    fontSize: 20,
    fontWeight: "bold",
    color: 'white',
  },
  nope_button_text: {
    textAlign: 'center',
    borderWidth: 0,
    justifyContent: 'center',
    fontSize: 20,
    fontWeight: "bold",
    color: '#82589F',
  },
  });