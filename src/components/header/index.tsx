import styles from './index.module.css'
import { BiMenu } from 'react-icons/bi'

export default function Header() {
  return (
    <header className="w-full">
      <div className="container mx-auto flex justify-end py-2">
        <button className={styles['menu']} type="button" title="设置">
          <BiMenu size={24} />
        </button>
      </div>
    </header>
  )
}
