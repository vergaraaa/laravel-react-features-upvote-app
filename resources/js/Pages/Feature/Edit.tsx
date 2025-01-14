import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextAreaInput from '@/Components/TextAreaInput';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Feature } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

interface Props {
  feature: Feature;
}

export default function Edit({ feature }: Props) {
  const { data, setData, processing, put, errors } = useForm({
    name: feature.name,
    description: feature.description,
  });

  const createFeature: FormEventHandler = (e) => {
    e.preventDefault();

    put(route('features.update', { id: feature.id }), {
      preserveScroll: true,
    });
  };

  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl leading-tight text-gray-800 dark:text-gray-200">
          Edit feature <b>{feature.name}</b>
        </h2>
      }
    >
      <Head title={`Edit Feature ${feature.name}`} />

      <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
        <div className="flex gap-8 p-6 text-gray-900 dark:text-gray-100">
          <form onSubmit={createFeature} className="w-full space-y-4">
            <div>
              <InputLabel htmlFor="name" value="Name" />

              <TextInput
                id="name"
                className="mt-1 block w-full"
                value={data.name}
                onChange={(e) => setData('name', e.target.value)}
                required
                isFocused
                autoComplete="name"
              />

              <InputError className="mt-2" message={errors.name} />
            </div>

            <div>
              <InputLabel htmlFor="description" value="Description" />

              <TextAreaInput
                id="description"
                className="mt-1 block w-full"
                value={data.description}
                rows={6}
                onChange={(e) => setData('description', e.target.value)}
              />

              <InputError className="mt-2" message={errors.description} />
            </div>

            <PrimaryButton disabled={processing}>Save</PrimaryButton>
          </form>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
