import { Feature } from '@/types';
import { useForm } from '@inertiajs/react';
import PrimaryButton from './PrimaryButton';
import TextAreaInput from './TextAreaInput';

interface Props {
  feature: Feature;
}

export const CommentForm = ({ feature }: Props) => {
  const { data, setData, post, processing } = useForm({
    comment: '',
  });

  const createComment = (e: React.FormEvent) => {
    e.preventDefault();

    post(route('comment.store', feature.id), {
      preserveScroll: true,
      preserveState: true,
      onSuccess: () => setData('comment', ''),
    });
  };

  return (
    <form
      onSubmit={createComment}
      className="flex items-center gap-2.5 rounded-lg bg-gray-50 py-2 dark:bg-gray-800"
    >
      <label className="sr-only">Your comment</label>

      <TextAreaInput
        rows={1}
        required
        value={data.comment}
        onChange={(e) => setData('comment', e.target.value)}
        className="mt-1 block w-full"
        placeholder="Add comment"
      />

      <PrimaryButton disabled={processing}>Comment</PrimaryButton>
    </form>
  );
};
