import './index.css'

const themes = [ 'auto', 'light', 'dark' ]
let i

const fallback = (value, defaultValue) => value === null || value === undefined ? defaultValue : value
const getCurrentTheme = () => fallback(localStorage.getItem('theme'), 'auto')
const setCurrentTheme = theme => {
    const body = document.body
    i = themes.indexOf(theme)
    localStorage.setItem('theme', theme)
    body.classList.remove('theme--light', 'theme--dark')
    if (theme !== 'auto')
        body.classList.add(`theme--${theme}`)
    document.querySelector('meta[name=theme-color]')
        .setAttribute('content', getComputedStyle(body).getPropertyValue('--theme-color'))
}
const listenStorage = f => addEventListener('storage', f)
const updateTheme = () => setCurrentTheme(getCurrentTheme())
listenStorage(updateTheme)
updateTheme()

const ThemeToggler = () => {
    return {
        view() {
            return (
                <button class="theme-toggler" onclick={() => setCurrentTheme(themes[i = (++ i % themes.length)])}>
                    <div class="theme-toggler__icon theme-toggler__icon--light">
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3m0-7l2.39 3.42C13.65 5.15 12.84 5 12 5s-1.65.15-2.39.42zM3.34 7l4.16-.35A7.2 7.2 0 0 0 5.94 8.5c-.44.74-.69 1.5-.83 2.29zm.02 10l1.76-3.77a7.13 7.13 0 0 0 2.38 4.14zM20.65 7l-1.77 3.79a7.02 7.02 0 0 0-2.38-4.15zm-.01 10l-4.14.36c.59-.51 1.12-1.14 1.54-1.86c.42-.73.69-1.5.83-2.29zM12 22l-2.41-3.44c.74.27 1.55.44 2.41.44c.82 0 1.63-.17 2.37-.44z"/></svg>
                    </div>
                    <div class="theme-toggler__icon theme-toggler__icon--dark">
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="m17.75 4.09l-2.53 1.94l.91 3.06l-2.63-1.81l-2.63 1.81l.91-3.06l-2.53-1.94L12.44 4l1.06-3l1.06 3zm3.5 6.91l-1.64 1.25l.59 1.98l-1.7-1.17l-1.7 1.17l.59-1.98L15.75 11l2.06-.05L18.5 9l.69 1.95zm-2.28 4.95c.83-.08 1.72 1.1 1.19 1.85c-.32.45-.66.87-1.08 1.27C15.17 23 8.84 23 4.94 19.07c-3.91-3.9-3.91-10.24 0-14.14c.4-.4.82-.76 1.27-1.08c.75-.53 1.93.36 1.85 1.19c-.27 2.86.69 5.83 2.89 8.02a9.96 9.96 0 0 0 8.02 2.89m-1.64 2.02a12.08 12.08 0 0 1-7.8-3.47c-2.17-2.19-3.33-5-3.49-7.82c-2.81 3.14-2.7 7.96.31 10.98c3.02 3.01 7.84 3.12 10.98.31"/></svg>
                    </div>
                    <div class="theme-toggler__icon theme-toggler__icon--auto">
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="m14.3 16l-.7-2h-3.2l-.7 2H7.8L11 7h2l3.2 9zM20 8.69V4h-4.69L12 .69L8.69 4H4v4.69L.69 12L4 15.31V20h4.69L12 23.31L15.31 20H20v-4.69L23.31 12zm-9.15 3.96h2.3L12 9z"/></svg>
                    </div>
                </button>
            )
        }
    }
}

export default ThemeToggler
