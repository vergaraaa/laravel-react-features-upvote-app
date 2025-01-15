import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import Radio from '@/Components/Radio';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Role, User } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

interface Props {
  user: User;
  roles: Role[];
  roleLabels: Record<string, string>;
}

export default function Edit({ user, roles, roleLabels }: Props) {
  const { data, setData, processing, put, errors } = useForm({
    name: user.name,
    email: user.email,
    roles: user.roles,
  });

  const createUser: FormEventHandler = (e) => {
    e.preventDefault();

    put(route('users.update', { id: user.id }), {
      preserveScroll: true,
    });
  };

  const onRoleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setData('roles', [e.target.value]);
    }
  };

  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl leading-tight text-gray-800 dark:text-gray-200">
          Edit user <b>{user.name}</b>
        </h2>
      }
    >
      <Head title={`Edit User ${user.name}`} />

      <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
        <div className="flex gap-8 p-6 text-gray-900 dark:text-gray-100">
          <form onSubmit={createUser} className="w-full space-y-4">
            <div>
              <InputLabel htmlFor="name" value="Name" />

              <TextInput
                id="name"
                disabled
                className="mt-1 block w-full"
                value={data.name}
                required
              />

              <InputError className="mt-2" message={errors.name} />
            </div>

            <div>
              <InputLabel htmlFor="email" value="Email" />

              <TextInput
                id="email"
                disabled
                className="mt-1 block w-full"
                value={data.email}
                required
              />

              <InputError className="mt-2" message={errors.email} />
            </div>

            <div>
              <InputLabel value="Role" />

              {roles.map((role) => (
                <label key={role.id} className="flex items-center gap-2">
                  <Radio
                    name="roles"
                    checked={data.roles.includes(role.name)}
                    value={role.name}
                    onChange={onRoleChange}
                  />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {roleLabels[role.name]}
                  </span>
                </label>
              ))}
            </div>

            <PrimaryButton disabled={processing}>Save</PrimaryButton>
          </form>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
