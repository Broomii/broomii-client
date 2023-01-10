import { View, Text, TextInput } from 'react-native'

import React from 'react'

type Props = {
  placeholder: string,
}

const FormInput = ({placeholder}: Props) => {
  return (
    <View>
      <TextInput placeholder={placeholder}/>
    </View>
  )
}

export default FormInput