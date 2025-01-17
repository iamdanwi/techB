import { Client, Databases } from 'appwrite';

const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject(process.env.NEXT_PUBLIC_PROJECT_ID as string);

export async function generateStaticParams() {
  const databases = new Databases(client);
  const response = await databases.listDocuments(
    process.env.NEXT_PUBLIC_DATABASE_ID as string,
    process.env.NEXT_PUBLIC_COLLECTION_ID as string
  );

 
  if (!response.documents || !Array.isArray(response.documents)) {
    console.error('Unexpected response format:', response);
    return [];
  }


  const paths = response.documents.map((post) => ({
    slug: post.slug,
  }));

  return paths;
}
