import initialUsersData from './users.json';

const USERS_STORAGE_KEY = 'nortech_users_database_v1';

/**
 * Initializes and retrieves all users from JSON database / LocalStorage
 */
export function getAllUsers() {
  try {
    const stored = localStorage.getItem(USERS_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
    // Seed initial users into localStorage from users.json
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(initialUsersData));
    return initialUsersData;
  } catch (err) {
    console.error('Error accessing users database:', err);
    return initialUsersData;
  }
}

/**
 * Saves updated users array to storage
 */
function saveUsers(users) {
  try {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  } catch (err) {
    console.error('Error saving users database:', err);
  }
}

/**
 * Registers a new user with validation
 */
export function registerUser({ name, email, password, phone, provider = 'email', avatar = null }) {
  const users = getAllUsers();
  const normalizedEmail = (email || '').trim().toLowerCase();
  const normalizedPhone = (phone || '').trim();

  // Validate required fields
  if (!name || !name.trim()) {
    return { success: false, message: 'Por favor, informe seu nome completo.' };
  }

  if (provider === 'email') {
    if (!normalizedEmail) {
      return { success: false, message: 'Por favor, informe seu e-mail.' };
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(normalizedEmail)) {
      return { success: false, message: 'Por favor, informe um formato de e-mail válido.' };
    }
    if (!password || password.length < 6) {
      return { success: false, message: 'A senha deve ter no mínimo 6 caracteres.' };
    }

    // Check duplicate email
    const existing = users.find(u => u.email && u.email.toLowerCase() === normalizedEmail);
    if (existing) {
      return { 
        success: false, 
        message: 'Este e-mail já está cadastrado no sistema. Por favor, vá para "Já tenho conta" e faça seu login.' 
      };
    }
  }

  if (provider === 'phone') {
    if (!normalizedPhone || normalizedPhone.replace(/\D/g, '').length < 10) {
      return { success: false, message: 'Informe um número de celular válido com DDD.' };
    }
    const existingPhone = users.find(u => u.phone && u.phone.replace(/\D/g, '') === normalizedPhone.replace(/\D/g, ''));
    if (existingPhone) {
      return {
        success: false,
        message: 'Este telefone já possui cadastro. Use a opção de login.'
      };
    }
  }

  // Create new user object
  const defaultAvatar = avatar || `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(normalizedEmail || name)}`;
  const newUser = {
    id: 'usr_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
    name: name.trim(),
    email: normalizedEmail,
    password: password || '',
    phone: normalizedPhone || '',
    avatar: defaultAvatar,
    provider,
    createdAt: new Date().toISOString()
  };

  users.push(newUser);
  saveUsers(users);

  // Return user without revealing sensitive internals
  const { password: _, ...safeUser } = newUser;
  return {
    success: true,
    user: safeUser,
    message: 'Conta criada com sucesso!'
  };
}

/**
 * Logs in an existing user with Email & Password validation
 */
export function loginUser({ email, password }) {
  const users = getAllUsers();
  const normalizedEmail = (email || '').trim().toLowerCase();

  if (!normalizedEmail || !password) {
    return { success: false, message: 'Por favor, preencha o e-mail e a senha.' };
  }

  const user = users.find(u => u.email && u.email.toLowerCase() === normalizedEmail);

  if (!user) {
    return { 
      success: false, 
      message: 'Nenhuma conta encontrada com este e-mail. Crie sua conta gratuitamente na aba "Criar Conta".' 
    };
  }

  if (user.password !== password) {
    return { 
      success: false, 
      message: 'Senha incorreta. Verifique sua senha e tente novamente.' 
    };
  }

  const { password: _, ...safeUser } = user;
  return {
    success: true,
    user: safeUser,
    message: `Bem-vindo de volta, ${user.name}!`
  };
}

/**
 * Authenticates or registers a user via Google OAuth data
 */
export function authenticateGoogleUser({ googleEmail, googleName, googleAvatar }) {
  const users = getAllUsers();
  const normalizedEmail = (googleEmail || '').trim().toLowerCase();

  if (!normalizedEmail) {
    return { success: false, message: 'Conta Google inválida ou e-mail não informado.' };
  }

  let user = users.find(u => u.email && u.email.toLowerCase() === normalizedEmail);

  if (!user) {
    // Register new user via Google
    user = {
      id: 'g_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
      name: googleName || normalizedEmail.split('@')[0] || 'Usuário Google',
      email: normalizedEmail,
      password: '',
      phone: '',
      avatar: googleAvatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(normalizedEmail)}`,
      provider: 'google',
      createdAt: new Date().toISOString()
    };
    users.push(user);
    saveUsers(users);
  } else {
    // If existing account, update avatar if available and mark as verified
    if (googleAvatar) user.avatar = googleAvatar;
    if (googleName && !user.name) user.name = googleName;
    saveUsers(users);
  }

  const { password: _, ...safeUser } = user;
  return {
    success: true,
    user: safeUser,
    message: `Autenticado com sucesso via Google como ${user.name}!`
  };
}

/**
 * Authenticates or registers a user via Phone Number
 */
export function authenticatePhoneUser({ phone, code, isSignUp = false, name = '' }) {
  const users = getAllUsers();
  const rawPhone = (phone || '').replace(/\D/g, '');

  if (rawPhone.length < 10) {
    return { success: false, message: 'Número de telefone inválido.' };
  }

  // Check code format (must be 6 digits)
  if (!code || code.replace(/\D/g, '').length !== 6) {
    return { success: false, message: 'Por favor, digite o código de 6 dígitos recebido por SMS.' };
  }

  let user = users.find(u => u.phone && u.phone.replace(/\D/g, '') === rawPhone);

  if (!user) {
    if (!isSignUp && users.length > 0) {
      // If not registered yet, we create the profile automatically
    }
    user = {
      id: 'ph_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
      name: name.trim() || `Usuário (${phone.slice(0, 5)})`,
      email: `${rawPhone}@nortech.app`,
      password: '',
      phone: phone,
      avatar: `https://api.dicebear.com/7.x/identicon/svg?seed=${encodeURIComponent(rawPhone)}`,
      provider: 'phone',
      createdAt: new Date().toISOString()
    };
    users.push(user);
    saveUsers(users);
  }

  const { password: _, ...safeUser } = user;
  return {
    success: true,
    user: safeUser,
    message: `Autenticado com sucesso pelo celular!`
  };
}
