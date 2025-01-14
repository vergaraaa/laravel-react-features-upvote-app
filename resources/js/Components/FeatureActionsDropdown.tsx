import { Feature } from '@/types';
import Dropdown from './Dropdown';

interface Props {
  feature: Feature;
}

export const FeatureActionsDropdown = ({ feature }: Props) => {
  return (
    <Dropdown>
      <Dropdown.Trigger>
        <span className="inline-flex rounded-md">
          <button
            type="button"
            className="inline-flex items-center rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none dark:bg-gray-800 dark:text-gray-400 dark:hover:text-gray-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
              />
            </svg>
          </button>
        </span>
      </Dropdown.Trigger>

      <Dropdown.Content>
        <Dropdown.Link href={route('features.edit', { id: feature.id })}>
          Edit
        </Dropdown.Link>

        <Dropdown.Link
          href={route('features.destroy', { id: feature.id })}
          method="delete"
          as="button"
        >
          Delete
        </Dropdown.Link>
      </Dropdown.Content>
    </Dropdown>
  );
};
