import { authenticateGoogleUser } from '../data/usersDatabase';

/**
 * Triggers the official Google OAuth 2.0 popup from accounts.google.com
 */
export function triggerOfficialGoogleSignIn({ clientId, onSuccess, onError }) {
  const activeClientId = clientId || import.meta.env.VITE_GOOGLE_CLIENT_ID || localStorage.getItem('nortech_google_client_id');

  if (!activeClientId) {
    return {
      success: false,
      needsClientId: true,
      message: 'Para abrir o popup oficial do Google (accounts.google.com), é necessário configurar o seu Google Client ID.'
    };
  }

  if (!window.google?.accounts?.oauth2) {
    const errorMsg = 'O script oficial do Google (accounts.google.com/gsi/client) ainda está carregando. Tente novamente em alguns segundos.';
    onError?.(errorMsg);
    return { success: false, message: errorMsg };
  }

  try {
    const client = window.google.accounts.oauth2.initTokenClient({
      client_id: activeClientId.trim(),
      scope: 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email openid',
      callback: async (tokenResponse) => {
        if (tokenResponse && tokenResponse.access_token) {
          try {
            // Fetch real user info directly from Google OAuth API
            const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
              headers: {
                Authorization: `Bearer ${tokenResponse.access_token}`
              }
            });

            if (!res.ok) {
              throw new Error('Falha ao comunicar com a API do Google.');
            }

            const profile = await res.json();
            
            const googleProfile = {
              googleEmail: profile.email,
              googleName: profile.name,
              googleAvatar: profile.picture,
              googleSub: profile.sub
            };

            const authResult = authenticateGoogleUser(googleProfile);
            onSuccess?.(authResult);
          } catch (fetchErr) {
            onError?.('Erro ao obter perfil da conta Google: ' + fetchErr.message);
          }
        } else if (tokenResponse.error) {
          onError?.('Autenticação Google cancelada ou erro: ' + tokenResponse.error);
        }
      }
    });

    // Opens the REAL Google OAuth popup (accounts.google.com)
    client.requestAccessToken({ prompt: 'select_account' });
    return { success: true };
  } catch (err) {
    console.error('Error opening official Google OAuth popup:', err);
    onError?.('Erro ao iniciar o popup do Google: ' + err.message);
    return { success: false, message: err.message };
  }
}
