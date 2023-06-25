import classNames from 'classnames'
import styles from './suggestion-list.module.css'
import { BiSearch } from 'react-icons/bi'

export default function SuggestionList({
  show,
  list,
  onSelect,
}: {
  show: boolean
  list: string[]
  onSelect: (value: string) => void
}) {
  const height = list.length * 30

  return (
    <ul
      className={styles['container']}
      style={{
        height: show ? height + 'px' : undefined,
      }}
    >
      {list.map((item, index) => {
        return (
          <li
            key={index}
            className={styles['item']}
            onClick={() => onSelect(item)}
          >
            <div className={styles['icon']}>
              <BiSearch size={16} />
            </div>
            <div className={classNames(styles['text'], styles['ellipsis'])}>
              {item}
            </div>
          </li>
        )
      })}
    </ul>
  )
}
