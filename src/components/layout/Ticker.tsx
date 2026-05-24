import { tickerItems } from '../../data/site'

function TickerTrack() {
  return (
    <>
      {tickerItems.map((item) => (
        <span key={item}>
          {item} <span className="dot" />
        </span>
      ))}
    </>
  )
}

export function Ticker() {
  return (
    <div className="scr-ticker">
      <div className="lb-track">
        <span>
          <TickerTrack />
        </span>
        <span aria-hidden="true">
          <TickerTrack />
        </span>
      </div>
    </div>
  )
}
