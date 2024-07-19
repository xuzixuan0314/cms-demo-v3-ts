enum CacheType {
  local,
  Session
}
class ICache {
  storage: Storage
  constructor(type: CacheType) {
    this.storage = type === CacheType.local ? localStorage : sessionStorage
  }
  get(key: string) {
    const value = this.storage.getItem(key)
    if (value) {
      return JSON.parse(value)
    }
  }
  set(key: string, value: any) {
    if (key && value) {
      this.storage.setItem(key, JSON.stringify(value))
    }
  }
  remove(key: string) {
    this.storage.removeItem(key)
  }
  clear() {
    this.storage.clear()
  }
}
const localCache = new ICache(CacheType.local)
const sessionCache = new ICache(CacheType.Session)
export { localCache, sessionCache }
