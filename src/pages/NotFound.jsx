import { Button } from '../components/Bits'
import { Lines } from '../components/Motion'

export default function NotFound() {
  return (
    <section className="pagehead notfound">
      <div className="container">
        <p className="mono">404</p>
        <Lines className="display pagehead__title" lines={['Off the map.']} onMount />
        <p className="pagehead__lede">That page has wandered off. Let’s get you back on the road.</p>
        <Button to="/">Back home</Button>
      </div>
    </section>
  )
}
