
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { ReactNode } from "react"

type Props = {

    trigger: ReactNode,
    children: ReactNode,
    className?: string



}
export function TooltipComponent({ trigger, children,className= '' }: Props) {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    {trigger}
                </TooltipTrigger>
                <TooltipContent >
                    {children}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}
