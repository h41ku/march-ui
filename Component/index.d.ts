export type VNode = {
    tag: string | object,
    key: string | undefined,
    attrs: object | undefined,
    children: Array<VNode> | string | number | boolean | undefined,
    text: string | number | boolean | undefined,
    dom: Element | undefined,
    domSize: number | undefined,
    state: object | undefined,
    events: object | undefined,
    instance: object | undefined
}

export type Component = {
    view: (vnode: VNode) => void
}
