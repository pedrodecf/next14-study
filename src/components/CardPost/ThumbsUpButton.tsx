'use client'

import { useFormStatus } from "react-dom";
import { IconButton } from "../IconButton";
import { ThumbsUp } from "../icons/ThumbsUp";

export function ThumbsUpButton () {
    const { pending } = useFormStatus()
    return (
        <IconButton disabled={pending}>
           <ThumbsUp />
        </IconButton>
    )
}