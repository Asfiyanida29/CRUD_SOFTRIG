import Oidc from 'oidc-client'


export function log() {
  document.getElementById('results').innerText = '';

  Array.prototype.forEach.call(arguments, function (msg) {
      if (msg instanceof Error) {
          msg = "Error: " + msg.message;
      }
      else if (typeof msg !== 'string') {
          msg = JSON.stringify(msg, null, 2);
      }
      document.getElementById('results').innerHTML += msg + '\r\n';
  });
}
var config = {
  production: false,
  base_url: 'https://test.softrig.com/api/',
  authority: 'https://test-login.softrig.com',
  client_id: 'd313b14e-49f8-4693-b2e9-c4178fe4280b',
  redirect_uri: 'http://localhost:3000',
  post_logout_redirect_uri: 'http://localhost:3000',
  silent_redirect_uri: 'http://localhost:3000',
  automaticSilentRenew: true,
  response_type: 'id_token token',
  scope: 'openid profile AppFramework',
  filterProtocolClaims: true,
};

var mgr = new Oidc.UserManager(config);

mgr.getUser().then(function (user) {
  if (user) {
      log("User logged in", user.profile);
  }
  else {
      log("User not logged in");
  }
});

export function login() {
  mgr.signinRedirect();
}

 

export function logout() {
  mgr.signoutRedirect();
} 
