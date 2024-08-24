import { useState } from 'react';
import Modal from 'react-modal';
import useStore, { State } from 'store/lists';
import MainButton from 'components/buttons/main';

import styles from 'styles/components/Modals.module.css';

type Props = {
  isOpen: boolean;
  closeModal: () => void;
  confirmDelete: () => void;
}

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: 0,
  },
};

const cancelButtonStyles = {
  background: 'white',
}

const deleteFrase = "delete list";

//Modal.setAppElement('#main');

export default function ConfirmDelete({ isOpen, closeModal, confirmDelete }:Props) {
  const [isDisabledConfirm, setIsDisabledConfirm] = useState(true);
  const isDeleting = useStore((state: State) => state.isDeleting);
  const handleInputChange = (event:any) => {
    const text = event.target.value;
    if(text !== deleteFrase){
      if(!isDisabledConfirm){
        setIsDisabledConfirm(true);
      }
      return
    }
    setIsDisabledConfirm(false)
  }
	return (
    <Modal
      isOpen={isOpen}
      style={customStyles}
      contentLabel="Please Confirm Delete"
    >
      <div className={styles.content_container}>
        <div className={styles.header}/>
        <div className={styles.inner_content}>
          <div style={{marginBottom: 10}}><b>Do you realy want to delete this list?</b></div>
          <span style={{marginBottom: 10}}>Type <b>&quot;{deleteFrase}&quot;</b> to confirm</span>
          <input className={styles.input} onChange={handleInputChange}/>
          <div style={{marginTop: 15, display: 'flex', justifyContent: 'space-between'}}>
            <MainButton type='button' onClick={confirmDelete} label='Confirm' disabled={isDisabledConfirm || isDeleting}/>
            <MainButton type='button' onClick={closeModal} label='Cancel' styles={cancelButtonStyles}/>
          </div>
        </div>
      </div>
    </Modal>
	)
}
