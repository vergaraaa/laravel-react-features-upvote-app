import { Feature } from '@/types';
import { Link } from '@inertiajs/react';

import { useState } from 'react';
import { FeatureActionsDropdown } from './FeatureActionsDropdown';

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
        <div className="flex flex-col items-center">
          <button className={feature.user_has_upvoted ? 'text-amber-600' : ''}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-12"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m4.5 15.75 7.5-7.5 7.5 7.5"
              />
            </svg>
          </button>

          <span
            className={`text-2xl font-semibold ${
              feature.user_has_upvoted || feature.user_has_downvoted
                ? 'text-amber-600'
                : ''
            }`}
          >
            {feature.upvote_count}
          </span>

          <button
            className={feature.user_has_downvoted ? 'text-amber-600' : ''}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-12"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
              />
            </svg>
          </button>
        </div>

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
