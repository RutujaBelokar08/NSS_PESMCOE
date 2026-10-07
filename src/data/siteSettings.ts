export type SocialEntry = { label: string; url: string }

export function parseSocialEntries(value: unknown): SocialEntry[] {
  if (!Array.isArray(value)) return []
  return value.flatMap((entry): SocialEntry[] => {
    const label = typeof entry === 'string' ? entry.split('|', 2)[0]?.trim() : entry?.label
    const url = typeof entry === 'string' ? entry.split('|', 2)[1]?.trim() : entry?.url
    return typeof label === 'string' && label && typeof url === 'string' && isSafeWebUrl(url)
      ? [{ label, url }]
      : []
  })
}

export function isSafeWebUrl(value: unknown): value is string {
  if (typeof value !== 'string' || !value.trim()) return false
  try {
    const url = new URL(value)
    return url.protocol === 'https:' || url.protocol === 'http:'
  } catch {
    return false
  }
}

export function isSafeCmsHref(value: unknown): value is string {
  return isSafeWebUrl(value) || (typeof value === 'string' && value.startsWith('/') && !value.startsWith('//'))
}
