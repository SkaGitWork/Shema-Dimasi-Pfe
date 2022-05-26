import * as React from 'react';
import { Modal, Portal, Text, Button, Provider } from 'react-native-paper';
import CardComponent from './CardComponent'

const ModalEcg = () => {
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {backgroundColor: 'white', padding: 20};

  return (
    <Provider>
      <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
         <CardComponent  hideModal= {hideModal} />
        </Modal>
      </Portal>
      <Button  style={{margin: 10}} onPress={showModal}>
        Show Ecg
      </Button>
    </Provider>
  );
};

export default ModalEcg;