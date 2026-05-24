import { useNavMeta } from '../../hooks/useNavMeta'

export function NavMeta() {
  const { tempLabel, timeLabel } = useNavMeta()

  return (
    <div className="scr-meta" aria-label="Calgary studio location and local time">
      <span className="scr-meta__temp" aria-live="polite">
        {tempLabel}
      </span>
      <span className="scr-meta__city">
        <b>Calgary, AB</b>
      </span>
      <span className="scr-meta__time" aria-live="polite">
        {timeLabel}
      </span>
    </div>
  )
}
