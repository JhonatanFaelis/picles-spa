import { ImgHTMLAttributes } from "react"
import thumbDefault from '../../../assets/thumb-default.jpg'


interface IImageBase64 extends ImgHTMLAttributes<HTMLImageElement> {
    src?: string
}

export function ImageBase64({ src, ...rest }: IImageBase64) {
    return (
        <img {...rest} src={`data:image/*;base64,${src}`} alt="" onError={(e) => (e.currentTarget.src = thumbDefault)} />

    )
}