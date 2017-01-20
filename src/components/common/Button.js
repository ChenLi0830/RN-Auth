import React from 'react';
import {Text, TouchableOpacity} from 'react-native';

const Button = (props) => {
  return <TouchableOpacity style={styles.button}
                           onPress={()=>props.onPress()}>
    <Text style={styles.text}>
      {props.children}
    </Text>
  </TouchableOpacity>
};

const styles = {
  button: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#007aff',
    marginHorizontal: 5,
  },
  text: {
    alignSelf: 'center',
    color: '#007aff',
    fontSize: 16,
    fontWeight: '600',
    paddingVertical: 10,
  }
};

export default Button;