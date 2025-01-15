import { Feature } from '@/types';
import { Link, usePage } from '@inertiajs/react';

import { can } from '@/helpers';
import { useState } from 'react';
import { FeatureActionsDropdown } from './FeatureActionsDropdown';
import { FeatureUpvoteDownvote } from './FeatureUpvoteDownvote';

interface Props {
  feature: Feature;
}

export const FeatureItem = ({ feature }: Props) => {
  const user = usePage().props.auth.user;

  const [isExpanded, setIsExpanded] = useState(false);

  const toggleReadMore = () => setIsExpanded(!isExpanded);

  return (
    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
      <div className="flex gap-8 p-6 text-gray-900 dark:text-gray-100">
        {/* UPVOTE / DOWNVOTE BAR */}
        <FeatureUpvoteDownvote feature={feature} />

        {/* DESCRIPTION */}
        <div className="flex-1 space-y-4">
          <Link href={route('features.show', { id: feature.id })}>
            <h2 className="mb-2 text-2xl font-bold">{feature.name}</h2>
          </Link>

          <p>
            {isExpanded
              ? feature.description
              : `${(feature.description || '').substring(0, 200)}...`}
          </p>

          {feature.description && (
            <button
              onClick={toggleReadMore}
              className="text-amber-500 hover:underline"
            >
              {isExpanded ? 'Read less' : 'Read More'}
            </button>
          )}

          <div>
            <Link
              href={route('features.show', feature.id)}
              className="dark:focus-ring-gray-700 mb-2 me-2 inline-flex gap-2 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Comments
            </Link>
          </div>
        </div>

        {can(user, 'manage_features') && (
          <FeatureActionsDropdown feature={feature} />
        )}
      </div>
    </div>
  );
};
