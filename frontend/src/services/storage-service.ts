const STORAGE_KEYS = {
  ACCESS_TOKEN: 'dw_access_token',
  REFRESH_TOKEN: 'dw_refresh_token',
  USER: 'dw_user',
};

class StorageServiceClass {
  clear() {
    throw new Error('Method not implemented.');
  }
  // Token management
  setTokens(accessToken: string, refreshToken: string): void {
    localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
    localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
  }

  getAccessToken(): string | null {
    return localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
  }

  clearTokens(): void {
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
  }

  // User management
  setUser(user: any): void {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  }

  getUser(): any {
    const user = localStorage.getItem(STORAGE_KEYS.USER);
    return user ? JSON.parse(user) : null;
  }

  clearUser(): void {
    localStorage.removeItem(STORAGE_KEYS.USER);
  }

  // Clear all
  clearAll(): void {
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER);
  }

  // Check if user exists
  hasUser(): boolean {
    return !!localStorage.getItem(STORAGE_KEYS.USER);
  }

  // Check if tokens exist
  hasTokens(): boolean {
    return !!localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
  }
}

// Export instance (not type)
export const storage = new StorageServiceClass();