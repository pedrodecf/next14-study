'use server'

import { db } from "../../prisma/db";
import { revalidatePath } from "next/cache";

export async function incrementThumbsUp(id: number) {
    await db.post.update({
        where: {
            id
        },
        data: {
            likes: {
                increment: 1
            }
        }
    })

    revalidatePath('/')
}