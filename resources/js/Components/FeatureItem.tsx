import { Feature } from '@/types';
import { Link } from '@inertiajs/react';

import { useState } from 'react';
import { FeatureActionsDropdown } from './FeatureActionsDropdown';
import { FeatureUpvoteDownvote } from './FeatureUpvoteDownvote';

interface Props {
  feature: Feature;
}

export const FeatureItem = ({ feature }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleReadMore = () => setIsExpanded(!isExpanded);

  return (
    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
      <div className="flex gap-8 p-6 text-gray-900 dark:text-gray-100">
        {/* UPVOTE / DOWNVOTE BAR */}
        <FeatureUpvoteDownvote feature={feature} />

        <div className="flex-1">
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
        </div>

        <FeatureActionsDropdown feature={feature} />
      </div>
    </div>
  );
};
