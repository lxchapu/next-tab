import styles from './input-box.module.css'
import { BiSearch } from 'react-icons/bi'
import { SiMicrosoftbing } from 'react-icons/si'
import { MdClose } from 'react-icons/md'
import classNames from 'classnames'

export default function InputBox({
  text,
  placeholder,
  onFocus,
  onInput,
  onSearch,
  onClear,
}: {
  text: string
  focused: boolean
  placeholder: string
  onInput: (value: string) => void
  onFocus: () => void
  onSearch: () => void
  onClear: () => void
}) {
  return (
    <div className={styles['input-box']}>
      <div className={styles['select']}>
        <SiMicrosoftbing size={20} />
      </div>
      <input
        className={styles['input']}
        type="text"
        value={text}
        placeholder={placeholder}
        maxLength={256}
        autoComplete="off"
        autoFocus={true}
        title="搜索"
        onInput={(event) => {
          const target = event.target as HTMLInputElement
          onInput(target.value)
        }}
        onFocus={onFocus}
        onKeyUp={(event) => {
          if (event.key === 'Enter') {
            onSearch()
          }
        }}
      />
      <div
        className={classNames(styles['clear'], {
          [styles['clear--active']]: text.length > 0,
        })}
        onClick={onClear}
      >
        <MdClose className={styles['icon']} size={16} />
      </div>
      <div className={styles['select']} onClick={onSearch}>
        <BiSearch className={styles['icon']} size={20} />
      </div>
    </div>
  )
}
