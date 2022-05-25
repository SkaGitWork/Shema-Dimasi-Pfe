import * as React from "react"
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper"

const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />

const CardComponent = ({hideModal}) => (
  <Card>
    <Title>Your ECG signal</Title>
    <Card.Cover source={{ uri: "https://picsum.photos/700" }} />
    <Card.Actions>
      <Button   onPress={hideModal} >Ok</Button>
    </Card.Actions>
  </Card>
)

export default CardComponent
