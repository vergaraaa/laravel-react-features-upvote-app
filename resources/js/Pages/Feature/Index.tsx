import { FeatureItem } from '@/Components/FeatureItem';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Feature, PaginatedData } from '@/types';
import { Head } from '@inertiajs/react';

interface Props {
  features: PaginatedData<Feature>;
}

export default function Index({ features }: Props) {
  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
          Index
        </h2>
      }
    >
      <Head title="Index" />

      <div className="space-y-4">
        {features.data.map((feature) => (
          <FeatureItem key={feature.id} feature={feature} />
        ))}
      </div>
    </AuthenticatedLayout>
  );
}
