import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, Button, Alert } from 'react-native';
import { Icon } from 'react-native-elements';
import TaskPopup from './TaskPopup';
import * as firebase from 'firebase';

export default class Tasks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked_task: null,
      show_popup: false,
      tasks: [...this.props.tasks],
    };
  }

  getTasks(uid){
    var tasks = 0
    firebase.database().ref('/users/'+uid+'/tasks').on("value", function(snapshot){
      tasks = snapshot.val();
    })
    return tasks
  }

  showTaskPopup = (task) => {
    this.setState({clicked_task: task});
    this.setState({show_popup: true});
  }

  hideTaskPopup = () => {
    this.setState({clicked_task: null});
    this.setState({show_popup: false});
  }

  doneTask = () => {
    Alert.alert("Done task: " + this.state.clicked_task.description);
    var array = [...this.state.tasks]; // make a separate copy of the array
    var index = array.indexOf(this.state.clicked_task);
    if (index !== -1) {
      array.splice(index, 1);
      this.setState({tasks: array});
    }
    this.props.doneTask(this.state.tasks);
    this.hideTaskPopup();

    //adding points to userid
    var points = this.state.clicked_task.points + this.getTasks(this.props.userid);
    firebase.database().ref('users/'+this.props.userid).update({
      tasks: points
    })
  }

  renderTasks(){
    return this.state.tasks.map(task => (
    <View style={styles.task_widget}>
      <TouchableOpacity style={styles.task_widget_top}
        onPress={() => this.showTaskPopup(task)}>
        <Text style={styles.widget_time}>{task.duration}</Text>
        <Text style={styles.widget_text}>{task.description}</Text>
      </TouchableOpacity>
      <Text style={styles.widget_details}>Points: {task.points}</Text>
    </View> ));
  }

  render() {
    return (
      <View style={styles.container}>

        <View style={styles.tasks_header}>
          <Text style={styles.tasks_title}>Tasks</Text>
        </View>
        <ScrollView style={styles.scroll_box}>
          {this.renderTasks()}
        </ScrollView>
        <StatusBar style="auto" />

        {this.state.show_popup ? 
        <TaskPopup 
          task={this.state.clicked_task} 
          hide={this.hideTaskPopup} 
          done={this.doneTask}/> : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
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
    paddingBottom: 20,
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
  },
  widget_time: {
    width: '100%',
    textAlign: 'left',
    borderWidth: 0,
    paddingBottom: 0,
    paddingTop: 2,
    paddingLeft: 10,
    justifyContent: 'center',
    fontSize: 15,
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
    fontSize: 20,
    fontWeight: "bold",
    color: '#2C3A47',
  },
  widget_details: {
    width: '100%',
    textAlign: 'left',
    borderWidth: 0,
    paddingBottom: 5,
    paddingTop: 2,
    paddingLeft: 20,
    justifyContent: 'center',
    fontSize: 25,
    fontWeight: "bold",
    color: '#2C3A47',
  }
  });