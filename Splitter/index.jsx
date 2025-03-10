import './index.css'
import './colors.css'
import classNames from 'classnames'

const Splitter = () => {
    return {
        view({ attrs }) {
            const { view, ...attributes } = { view: 'horizontal', ...attrs }
            const classes = classNames('splitter', {
                'splitter--horizontal': view === 'horizontal',
                'splitter--vertical': view === 'vertical'
            })
            return (
                <div class={classes} {...attributes}></div>
            )
        }
    }
}

export default Splitter
