const Tab = ({ attrs }) => {
    return {
        view({ attrs, children }) {
            const { key, title, ...attributes } = attrs
            return (
                <>
                    {children.map(/** @type {(vnode: import("../Component").VNode) => import("../Component").VNode} */ vnode => {
                        if (vnode && vnode.attrs)
                            vnode.attrs = { ...vnode.attrs, ...attributes }
                        return vnode
                    })}
                </>
            )
        }
    }
}

export default Tab
