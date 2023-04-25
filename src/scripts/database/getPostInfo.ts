import prisma from '@/lib/prisma'
import { PostInfo } from '@projectType/componentTypes'

export async function getPostInfo(route: string): Promise<PostInfo | null> {
  return await prisma.post.findUnique({
    where: {
      id: route,
    },
    include: {
      Post_category: {
        select: {
          name: true,
        },
      },
      creator: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
      changedBy: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
    },
  })
}
