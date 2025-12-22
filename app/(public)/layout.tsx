import { HeaderWrapper } from '@/components/layout/HeaderWrapper'
import { Footer } from '@/components/layout/Footer'

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <HeaderWrapper />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  )
}
