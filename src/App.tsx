import { useState } from 'react'
import { Button } from './components/common/Button/Button'
import { ButtonVariant } from './components/common/Button/Button.constants'

export function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Button onClick={() => setCount((count) => count + 1)} textButton='Tenho um abrigo'/>
      <Button variant={ButtonVariant.Outlined} textButton='Quero Adotar'/>
    </>
  )
}
