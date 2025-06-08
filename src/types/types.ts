// Usuario que viene desde Firebase
export interface FirebaseDecodedToken {
  uid: string;
  email: string;
  name?: string;
  picture?: string;
  firebase: {
    sign_in_provider: string;
  };
}

// Datos mínimos que se guardan en DB para un usuario
export interface UserData {
  uid: string;
  email: string;
  name?: string;
  photoUrl?: string;
  provider: string;
}

// Petición de login con token
export interface AuthRequestBody {
  idToken: string;
}

// Transacción (cuando se guarda)
export interface TransactionData {
  userId: string;
  amount: number;
  type: 'deposit' | 'purchase' | 'withdraw'; // puedes expandir
}

// Checkout (creación)
export interface CheckoutRequest {
  userId: string;
  amount: number;
}
