'use client';

import React, { useContext, useState } from 'react';
import { FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa';
import { UserContext } from '@contexts/UserContext';
import FormMessage from '@components/common/forms/FormMessage';
import Input from '@components/common/forms/Input';
import SubmitButton from '@components/common/forms/SubmitButton';
import SectionTitle from '@components/common/forms/SectionTitle';
import { ModalContext } from '@contexts/ModalContext';

const EditUserDataForm = () => {
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
      const response = await fetch('/api/user/edit/bio', {
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
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-gray-900 text-2xl font-semibold">Update Profile</h2>
      </div>

      <FormMessage message={message} />

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-6">
          <SectionTitle title="Personal information" />

          <div className="grid gap-4">
            <Input name="name" placeholder="Full Name" defaultValue={user?.name || ''} />
            <Input
              name="professionalTitle"
              placeholder="Professional Title"
              defaultValue={user?.professionalTitle || ''}
            />
            <Input name="city" placeholder="Warsaw, Poland" defaultValue={user?.city || ''} />
          </div>
        </div>

        <div className="space-y-6">
          <SectionTitle title="Social media" />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              { icon: FaTwitter, name: 'twitter', placeholder: 'Twitter URL' },
              { icon: FaLinkedin, name: 'linkedIn', placeholder: 'LinkedIn URL' },
              { icon: FaGithub, name: 'github', placeholder: 'GitHub URL' },
            ].map(({ icon: Icon, name, placeholder }) => (
              <div key={name} className="group space-y-2">
                <Icon className="text-gray-400 text-2xl transition-colors duration-300 group-focus-within:text-teal-500" />
                <Input
                  defaultValue={user?.socialmedia?.[name as keyof typeof user.socialmedia] || ''}
                  name={name}
                  placeholder={placeholder}
                />
              </div>
            ))}
          </div>
        </div>

        <SubmitButton loading={loading} />
      </form>
    </div>
  );
};
export default EditUserDataForm;
