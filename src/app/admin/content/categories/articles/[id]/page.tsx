import EditArticlePage from '@/components/website-content/categories/articles/EditArticlePage';

interface EditArticlePageProps {
  params: { id: string }
}

export default function EditArticlePageRoute({ params }: EditArticlePageProps) {
  return <EditArticlePage params={params} />;
}

export function generateMetadata({ params }: EditArticlePageProps) {
  return {
    title: `Edit Article - Druckland Admin`,
    description: 'Edit and update an existing article'
  };
}