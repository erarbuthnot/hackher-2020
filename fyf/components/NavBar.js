import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import * as firebase from 'firebase';

import Tasks from './TaskScreen';
import Profile from './ProfileScreen';

export default class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        screen: 0,
        shuffled: null,
        tasks: [
          {
          description: 'do 5 pushups',
          duration: 'daily',
          points: 1,
          },
          {
          description: 'do 10 pushups',
          duration: 'daily',
          points: 2,
          },
          {
          description: 'do 25 pushups',
          duration: 'daily',
          points: 5,
          },
          {
          description: 'do 50 pushups',
          duration: 'daily',
          points: 10,
          },
          {
          description: 'sleep 8 hours tonight',
          duration: 'daily',
          points: 5,
          },
          {
          description: 'spend 15 minutes away from your phone',
          duration: 'daily',
          points: 1,
          },
          {
          description: 'spend 30 minutes away from your phone',
          duration: 'daily',
           points: 2,
          },
          {
          description: 'spend 1 hour away from your phone',
          duration: 'daily', 
          points: 5,
          },
          {
          description: 'spend 2 hours away from your phone',
          duration: 'daily',
          points: 10,
          },
          {
          description: 'go for a 30 minute walk',
          duration: 'daily',
          points: 2,
          },
          {
          description: 'go for a 1 hour walk',
          duration: 'daily',
          points: 5,
          },
          {
          description: 'wake up before 10 am tomorrow',
          duration: 'daily',
          points: 1,
          },
          {
          description: 'wake up before 9 am tomorrow',
          duration: 'daily',
          points: 2,
          },
          {
          description: 'wake up before 8 am tomorrow',
          duration: 'daily',
          points: 5,
          },
          {
          description: 'wake up before 7 am tomorrow',
          duration: 'daily',
          points: 10,
          },
          {
          description: 'eat 3 meals',
          duration: 'daily',
          points: 2,
          },
          {
          description: 'spend 30 minutes learning',
          duration: 'daily',
          points: 2,
          },
          {
          description: 'spend 1 hour learning',
          duration: 'daily',
          points: 5,
          },
          {
          description: 'drink a glass of water',
          duration: 'daily',
          points: 1,
          },
          {
          description: 'make your bed',
          duration: 'daily',
          points: 1,
          },
          {
          description: 'brush teeth for 2 minutes',
          duration: 'daily',
          points: 1,
          },
          { 
          description: 'take 5 deep breaths',
          duration: 'daily',
          points: 1,
          },
          {
          description: 'meditate for 5 minutes',
          duration: 'daily',
          points: 2,
          },
          {
          description: 'meditate for 10 minutes',
          duration: 'daily',
          points: 5,
          },
          {
          description: 'meditate for 20 minutes',
          duration: 'daily',
          points: 10,
          },
          {
          description: 'talk to a friend',
          duration: 'daily',
          points: 2,
          },
          {
          description: 'plan out your dinners for the week',
          duration: 'weekly',
          points: 10,
          },
          {
          description: 'plan a larger social event',
          duration: 'weekly',
          points: 2,
          },
          {
          description: 'do your laundry',
          duration: 'weekly',
          points: 1,
          },
          {
          description: 'take on a creative, short-term project',
          duration: 'weekly',
          points: 5,
          },
          {
          description: 'clean a room in your house',
          duration: 'weekly',
          points: 10,
          },
          {
          description: 'have more than 4 hours of exercise in a day',
          duration: 'weekly',
          points: 10,
          },
          {
          description: 'write a to-do list for the week',
          duration: 'weekly',
          points: 5,
          },
          {
          description: 'clear out your email inbox',
          duration: 'weekly',
          points: 5,
          },
          {
          description: 'read a book',
          duration: 'weekly',
          points: 10,
          },
          {
          description: 'clear one big thing off your to-do list',
          duration: 'weekly',
          points: 5,
          },
          {
          description: 'try a new hobby',
          duration: 'monthly',
          points: 5,
          },
          {
          description: 'clean your house',
          duration: 'monthly',
          points: 10,
          },
          {
          description: 'start a long-term project',
          duration: 'monthly',
          points: 10,
          },
          {
          description: 'volunteer your time or money to a good cause',
          duration: 'monthly',
          points: 10,
          },
          {
          description: 'set a long-term goal',
          duration: 'monthly',
          points: 5,
          }
          ],
    };
  }

  UNSAFE_componentWillMount(){
    this.shuffed = this.shuffleDeck(this.state.tasks);
    this.setState({shuffled: [...this.shuffed.slice(0,5)]});
  }

  shuffleDeck = (array) => {
    let i = array.length - 1;
    for (; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  doneTask(tasks) {
    // this.setState({shuffled: tasks});
  }

  render() {
    return (
        <View style={styles.container}>
            {this.state.screen == 0 ? <Tasks  userid={this.props.userid} tasks={this.state.shuffled} doneTask={this.doneTask.bind(this)}/> : <Profile userid={this.props.userid}/>}
            <View style={styles.nav_box}>
                <TouchableOpacity style={styles.left_button} onPress={() => this.setState({screen: 0})}>
                    <Icon name="tasklist" type='octicon' size={40} color="white" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.right_button} onPress={() => this.setState({screen: 1})}>
                    <Icon name="person" type='octicon' size={40} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row'
  },
  nav_box: {
      position: 'absolute',
      width: '100%',
      height: 70,
      backgroundColor: '#82589F',
      alignSelf: 'flex-end',
      flexDirection: 'row',
  },
  left_button: {
      width: '50%',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
  },
    right_button: {
        width: '50%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'flex-end',
    },
});
