const isStorageAvailable = () => {
  try {
    const test = '__storage_test__'
    window.localStorage.setItem(test, test)
    window.localStorage.removeItem(test)
    return true
  } catch (e) {
    return false
  }
}

export const localStorageWrapper = {
  read: (key: string) => {
    if (!isStorageAvailable()) return null
    try {
      const data = window.localStorage.getItem(key)
      return data ? JSON.parse(data) : null
    } catch (e) {
      console.error('Storage read error:', e)
      return null
    }
  },
  write: (key: string, data: unknown) => {
    if (!isStorageAvailable()) return
    try {
      window.localStorage.setItem(key, JSON.stringify(data))
    } catch (e) {
      console.error('Storage write error:', e)
    }
  },
  remove: (key: string) => {
    if (!isStorageAvailable()) return
    try {
      window.localStorage.removeItem(key)
    } catch (e) {
      console.error('Storage remove error:', e)
    }
  }
}