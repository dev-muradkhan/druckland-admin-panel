import EditRolePage from '@/components/roles/EditRolePage';

export default function EditRolePageRoute({ params }: { params: { id: string } }) {
  return <EditRolePage params={params} />;
}