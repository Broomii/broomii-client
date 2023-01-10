import { View, Text } from 'react-native'
import React from 'react'

type Props= {
  children: React.ReactNode,
}

const FormInputLabel = ({children}: Props) => {
  return (
    <>
      <Text>{children}</Text>
    </>
  )
}

export default FormInputLabel