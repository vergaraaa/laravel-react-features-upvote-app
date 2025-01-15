import { CommentForm } from '@/Components/CommentForm';
import { CommentItem } from '@/Components/CommentItem';
import { FeatureActionsDropdown } from '@/Components/FeatureActionsDropdown';
import { FeatureUpvoteDownvote } from '@/Components/FeatureUpvoteDownvote';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Feature } from '@/types';
import { Head } from '@inertiajs/react';

interface Props {
  feature: Feature;
}

export default function Show({ feature }: Props) {
  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl leading-tight text-gray-800 dark:text-gray-200">
          Feature <b>{feature.name}</b>
        </h2>
      }
    >
      <Head title={`Feature ${feature.name}`} />

      <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
        <div className="flex gap-8 p-6 text-gray-900 dark:text-gray-100">
          {/* UPVOTE / DOWNVOTE BAR */}
          <FeatureUpvoteDownvote feature={feature} />

          <div className="flex-1">
            <h2 className="mb-2 text-2xl font-bold">{feature.name}</h2>

            <p>{feature.description}</p>

            {/* COMMENT FORM */}
            <CommentForm feature={feature} />

            {feature.comments.map((comment) => (
              <CommentItem key={comment.id} comment={comment} />
            ))}
          </div>

          <FeatureActionsDropdown feature={feature} />
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
