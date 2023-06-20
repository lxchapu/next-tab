import './global.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Next Tab',
  description: '下一个新标签页',
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
