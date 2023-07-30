import { Dialog, Transition } from '@headlessui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Fragment, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useUpdateCommentQuery } from '../hooks/commentsReactQueryHook';
import { type Error, errorHandler } from '../utils/errorHandler';
import { toast } from 'react-toastify';

export default function UpdateCommentModal({
  defVal,
  cmntId,
  paramsId,
}: {
  paramsId: string;
  defVal: string;
  cmntId: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const schemaComment = z.object({
    comment: z.string().nonempty('Enter comment'),
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<{
    comment: string;
  }>({
    resolver: zodResolver(schemaComment),
    defaultValues: {
      comment: defVal,
    },
  });
  const { mutate, isLoading } = useUpdateCommentQuery(paramsId, closeModal);

  const formSubmitComment = ({ comment }: { comment: string }) => {
    try {
      const cmntData = {
        comment,
        cmntId,
      };
      mutate(cmntData);
      setValue('comment', '');
    } catch (error) {
      toast.error(errorHandler(error as Error));
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center">
        <button
          type="button"
          onClick={openModal}
          className=" btn btn-xs btn-accent text-white"
        >
          Edit
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-30" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full relative max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Edit Comment
                  </Dialog.Title>
                  <div className="mt-2">
                    <form
                      className=" flex-col items-center justify-center gap-2"
                      onSubmit={handleSubmit(formSubmitComment)}
                    >
                      <div className="space-y-1 flex-grow ">
                        <input
                          {...register('comment')}
                          type="text"
                          className=" input input-md w-full border border-slate-500   "
                          placeholder="Write comment"
                        />
                        <p className="text-red-500 text-sm">
                          {errors.comment?.message}
                        </p>
                      </div>

                      <div className="flex items-center justify-end gap-2 ">
                        {isLoading ? (
                          <button className="btn btn-sm">
                            <span className="loading normal-case loading-spinner"></span>
                            Loading
                          </button>
                        ) : (
                          <button
                            type="submit"
                            className="btn normal-case btn-sm btn-accent"
                          >
                            Add
                          </button>
                        )}
                        <button
                          type="button"
                          className="inline-flex  justify-center rounded-lg border border-transparent bg-slate-200 px-2 py-[8px] text-sm font-semibold text-slate-900 hover:bg-slate-300  focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2"
                          onClick={closeModal}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
