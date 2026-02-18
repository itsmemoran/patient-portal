import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const form = e.currentTarget;
    const email = form.email.value.trim();
    const password = form.password.value;

    if (!email || !password) {
      setError("Veuillez fournir votre email et mot de passe.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Identifiants invalides.");
        return;
      }

      // Store token
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Redirect to dashboard
      window.location.href = "/dashboard";
    } catch (err) {
      setError("Erreur réseau. Veuillez réessayer.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-cyan-400">
      <Card className="w-full max-w-md">

        <div className="flex items-center justify-center p-4">
          <a href="#" className="flex items-center gap-2 font-medium">
            <img src="/shared/logo-danan-500x500.png" alt="logo centre medical danan" className="w-8 h-auto" />
            Centre Medical Danan
          </a>
        </div>

        <CardHeader>
          <CardTitle>Se connecter</CardTitle>
          <CardDescription>Utilisez votre email et mot de passe ou continuez avec Google</CardDescription>
        </CardHeader>

        <CardContent>
          {error && (
            <div className="mb-4 rounded-md bg-red-50 border border-red-200 px-4 py-2 text-sm text-red-600">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-500">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="mt-1 block w-full rounded-sm border shadow-sm focus:ring-2 focus:ring-indigo-500 px-3 py-2"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-500">
                Mot de passe
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="mt-1 block w-full rounded-sm border shadow-sm focus:ring-2 focus:ring-indigo-500 px-3 py-2"
                placeholder="••••••••"
              />
            </div>

            <div className="flex items-center justify-between">
              <a href="/forgot-password" className="text-sm text-indigo-600 hover:underline">
                Mot de passe oublié ?
              </a>
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50"
              >
                {loading ? "Connexion..." : "Se connecter"}
              </button>
            </div>
          </form>

          <div className="my-4 flex items-center">
            <span className="flex-1 h-px bg-gray-200" />
            <span className="mx-3 text-sm text-gray-500">ou</span>
            <span className="flex-1 h-px bg-gray-200" />
          </div>

          <button
            onClick={() => { window.location.href = "/api/auth/google"; }}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 border rounded-md hover:bg-gray-100"
          >
            <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden>
              <path fill="#EA4335" d="M24 9.5c3.9 0 7.1 1.3 9.4 3.1l7-7C37.2 2 30.2 0 24 0 14.9 0 6.9 4.6 2.8 11.4l8.8 6.8C13.8 13 18.4 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.6H24v9.1h12.7c-.5 2.8-2.1 5.1-4.4 6.6l6.9 5.2C44.6 37.7 46.5 31.5 46.5 24.5z"/>
              <path fill="#FBBC05" d="M10.6 28.2a14.5 14.5 0 010-8.4L2 13.1A24 24 0 000 24c0 3.9.9 7.6 2.5 11l8.1-6.8z"/>
              <path fill="#34A853" d="M24 48c6.2 0 11.4-2 15.2-5.4l-7.4-5.6C30.9 37.7 27.7 38.9 24 38.9 18.4 38.9 13.8 35.4 11.6 30.8l-8.8 6.8C6.9 43.4 14.9 48 24 48z"/>
            </svg>
            Continuer avec Google
          </button>
        </CardContent>

        <CardFooter>
          <div className="text-sm text-gray-600 w-full text-center">
            Vous n'avez pas de compte ?{" "}
            <a href="/signup" className="text-indigo-600 hover:underline">Inscrivez-vous</a>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
