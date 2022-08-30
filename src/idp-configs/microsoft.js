/*
 * Copyright 2022 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
export default {
  name: 'microsoft',
  mountType: 'onedrive',
  client: (ctx) => ({
    clientId: ctx.env.AZURE_HELIX_SERVICE_CLIENT_ID,
    clientSecret: ctx.env.AZURE_HELIX_SERVICE_CLIENT_SECRET,
  }),
  scope: [
    'openid',
    'profile',
    'email',
    'user.read',
    'offline_access',
    'Files.ReadWrite.All',
    'Sites.ReadWrite.All',
  ].join(' '),
  validateIssuer: (iss) => iss.startsWith('https://login.microsoftonline.com/'),
  discoveryUrl: 'https://login.microsoftonline.com/{tenantid}/v2.0/.well-known/openid-configuration',
  loginPrompt: 'select_account',
  // todo: fetch from discovery document
  discovery: (tenantid) => ({
    issuer: `https://login.microsoftonline.com/${tenantid}/v2.0`,
    request_uri_parameter_supported: false,
    token_endpoint: `https://login.microsoftonline.com/${tenantid}/oauth2/v2.0/token`,
    userinfo_endpoint: 'https://graph.microsoft.com/oidc/userinfo',
    authorization_endpoint: `https://login.microsoftonline.com/${tenantid}/oauth2/v2.0/authorize`,
    device_authorization_endpoint: `https://login.microsoftonline.com/${tenantid}/oauth2/v2.0/devicecode`,
    http_logout_supported: true,
    frontchannel_logout_supported: true,
    end_session_endpoint: `https://login.microsoftonline.com/${tenantid}/oauth2/v2.0/logout`,
    jwks_uri: 'https://login.microsoftonline.com/common/discovery/v2.0/keys',
  }),
  routes: {
    login: '/auth/microsoft',
    loginRedirect: '/auth/microsoft/ack',
  },
};
