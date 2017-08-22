import React, { Component } from 'react'
import { ScrollView, View, Text, Linking, Platform} from 'react-native'
import { Button, Card, Icon} from 'react-native-elements'
import { connect } from 'react-redux'
import MapView from 'react-native-maps'

class ReviewScreen extends Component {

    
    static navigationOptions = ({ navigate }) => ({
        title: 'Review Jobs',
        tabBarIcon: ({tintColor}) => (
            <Icon name="favorite" size={25} color={tintColor} />
            ),
        
        
    });

    navigateSetting(){
        this.props.navigation.navigate('settings')
    }

    renderLikedJobs(){
        return this.props.likedJobs.map(job => {
            const { company, formattedRelativeTime, url, longitude, latitude, jobtitle, jobkey } = job
            const initialRegion = {
                longitude,
                latitude,
                latitudeDelta: 0.045,
                longitudeDelta: 0.02
            }
            return(
                <Card title={jobtitle} key={jobkey}>
                    <View style={{height: 200}}>
                        <MapView
                            style={{ flex: 1 }}
                            cacheEnabled = { Platform.OS === 'android' ? true : false }
                            scrollEnabled= {false}
                            initialRegion ={ initialRegion }
                        />
                        <View style={styles.detailWrapper}>
                            <Text style={styles.italic}>{company}</Text>
                            <Text style={styles.italic}>{formattedRelativeTime}</Text>
                        </View>
                        <Button 
                            title="Apply Now!"
                            backgroundColor="#03A9F4"
                            onPress={ ()=> Linking.openURL(url)}
                        />
                    </View>
                </Card>
            );
        })
    }

    render(){
        const { navigate } = this.props.navigation
        return(
            <ScrollView>
                <Button
                title="Settings"
                onPress={() => this.navigateSetting()}
                backgroundColor="rgba(0,0,0,0)"
                color="rgba(0, 122, 255, 1)"
                />
                {this.renderLikedJobs()}

            </ScrollView>
        )
    }
}

function mapStateToProps(state) {
    return { likedJobs: state.likedJobs}
}

const styles = {
    detailWrapper: {
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    italic: {
        fontStyle: 'italic'
    }
}

export default connect(mapStateToProps)(ReviewScreen);