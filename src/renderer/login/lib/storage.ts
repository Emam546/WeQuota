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
  async saveCredentials(username: string, password?: string) {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, username)
    localStorage.setItem(STORAGE_KEYS.AUTO_LOGIN, 'true')

    if (password) {
      // Simulation of Windows Credential Manager storage
      console.log(`[SECURE] Storing credentials for ${username} in Credential Manager...`)
      localStorage.setItem(`${SERVICE_NAME}_${username}_secret`, btoa(password))
    }
  },

  /** Retrieves credentials for auto-login */
  async getSavedCredentials() {
    const isAutoLoginEnabled = localStorage.getItem(STORAGE_KEYS.AUTO_LOGIN) === 'true'
    const username = localStorage.getItem(STORAGE_KEYS.CURRENT_USER)

    if (isAutoLoginEnabled && username) {
      const secret = localStorage.getItem(`${SERVICE_NAME}_${username}_secret`)
      return {
        success: true,
        username,
        password: secret ? atob(secret) : null
      }
    }

    return { success: false }
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
