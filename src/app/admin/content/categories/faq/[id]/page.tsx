import EditFAQPage from '@/components/website-content/categories/faq/EditFAQPage';

interface EditFAQPageProps {
  params: { id: string }
}

export default function EditFAQPageRoute({ params }: EditFAQPageProps) {
  return <EditFAQPage params={params} />;
}

export function generateMetadata({ params }: EditFAQPageProps) {
  return {
    title: `Edit FAQ - Druckland Admin`,
    description: 'Edit existing frequently asked questions'
  };
}