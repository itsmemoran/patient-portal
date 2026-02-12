const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

// Fonction pour obtenir le token
const getAuthToken = () => {
  return localStorage.getItem('token');
};

// Fonction pour gérer les erreurs
const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Une erreur est survenue');
  }
  return response.json();
};

// Configuration des headers
const getHeaders = (includeAuth = true) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  if (includeAuth) {
    const token = getAuthToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }

  return headers;
};

const api = {
  // ========== AUTH ==========
  auth: {
    login: async (email, password) => {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: getHeaders(false),
        body: JSON.stringify({ email, password }),
      });
      const data = await handleResponse(response);
      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
      }
      return data;
    },

    signup: async (userData) => {
      const response = await fetch(`${API_URL}/auth/signup`, {
        method: 'POST',
        headers: getHeaders(false),
        body: JSON.stringify(userData),
      });
      const data = await handleResponse(response);
      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
      }
      return data;
    },

    logout: () => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },

    getProfile: async () => {
      const response = await fetch(`${API_URL}/auth/profile`, {
        headers: getHeaders(),
      });
      return handleResponse(response);
    },
  },

  // ========== DASHBOARD ==========
  dashboard: {
    getData: async () => {
      const response = await fetch(`${API_URL}/dashboard`, {
        headers: getHeaders(),
      });
      return handleResponse(response);
    },
  },

  // ========== APPOINTMENTS ==========
  appointments: {
    getAll: async () => {
      const response = await fetch(`${API_URL}/appointments`, {
        headers: getHeaders(),
      });
      return handleResponse(response);
    },

    getUpcoming: async () => {
      const response = await fetch(`${API_URL}/appointments/upcoming`, {
        headers: getHeaders(),
      });
      return handleResponse(response);
    },

    getPast: async () => {
      const response = await fetch(`${API_URL}/appointments/past`, {
        headers: getHeaders(),
      });
      return handleResponse(response);
    },

    create: async (appointmentData) => {
      const response = await fetch(`${API_URL}/appointments`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(appointmentData),
      });
      return handleResponse(response);
    },

    update: async (id, updateData) => {
      const response = await fetch(`${API_URL}/appointments/${id}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(updateData),
      });
      return handleResponse(response);
    },

    cancel: async (id) => {
      const response = await fetch(`${API_URL}/appointments/${id}`, {
        method: 'DELETE',
        headers: getHeaders(),
      });
      return handleResponse(response);
    },

    getTimeSlots: async () => {
      const response = await fetch(`${API_URL}/appointments/slots`, {
        headers: getHeaders(),
      });
      return handleResponse(response);
    },

    getDoctors: async () => {
      const response = await fetch(`${API_URL}/appointments/doctors`, {
        headers: getHeaders(),
      });
      return handleResponse(response);
    },
  },

  // ========== MEDICAL RECORDS ==========
  medicalRecords: {
    getAll: async () => {
      const response = await fetch(`${API_URL}/medical-records`, {
        headers: getHeaders(),
      });
      return handleResponse(response);
    },

    getById: async (id) => {
      const response = await fetch(`${API_URL}/medical-records/${id}`, {
        headers: getHeaders(),
      });
      return handleResponse(response);
    },

    getPersonalInfo: async () => {
      const response = await fetch(`${API_URL}/medical-records/personal/info`, {
        headers: getHeaders(),
      });
      return handleResponse(response);
    },

    getDocuments: async () => {
      const response = await fetch(`${API_URL}/medical-records/documents/all`, {
        headers: getHeaders(),
      });
      return handleResponse(response);
    },

    getVaccinations: async () => {
      const response = await fetch(`${API_URL}/medical-records/vaccinations/all`, {
        headers: getHeaders(),
      });
      return handleResponse(response);
    },
  },

  // ========== TEST RESULTS ==========
  testResults: {
    getAll: async () => {
      const response = await fetch(`${API_URL}/test-results`, {
        headers: getHeaders(),
      });
      return handleResponse(response);
    },

    getById: async (id) => {
      const response = await fetch(`${API_URL}/test-results/${id}`, {
        headers: getHeaders(),
      });
      return handleResponse(response);
    },

    getChartData: async () => {
      const response = await fetch(`${API_URL}/test-results/chart/data`, {
        headers: getHeaders(),
      });
      return handleResponse(response);
    },
  },

  // ========== PRESCRIPTIONS ==========
  prescriptions: {
    getAll: async () => {
      const response = await fetch(`${API_URL}/prescriptions`, {
        headers: getHeaders(),
      });
      return handleResponse(response);
    },

    getActive: async () => {
      const response = await fetch(`${API_URL}/prescriptions/active`, {
        headers: getHeaders(),
      });
      return handleResponse(response);
    },

    getExpired: async () => {
      const response = await fetch(`${API_URL}/prescriptions/expired`, {
        headers: getHeaders(),
      });
      return handleResponse(response);
    },

    requestRenewal: async (id) => {
      const response = await fetch(`${API_URL}/prescriptions/${id}/renew`, {
        method: 'POST',
        headers: getHeaders(),
      });
      return handleResponse(response);
    },
  },

  // ========== PAYMENTS ==========
  payments: {
    getAll: async () => {
      const response = await fetch(`${API_URL}/payments`, {
        headers: getHeaders(),
      });
      return handleResponse(response);
    },

    getPending: async () => {
      const response = await fetch(`${API_URL}/payments/pending`, {
        headers: getHeaders(),
      });
      return handleResponse(response);
    },

    getMethods: async () => {
      const response = await fetch(`${API_URL}/payments/methods`, {
        headers: getHeaders(),
      });
      return handleResponse(response);
    },

    addMethod: async (methodData) => {
      const response = await fetch(`${API_URL}/payments/methods`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(methodData),
      });
      return handleResponse(response);
    },

    pay: async (paymentId, paymentMethodId) => {
      const response = await fetch(`${API_URL}/payments/${paymentId}/pay`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ paymentMethodId }),
      });
      return handleResponse(response);
    },

    getSubscriptions: async () => {
      const response = await fetch(`${API_URL}/payments/subscriptions`, {
        headers: getHeaders(),
      });
      return handleResponse(response);
    },

    getTotalPending: async () => {
      const response = await fetch(`${API_URL}/payments/total-pending`, {
        headers: getHeaders(),
      });
      return handleResponse(response);
    },
  },

  // ========== MESSAGES ==========
  messages: {
    getAll: async () => {
      const response = await fetch(`${API_URL}/messages`, {
        headers: getHeaders(),
      });
      return handleResponse(response);
    },

    getById: async (id) => {
      const response = await fetch(`${API_URL}/messages/${id}`, {
        headers: getHeaders(),
      });
      return handleResponse(response);
    },

    send: async (messageData) => {
      const response = await fetch(`${API_URL}/messages`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(messageData),
      });
      return handleResponse(response);
    },

    markAsRead: async (id) => {
      const response = await fetch(`${API_URL}/messages/${id}/read`, {
        method: 'PATCH',
        headers: getHeaders(),
      });
      return handleResponse(response);
    },
  },

  // ========== CONTACT ==========
  contact: {
    getClinicInfo: async () => {
      const response = await fetch(`${API_URL}/contact/clinic-info`, {
        headers: getHeaders(false),
      });
      return handleResponse(response);
    },

    getDoctors: async () => {
      const response = await fetch(`${API_URL}/contact/doctors`, {
        headers: getHeaders(false),
      });
      return handleResponse(response);
    },

    getEmergencyInfo: async () => {
      const response = await fetch(`${API_URL}/contact/emergency-info`, {
        headers: getHeaders(false),
      });
      return handleResponse(response);
    },
  },

  // ========== AI CHAT ==========
  aiChat: {
    getChat: async () => {
      const response = await fetch(`${API_URL}/ai-chat`, {
        headers: getHeaders(),
      });
      return handleResponse(response);
    },

    sendMessage: async (message) => {
      const response = await fetch(`${API_URL}/ai-chat/message`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ message }),
      });
      return handleResponse(response);
    },

    resetChat: async () => {
      const response = await fetch(`${API_URL}/ai-chat/reset`, {
        method: 'DELETE',
        headers: getHeaders(),
      });
      return handleResponse(response);
    },
  },

  // ========== NOTIFICATIONS ==========
  notifications: {
    getAll: async () => {
      const response = await fetch(`${API_URL}/notifications`, {
        headers: getHeaders(),
      });
      return handleResponse(response);
    },

    getUnread: async () => {
      const response = await fetch(`${API_URL}/notifications/unread`, {
        headers: getHeaders(),
      });
      return handleResponse(response);
    },

    markAsRead: async (id) => {
      const response = await fetch(`${API_URL}/notifications/${id}/read`, {
        method: 'PATCH',
        headers: getHeaders(),
      });
      return handleResponse(response);
    },

    markAllAsRead: async () => {
      const response = await fetch(`${API_URL}/notifications/read-all`, {
        method: 'PATCH',
        headers: getHeaders(),
      });
      return handleResponse(response);
    },

    delete: async (id) => {
      const response = await fetch(`${API_URL}/notifications/${id}`, {
        method: 'DELETE',
        headers: getHeaders(),
      });
      return handleResponse(response);
    },
  },
};

export default api;