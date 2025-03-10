import Header from '../components/Header'
import Body from '../components/Body.jsx'
import { Analytics } from "@vercel/analytics/react"
export default function App() {
  return (
    <>
      <Header /> 
      <Body />
      <Analytics/>
    </>
  )
}
