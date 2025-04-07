import EditBannerPage from '@/components/website-content/banners/EditBannerPage';

interface EditBannerPageProps {
  params: { id: string }
}

export default function EditBannerPageRoute({ params }: EditBannerPageProps) {
  return <EditBannerPage params={params} />;
}

export function generateMetadata({ params }: EditBannerPageProps) {
  return {
    title: `Edit Banner - Druckland Admin`,
    description: 'Edit and update an existing website banner'
  };
}