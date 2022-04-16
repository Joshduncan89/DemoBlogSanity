import type { NextApiRequest, NextApiResponse } from 'next'
import sanityClient from '@sanity/client'

export const config = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  useCdn: process.env.NODE_ENV === 'production',
  token: process.env.SANITY_API_TOKEN,
}

const client = sanityClient(config)

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { author, body, mainImage, description, title, _createdAt } =
    JSON.parse(req.body)

  try {
    await client.create({
      _type: 'post',
      author,
      mainImage,
      body,
      description,
      title,
      publishedAt: _createdAt,
    })
  } catch (error) {
    return res.status(500).json({ message: 'Couldnt submit Post', error })
  }
  console.log('comment submitted')
  return res.status(200).json({ message: 'Comment Submitted' })
}
