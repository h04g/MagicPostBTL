import React from 'react';

function WithFacebookAndGoogle() {
  const loginWithProvider = (provider) => {
    switch (provider) {
      case 'google':
        window.open(
          `https://accounts.google.com/o/oauth2/auth/oauthchooseaccount?client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fo2auth&scope=openid%20profile%20email&response_type=code&service=lso&o2v=1&flowName=GeneralOAuthFlow`,
        );
        break;
      case 'facebook':
        //       window.open("https://accounts.google.com/o/oauth2/auth/oauthchooseaccount?client_id=23003650625-l1a2i3qrlekvkgkc3cp90a1nj6abotru.apps.googleusercontent.com&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauthgoogle&scope=openid%20profile%20email&response_type=code&service=lso&o2v=1&flowName=GeneralOAuthFlow");
        break;
    }
  };
  return (
    <div>
      <div className="align-items-center login-or">
        <div className="login-or-line"></div>
        <div className="login-or-text">HOẶC</div>
        <div className="login-or-line"></div>
      </div>
      <div className="login-fb-gg">
        <button onClick={() => loginWithProvider('facebook')}>
          <div className="login-fb-icon"></div>
          <div>Facebook</div>
        </button>
        <button onClick={() => loginWithProvider('google')}>
          <div className="login-gg-icon"></div>
          <div>Google</div>
        </button>
      </div>
    </div>
  );
}

export default WithFacebookAndGoogle;
