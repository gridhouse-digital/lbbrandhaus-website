import { useEffect, useState } from 'react'

const CALGARY_TZ = 'America/Edmonton'
const CALGARY = { lat: 51.0447, lon: -114.0719 }
const WEATHER_REFRESH_MS = 30 * 60_000

type NavMetaState = {
  temp: number | null
  time: string
}

function formatCalgaryTime(date = new Date()) {
  const time = new Intl.DateTimeFormat('en-CA', {
    timeZone: CALGARY_TZ,
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(date)

  return `${time} MT`
}

function formatTemp(value: number) {
  const rounded = Math.round(value)
  return `${rounded > 0 ? '+' : ''}${rounded}°C`
}

async function fetchCalgaryTemp(): Promise<number | null> {
  try {
    const url = new URL('https://api.open-meteo.com/v1/forecast')
    url.searchParams.set('latitude', String(CALGARY.lat))
    url.searchParams.set('longitude', String(CALGARY.lon))
    url.searchParams.set('current', 'temperature_2m')
    url.searchParams.set('timezone', CALGARY_TZ)

    const res = await fetch(url.toString())
    if (!res.ok) return null

    const data = await res.json()
    const temp = data?.current?.temperature_2m
    return typeof temp === 'number' ? temp : null
  } catch {
    return null
  }
}

export function useNavMeta() {
  const [state, setState] = useState<NavMetaState>(() => ({
    temp: null,
    time: formatCalgaryTime(),
  }))

  useEffect(() => {
    let active = true

    const refreshWeather = async () => {
      const temp = await fetchCalgaryTemp()
      if (active && temp !== null) {
        setState((prev) => ({ ...prev, temp }))
      }
    }

    refreshWeather()
    const weatherId = window.setInterval(refreshWeather, WEATHER_REFRESH_MS)

    const tickTime = () => {
      setState((prev) => ({ ...prev, time: formatCalgaryTime() }))
    }

    tickTime()
    const timeId = window.setInterval(tickTime, 60_000)

    return () => {
      active = false
      window.clearInterval(weatherId)
      window.clearInterval(timeId)
    }
  }, [])

  return {
    tempLabel: state.temp === null ? '—°C' : formatTemp(state.temp),
    timeLabel: state.time,
  }
}
