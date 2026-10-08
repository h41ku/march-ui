import type { Component } from '../Component';

export type ContextMenuProps = {
    state?: 'shown' | 'hidden' | string,
    [key: string]: unknown
}

export default function ContextMenu(props: ContextMenuProps): Component;
