import React from 'react';
import { UseForgotPasswordHook } from './UseForgotPasswordHook';
const ForgotPassword = () => {
  const { email, isSubmitted, handleSetEmail, sendEmail } =
    UseForgotPasswordHook();
  return (
    <div className="container">
      <h2>Forgot Password</h2>
      {isSubmitted ? (
        <div className="alert alert-success">
          Password reset link sent to your email.
        </div>
      ) : (
        <form onSubmit={sendEmail}>
          <div className="mb-3">
            <label htmlFor="inputEmail" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="inputEmail"
              placeholder="Enter email"
              value={email}
              onChange={handleSetEmail}
            />
          </div>
          <button type="submit" className="btn btn-primary" onClick={sendEmail}>
            Reset Password
          </button>
        </form>
      )}
    </div>
  );
};
export default ForgotPassword;
