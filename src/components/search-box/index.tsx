'use client'

import styles from './index.module.css'
import { useEffect, useRef, useState } from 'react'
import EngineList from './engine-list'
import InputBox from './input-box'
import SuggestionList from './suggestion-list'
import jsonp from 'jsonp'
import { throttle } from 'lodash-es'

export default function SearchBox() {
  const [text, setText] = useState('')
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [focused, setFocused] = useState(false)

  const ref = useOutsideClick(() => {
    setFocused(false)
  })

  const suggestionListIsShow = suggestions.length > 0 && focused

  function handleInput(value: string) {
    setText(value)
    if (value) {
      throttleGetSuggestions(value)
    }
  }

  function handleFocus() {
    setFocused(true)
  }

  function handleSearch() {
    const keyword = text.trim()
    let url = 'https://www.bing.com'
    if (keyword.length) {
      url += `/search?q=${encodeURI(keyword)}`
    }
    window.open(url, '_self')
  }

  const throttleGetSuggestions = throttle(getSuggestions, 100)

  async function getSuggestions(value: string) {
    value = value.trim()
    const nextSuggestions = queryLocalSuggestions(value)
    if (value) {
      const list = await fetchSuggestions(value)
      nextSuggestions.push(...list)
    }
    setSuggestions(nextSuggestions)
  }

  function queryLocalSuggestions(keyword: string): string[] {
    const item = localStorage.getItem('HISTORY')
    if (!item) return []
    try {
      const res = JSON.parse(item)
      if (Array.isArray(res)) {
        return res.filter((item: string) => {
          return item.indexOf(keyword) !== -1
        })
      } else {
        return []
      }
    } catch {
      return []
    }
  }

  function fetchSuggestions(keyword: string): Promise<string[]> {
    return new Promise((resolve, reject) => {
      jsonp(
        `https://api.bing.com/qsonhs.aspx?type=cb&q=${keyword}`,
        { param: 'cb', timeout: 10000 },
        (err, data) => {
          if (err) {
            reject(err)
          } else {
            const list: string[] = []
            data.AS.Results.forEach((res: any) => {
              res.Suggests.forEach((item: any) => {
                list.push(item.Txt)
              })
            })

            resolve(list)
          }
        }
      )
    })
  }

  function handleClear() {
    setText('')
  }

  return (
    <div className={styles['search-box']}>
      <div ref={ref} className="relative">
        <InputBox
          text={text}
          focused={focused}
          placeholder="请输入搜索内容"
          onInput={handleInput}
          onFocus={handleFocus}
          onSearch={handleSearch}
          onClear={handleClear}
        />
        <div className="absolute inset-x-0">
          <EngineList />
          <SuggestionList
            show={suggestionListIsShow}
            list={suggestions}
            onSelect={(value) => {
              setText(value)
              handleSearch()
            }}
          />
        </div>
      </div>
    </div>
  )
}

function useOutsideClick(callback: () => void) {
  const ref = useRef<HTMLDivElement | null>(null)

  function handleClick(event: MouseEvent) {
    const target = event.target as HTMLElement
    if (ref.current && target && !ref.current.contains(target)) {
      callback()
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClick)
    return () => {
      document.removeEventListener('click', handleClick)
    }
  })

  return ref
}
