import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { useDeleteUserQuery } from '../hooks/userReactQueryHooks';
import { deleteUser } from '../features/authSlice';
import { errorHandler } from '../utils/errorHandler';
import type { Error } from '../utils/errorHandler';
import { useAppDispatch, useAppSelector } from '../hooks/rtkHooks';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function DeleteUserModal() {
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);

  const handleDelete = async () => {
    try {
      dispatch(deleteUser());
      const data = await deleteUserMutateAsync(user?._id as string);

      toast.success(`"${data.name}" Deleted`);
      navigate('/login');
    } catch (error) {
      toast.error(errorHandler(error as Error));
    }
  };
  const { mutateAsync: deleteUserMutateAsync, isLoading } =
    useDeleteUserQuery();

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <div>
      <div className=" flex items-center justify-center">
        <button
          type="button"
          onClick={openModal}
          className=" w-full btn btn-error hover:bg-red-500 hover:bg-opacity-90 text-white "
        >
          Delete User
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
                <Dialog.Panel className="w-full relative max-w-md transform overflow-hidden rounded-2xl bg-white p-4 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Delete User
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Are you sure you want to delete your account? You will
                      lose all of your data. This action is permanent and
                      irreversible.
                    </p>
                  </div>

                  <button
                    onClick={closeModal}
                    className="btn btn-circle border-none absolute bg-white text-slate-900 hover:bg-slate-300 top-2 right-2 btn-xs"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                  <div className="flex items-center justify-end gap-2 mt-4">
                    {isLoading ? (
                      <button className="btn btn-sm">
                        <span className="loading normal-case loading-spinner"></span>
                        Loading
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="btn btn-sm btn-error hover:bg-red-500 hover:bg-opacity-90 text-white"
                        onClick={handleDelete}
                      >
                        Delete
                      </button>
                    )}
                    <button
                      type="button"
                      className="inline-flex  justify-center rounded-lg border border-transparent bg-slate-200 px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
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

export default DeleteUserModal;
