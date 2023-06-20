import './global.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Next Tab',
  description: '下一个新标签页',
  viewport:
    'width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  )
}
