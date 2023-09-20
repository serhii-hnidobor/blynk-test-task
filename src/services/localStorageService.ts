type LocalStorageValue =
  | number
  | string
  | Record<string, unknown>
  | Array<unknown>;

class LocalStorageService {
  retrieve<T extends LocalStorageValue>(key: string): T | null {
    const value = localStorage.getItem(key);

    if (!value) {
      return null;
    }

    return this.parseValue<T>(value);
  }

  remove(key: string) {
    return localStorage.removeItem(key);
  }

  parseValue<T extends LocalStorageValue>(value: string) {
    try {
      return JSON.parse(value) as T;
    } catch {
      return value as T;
    }
  }

  add(key: string, item: LocalStorageValue) {
    if (typeof item === "object") {
      localStorage.setItem(key, JSON.stringify(item));
      return;
    }

    localStorage.setItem(key, String(item));
  }
}

export default LocalStorageService;
