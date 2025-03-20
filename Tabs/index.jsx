import './index.css'
import './colors.css'
import classNames from 'classnames'

const Tabs = ({ attrs }) => {
    let { active } = attrs
    return {
        view({ children }) {
            const tabs = children.filter(({ tag: { name } }) => name === 'Tab')
                .map(tab => {
                    const { key, attrs: { title }, children: content } = tab
                    return { key, title, content }
                })
            const activeIndex = tabs.findIndex(({ key }) => key === active || active === undefined)
            const classes = 'tabs'
            return (
                <div class={classes}>
                    <div class="tabs__list">
                        <div class="tabs__switch">
                            {tabs.map(({ key, title }, i) => {
                                return <div class={classNames('tab__title', {
                                    'tab__title--active': i === activeIndex
                                })} onclick={() => { active = key }}>{title}</div>
                            })}
                        </div>
                    </div>
                    {activeIndex >= 0 &&
                        <div class="tabs__content">{tabs[activeIndex].content}</div>}
                </div>
            )
        }
    }
}

export default Tabs
