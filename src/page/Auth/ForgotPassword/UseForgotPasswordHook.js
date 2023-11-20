import { useState } from 'react';
import { forgotPassword } from '../../../Service/Auth/Login';
import { toast } from 'react-toastify';

export const UseForgotPasswordHook = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSetEmail = (event) => {
    event.preventDefault();

    setEmail(event.target.value);
  };
  const sendEmail = (event) => {
    event.preventDefault();
    setIsLoading(true);
    forgotPassword(email)
      .then((res) => {
        if (res.data.success) {
          toast.success(res.data.message);
          setIsSubmitted(true);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        toast.error('error');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return { email, isLoading, isSubmitted, handleSetEmail, sendEmail };
};
