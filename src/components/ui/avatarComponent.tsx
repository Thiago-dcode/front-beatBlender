import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
type props = {
    src: string,

    fallback?: string
}
export function AvatarComponent({ src, fallback = 'CN' }: props) {
    return (
        <Avatar className="w-14 h-14">
            <AvatarImage src={src} alt="@shadcn" />
            <AvatarFallback>{fallback}</AvatarFallback>
        </Avatar>
    )
}