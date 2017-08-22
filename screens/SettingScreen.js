import React, { Component } from 'react'
import { View, Text, Platform } from 'react-native'
import { connect } from 'react-redux'
import { clearLikeJobs } from '../actions/'
import { Button, Icon } from 'react-native-elements'

class SettingScreen extends Component {
    static navigationOptions = ({ navigate }) => ({
        title: 'Setting Jobs',
        tabBarIcon: ({tintColor}) => (
            <Icon name="edit" size={25} color={tintColor} />
            ),
        headerStyle: {
            marginTop: Platform.OS === 'android' ? 24 : 0
        }
        
    });
    render(){
        return(
            <View>
               <Button
                    title="Reset Liked Jobs"
                    large
                    icon={{ name : 'delete-forever'}}
                    backgroundColor = "#F44336"
                    onPress={this.props.clearLikeJobs}
               />
            </View>
        )
    }
}

export default connect(null, { clearLikeJobs })(SettingScreen);