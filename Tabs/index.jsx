import './index.css'
import './colors.css'
import classNames from 'classnames'
import Tab from '../Tab'

const Tabs = ({ attrs }) => {
    let { active } = attrs
    const switchTab = (key, onchange) => () => {
        active = key
        if (onchange)
            onchange()
    }
    return {
        view({ attrs: { active: activeNext, onchange, ...attributes }, children }) {
            const tabs = children.filter(({ tag }) => tag === Tab)
                .map((tab, i) => {
                    const { key, attrs: { title } } = tab
                    tab.attrs = { ...tab.attrs, ...attributes }
                    return { key: key === undefined ? i : key, title, tab }
                })
            const activeIndex = tabs.findIndex(({ key }) => key === active || active === undefined)
            if (activeIndex >= 0) {
                active = tabs[activeIndex].key
            }
            const classes = 'tabs'
            return (
                <div class={classes}>
                    <div class="tabs__list">
                        <div class="tabs__switch">
                            {tabs.map(({ key, title }, i) => {
                                return <div class={classNames('tab__title', {
                                    'tab__title--active': i === activeIndex
                                })} onclick={switchTab(key, onchange)}>{title}</div>
                            })}
                        </div>
                    </div>
                    {activeIndex >= 0 &&
                        <div class="tabs__content">{tabs[activeIndex].tab}</div>}
                </div>
            )
        }
    }
}

export default Tabs
