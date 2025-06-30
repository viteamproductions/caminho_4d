export async function withMinimumDelay<T>(promise: Promise<T>, minDelay = 500): Promise<T> {
  const [result] = await Promise.all([promise, new Promise((resolve) => setTimeout(resolve, minDelay))])
  return result
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export function debugLoading(component: string, pathname?: string) {
  if (process.env.NODE_ENV === "development") {
    console.log(`🔄 Loading component mounted: ${component}`, pathname ? `at ${pathname}` : "")
  }
}
