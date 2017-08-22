import React, { Component } from 'react'
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native'
import MapView from 'react-native-maps'
import * as actions from '../actions'
import { connect } from 'react-redux'
import { Button, Icon } from 'react-native-elements';

class MapScreen extends Component {

    static navigationOptions = {
        tabBarLabel: 'Map',
        tabBarIcon: ({tintColor}) => (
            <Icon name="my-location" size={25} color={tintColor} />
            )

    }
    
    

    state = {
        mapLoaded: false,
        region: {
            longitude: 96.157660,
            latitude: 16.850367,
            longitudeDelta: 0.04,
            latitudeDelta: 0.1
        }
    }

    componentDidMount(){
        this.setState({mapLoaded: true})
    }

    onRegionChangeComplete = (region) => {
        console.log(region)
        this.setState({region})
    }

    onButtonPress = () => {
        this.props.fetchJobs(this.state.region, () => {
          this.props.navigation.navigate('deck');
        });
    }

    render(){
        if(!this.state.mapLoaded){
            return(
                <View style={{flex: 1, justifyContent: 'center'}}>
                    <ActivityIndicator size='large'/>
                </View>
            )
        }
        return(
            
            <View style={styles.container}>
                <MapView
                    style={styles.map}
                    region={this.state.region}
                    onRegionChangeComplete={this.onRegionChangeComplete}
                >
              </MapView>
              <View style = {styles.buttonContainer}>
              <Button
                small
                title="Search This Area"
                backgroundColor="#009688"
                icon={{ name: 'search' }}
                onPress={this.onButtonPress}
                />
              </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      
      alignItems: 'center',
    },
    map: {
      ...StyleSheet.absoluteFillObject,
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20
        
    }
});

export default connect(null, actions)(MapScreen);