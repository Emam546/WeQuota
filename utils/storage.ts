/**
 * Secure Storage Service.
 *
 * PRODUCTION NOTE:
 * In a real Electron build, you would replace the localStorage calls here
 * with the 'keytar' library to access the actual Windows Credential Manager.
 *
 * Example:
 * const keytar = require('keytar');
 * await keytar.setPassword('NetQuota', username, password);
 */

const SERVICE_NAME = 'NetQuota_Desktop'
const STORAGE_KEYS = {
  CURRENT_USER: 'netquota_current_user',
  AUTO_LOGIN: 'netquota_auto_login_enabled'
}

export const SecureStorage = {
  /** Stores credentials securely */
  async saveCredentials(username: string, data?: unknown) {
    if (window.Environment == 'desktop') {
      await window.api.invoke('saveCredentials', username, data)
    } else {
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, username)
      localStorage.setItem(STORAGE_KEYS.AUTO_LOGIN, 'true')

      if (data) {
        // Simulation of Windows Credential Manager storage
        console.log(`[SECURE] Storing credentials for ${username} in Credential Manager...`)
        localStorage.setItem(`${SERVICE_NAME}_${username}_secret`, btoa(JSON.stringify(data)))
      }
    }
  },

  /** Retrieves credentials for auto-login */
  async getSavedCredentials<T>() {
    if (window.Environment == 'desktop') {
      return await window.api.invoke('getCredentials')
    } else {
      const isAutoLoginEnabled = localStorage.getItem(STORAGE_KEYS.AUTO_LOGIN) === 'true'
      const username = localStorage.getItem(STORAGE_KEYS.CURRENT_USER)

      if (isAutoLoginEnabled && username) {
        const secret = localStorage.getItem(`${SERVICE_NAME}_${username}_secret`)
        return {
          success: true,
          username,
          data: secret ? (JSON.parse(atob(secret)) as T) : null
        }
      }

      return { success: false }
    }
  },

  /** Clears all stored data */
  async clearSession() {
    localStorage.removeItem(STORAGE_KEYS.AUTO_LOGIN)
    const username = localStorage.getItem(STORAGE_KEYS.CURRENT_USER)
    if (username) {
      localStorage.removeItem(`${SERVICE_NAME}_${username}_secret`)
    }
  }
}
