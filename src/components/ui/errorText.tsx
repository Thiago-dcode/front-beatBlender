import React from 'react'
type props = {
    message: string,
    textColor?: `text-${string}`,
    bgColor?: `bg-${string}`,
    fontSize?: FontSize

}

export enum FontSize {
    xs = 'text-xs',
    md = 'text-sm',
    l = 'text-xl',
    xl = 'text-2xl',


}
export function ErrorText({ message, textColor = 'text-red-500', bgColor = 'bg-none', fontSize = FontSize.md }: props) {
    return (
        <p className={`text-center ${textColor} ${bgColor} ${fontSize}`}>{message}</p>
    )
}

