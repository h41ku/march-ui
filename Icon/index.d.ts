import type { Component } from '../Component';

export type IconProps = {
    name: string,
    [key: string]: unknown
}

export default function Icon(props: IconProps): Component;
