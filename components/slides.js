import React, { Component } from 'react'
import { View, Text, ScrollView, Dimensions} from 'react-native'
import { Button } from 'react-native-elements'

const SCREEN_WIDTH = Dimensions.get('window').width

class Slides extends Component{

    renderLastIndex(index){
        if (index === this.props.data.length - 1){
            return(
                <Button 
                    buttonStyle = {styles.buttonStyle}
                    title = 'Onwards!'
                    raised
                    onPress ={this.props.onComplete}
                />
            )
        }
    }

    renderSlides(){
        return this.props.data.map((slide, index) => {
            return(
                <View 
                    key={slide.text} 
                    style={[styles.slide, {backgroundColor: slide.color}]}
                >
                    <Text style={styles.textStyle}>{slide.text}</Text>
                    {this.renderLastIndex(index)}
                </View>
            )
        })
    }

    render() {
        return(
            <ScrollView
                horizontal
                style ={{flex:1}}
                pagingEnabled
            >
            {this.renderSlides()}
            </ScrollView>
        )
    }
}

const styles = {
    textStyle: {
        fontSize: 20,
        color: 'white'
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: SCREEN_WIDTH
    },
    buttonStyle: {
        backgroundColor: '#0288D1'
    
    }
}
export default Slides;