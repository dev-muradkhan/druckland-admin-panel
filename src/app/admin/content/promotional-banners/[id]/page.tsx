import EditPromotionalBannerPage from '@/components/website-content/promotional-banners/EditPromotionalBannerPage';

interface EditPromotionalBannerPageProps {
  params: { id: string }
}

export default function EditPromotionalBannerPageRoute({ params }: EditPromotionalBannerPageProps) {
  return <EditPromotionalBannerPage params={params} />;
}

export function generateMetadata({ params }: EditPromotionalBannerPageProps) {
  return {
    title: `Edit Promotional Banner - Druckland Admin`,
    description: 'Edit and update an existing promotional banner'
  };
}