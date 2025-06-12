

type UserSettingKeyType = 'lastNotificationListOpened' | 'isDarkMode' | 'someOtherSetting'




// Läs inställning för userId och key från localStorage
export function getAppSettingsFromLocalStorage(userId: string, key: UserSettingKeyType) {
    const raw = localStorage.getItem(`appSettings_${userId}`)
    if (!raw) return undefined  // Om inget finns, returnera undefined

    try {
        const settings = JSON.parse(raw)
        return settings[key]  // Returnera värdet för den specifika key
    } catch {
        return undefined  // Om JSON är felaktigt, returnera undefined
    }
}

// Spara inställning för userId och key till localStorage
export function setAppSettingsToLocalStorage(userId: string, key: UserSettingKeyType, value: string | boolean) {

    const raw = localStorage.getItem(`appSettings_${userId}`)

    let settings: { [key: string]: string | boolean } = {} //definerar tomt settingsobjekt..
    if (raw) {
        try {
            settings = JSON.parse(raw)  //sätt hämtade data till settings.
        } catch {
            // Om JSON är felaktigt, ignorera och börja om med tomt objekt
        }
    }

    settings[key] = value  // Uppdatera eller lägg till ny inställning

    localStorage.setItem(`appSettings_${userId}`, JSON.stringify(settings))  // Spara tillbaka som sträng
}
