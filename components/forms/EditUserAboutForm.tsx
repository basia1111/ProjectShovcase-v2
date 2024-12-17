'use client';

import React, { useContext, useState } from 'react';
import { UserContext } from '@contexts/UserContext';
import SubmitButton from '@components/common/forms/SubmitButton';
import SectionTitle from '@components/common/forms/SectionTitle';
import FormMessage from '@components/common/forms/FormMessage';
import { ModalContext } from '@contexts/ModalContext';

const EditUserAboutForm = () => {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { user, updateUser } = useContext(UserContext)!;
  const { closeModal } = useContext(ModalContext)!;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    setMessage('');

    try {
      setLoading(true);
      const response = await fetch('/api/user/edit/about', {
        method: 'PUT',
        body: formData,
      });

      const data = await response.json();
      setLoading(false);
      if (response.ok) {
        updateUser(data.user);
        closeModal();
      } else {
        setMessage(data?.message || '');
      }
    } catch {
      setMessage('Data update failed.');
    }
  };

  return (
    <div className="relative" onClick={(e) => e.stopPropagation()}>
      <SectionTitle title="About You" />
      <FormMessage message={message} />
      <form onSubmit={handleSubmit} className="space-y-6">
        <textarea
          name="about"
          id="about"
          rows={8}
          placeholder="Write something about yourself..."
          defaultValue={user?.about || ''}
          className="border-gray-200 text-gray-700 placeholder:text-gray-400 hover:bg-gray-50 mt-8 w-full rounded-lg border bg-white px-4 py-3 transition-all duration-200 hover:border-teal-500/20 focus:border-teal-500/30 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
        />

        <SubmitButton loading={loading} />
      </form>
    </div>
  );
};

export default EditUserAboutForm;
