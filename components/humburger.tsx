
import styles from 'styles/components/Humburger.module.css';

type Props = {
  isOpen: boolean,
  toggleMenu: () => void
}

function HumburgerButton({ isOpen, toggleMenu }:Props) {

  const line = {
    width: '100%',
    height: 4,
    backgroundColor: 'black',
    borderRadius: 20,
    transition: 'all .3s ease'
  }

  const topOpen = {
    transform: isOpen ? `rotate(45deg) translateY(19px)` : `rotate(0deg)`
  }

  const middleOpen = {
    display: isOpen ? `none` : `block`
  }

  const downOpen = {
    transform: isOpen ? `rotate(-45deg) translateY(-18px)` : `rotate(0deg)`
  }

  return (
    <div className={styles.main_container} onClick={toggleMenu}>
      <div style={{...line, ...topOpen }}/>
      <div style={{...line, ...middleOpen }}/>
      <div style={{...line, ...downOpen }}/>
    </div>
  );
}

export default HumburgerButton;
