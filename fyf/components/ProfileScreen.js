import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, Button, Alert } from 'react-native';
import { Icon } from 'react-native-elements';
import * as firebase from 'firebase';

export default class Profile extends Component {
  constructor(props){
    super(props);
    this.state = {
          name: 'Name Nameman',
          rank: 5,
          tasks: 69,
          hours: 420,
          friends: [
            [1, 'Dick Kickem', 69420],
            [2, 'Joseph Biden', 290],
            [3, 'Donald Trump', 214],
            [4, 'Useless Loser', 2],
            [5, 'Name Nameman', 1],
            [6, 'Gorilla Man', -30]
          ],
    }
  }
  componentDidMount(){
    this.setState({name: this.getName(this.props.userid)})
    this.setState({rank: this.getRank(this.props.userid)})
    this.setState({tasks: this.getTasks(this.props.userid)})
    this.setState({hours: this.getHours(this.props.userid)})
  }

  sortProfiles(){
    var uids = []
    var scoresRef = firebase.database().ref("users");
    scoresRef.orderByChild("tasks").on("value", function(snapshot) {
      snapshot.forEach(function(data) {
        uids.push(data.key)
        console.log('etsgzdss')
      });
    });
    return uids;
  }

  getFName(uid) {
    var FName = 'a';
    firebase.database().ref('users/'+uid+'/f_name').on("value", function(snapshot){
      FName=snapshot.val();
    })
    return FName
  }

  getLName(uid) {
    var LName = 'a';
    firebase.database().ref('users/'+uid+'/l_name').on("value", function(snapshot){
      LName=snapshot.val();
    })
    return LName
  }

  getName(uid) {
    return this.getFName(uid) + ' ' + this.getLName(uid)
  }

  getRank(uid){
    var rank = 0
    firebase.database().ref('/users/'+uid+'/rank').on("value", function(snapshot){
      rank = snapshot.val();
    })
    return rank
  }

  getTasks(uid){
    var tasks = 0
    firebase.database().ref('/users/'+uid+'/tasks').on("value", function(snapshot){
      tasks = snapshot.val();
    })
    return tasks
  }

  getHours(uid){
    var hours = 0
    firebase.database().ref('/users/'+uid+'/hours').on("value", function(snapshot){
      hours = snapshot.val();
  })  
  return hours
}

  setRank(uids){
    if(uids.length <= 0){
      return
    }
    console.log(uids[0])
    for(let i = 0; i < uids.length; i++){
      firebase.database().ref('users/'+uids[i]).update({
        rank: i+1
      })
      //console.log(uids.length + ' vs ' + i + ' vs ' + uids[i])
      if(i == 100){
        //console.log(uids)
        break
      }
    }
  }

  renderLeaderboard() {
    var uids =[...this.sortProfiles().reverse()]
    this.setRank(uids)
    return this.sortProfiles().reverse().map(item => (
      <Text style={styles.scoreboard_item}>{
      this.getRank(item) == 1 ? <Text style={styles.one}>#1</Text> : 
      this.getRank(item) == 2 ? <Text style={styles.two}>#2</Text> : 
      this.getRank(item) == 3 ? <Text style={styles.three}>#3</Text> :
      "#"+this.getRank(item)} {this.getName(item)} - {this.getTasks(item)}</Text>));
  }

  render() {
    return (
      <View style={styles.container}>

        <ScrollView style={styles.scroll_box}>

        <View style={styles.profile_header}>
            <Image source={require('../assets/sky.png')} style={styles.profile_image} blurRadius={2} />
              <View style={styles.profile_text}>
                <Text style={styles.profile_name}>{this.state.name} </Text>
                <Text style={styles.profile_bio_rank}>Rank: #{this.state.rank} </Text>
                <Text style={styles.profile_bio_rank}>Tasks Complete: {this.state.tasks} </Text>
                <Text style={styles.profile_bio_rank}>Hours Spent: {this.state.hours} </Text>
              </View>
            <Text style={styles.profile_bio}>Just a funky dude on the town. Just a funky dude on the town. </Text>
          </View>

          <View style={styles.profile_button_box}>
              <TouchableOpacity style={styles.friend_button}>
                <Icon name="addusergroup" type="antdesign" size={40} color='white'/>
              </TouchableOpacity>
              <TouchableOpacity style={styles.friend_button}>
                <Icon name="message-circle" type="feather" size={40} color='white'/>
              </TouchableOpacity>
            </View>

          <View style={styles.scoreboard}>
              <Text style={styles.centre_text}>Leaderboards</Text>
              {this.renderLeaderboard()}
          </View>

          <View style={styles.profile_widget}>
            <Text style={styles.widget_text}>FYF Streak: 11</Text>
          </View>

          <View style={styles.profile_widget}>
            <Text style={styles.widget_text}>Lifetime Pushups Done: 3</Text>
          </View>

          <View style={styles.profile_widget}>
            <Text style={styles.widget_text}>Lifetime Snooze Buttons Pressed: 1568</Text>
          </View>

          <View style={styles.profile_widget}>
            <Text style={styles.widget_text}>First-Place Finishes: 0</Text>
          </View>

          <View style={styles.profile_widget}>
            <Text style={styles.widget_text}>Last-Place Finishes: 56</Text>
          </View>

        </ScrollView>
        <StatusBar style="auto" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  profile_header: {
    width: '100%',
    paddingLeft: 25,
    paddingRight: 20,
    paddingTop: 40,
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'transparent',
    backgroundColor: '#FEA47F',
  },
  profile_image: {
    height: 100,
    width: 100,
    borderRadius: 50,
    resizeMode: 'cover',
    alignSelf: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#2C3A47',
  },
  profile_text: {
    maxWidth: 300,
    flexDirection: 'column',
    alignItems: 'center',
    borderWidth: 0,
    paddingTop: 12,
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  profile_name: {
    fontSize: 30,
    color: '#2C3A47',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  profile_bio: {
    fontSize: 15,
    color: 'black',
    margin: 7,
    marginTop: 13,
    marginBottom: 20,
    textAlign: 'center',
  },
  profile_bio_rank: {
    fontSize: 15,
    color: '#F8EFBA',
    fontStyle: 'italic',
    fontWeight: 'bold',
  },
  scroll_box: {
    height: '100%',
    backgroundColor: 'white',
    marginBottom: 70,
  },


  scoreboard: {
    marginHorizontal: 20,
    marginVertical: 20,
    borderRadius: 15,
    flex: 1,
    backgroundColor: '#FD7272',
    paddingBottom: 10,
  },


  scroll_item: {
    flex: 1,
    height: 20,
    marginTop: 5,
  },
  hbar: {
    borderBottomColor: 'black',
    borderBottomWidth: 10,
  },
  friend_button: {
    width: 50,
    height: 50,
    color: "black",
  },
  friend_icon: {
    height: 40,
    width: 40,
    borderRadius: 50,
    resizeMode: 'cover',
  },
  profile_button_box: {
    position: 'absolute',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    height: 50,
    width: 110,
    marginTop: 40,
    marginLeft: 10,
    borderWidth: 0,
  },
  vertical_centre: {
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  centre_text: {
    width: '100%',
    textAlign: 'center',
    borderWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    paddingBottom: 5,
    paddingTop: 2,
    justifyContent: 'center',
    fontSize: 25,
    fontWeight: "bold",
    color: 'white',
  },
  scoreboard_item: {
    width: '100%',
    textAlign: 'center',
    borderWidth: 0,
    paddingVertical: 7,
    justifyContent: 'center',
    fontSize: 20,
    color: 'white',
  },
  one: {
    color: '#F8EFBA',
    fontSize: 25,
    fontWeight: 'bold',
  },
  two: {
    color: '#dbdbdb',
    fontSize: 23,
    fontWeight: 'bold',
  },
  three: {
    color: '#dbd2bd',
    fontSize: 21,
    fontWeight: 'bold',
  },
  profile_widget: {
    flex: 1,
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 10,
    borderRadius: 15,
    backgroundColor: '#F8EFBA',
  },
  widget_text: {
    width: '100%',
    textAlign: 'center',
    borderWidth: 0,
    paddingBottom: 5,
    paddingTop: 2,
    justifyContent: 'center',
    fontSize: 25,
    fontWeight: "bold",
    color: '#2C3A47',
  }
});