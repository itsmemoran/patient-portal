import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const f = e.target;

    const fullName = f.fullName?.value.trim() || "";
    const email = f.email?.value.trim() || "";
    const contact = f.contact?.value.trim() || "";
    const dob = f.dob?.value || "";
    const password = f.password?.value || "";
    const confirm = f.confirm?.value || "";
    const agreed = f.agree?.checked;

    // --- Validation ---
    if (!fullName) { setError("Veuillez saisir votre nom complet."); return; }
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) { setError("Veuillez saisir une adresse email valide."); return; }
    if (!contact || !/^[\d\s()+-]{7,20}$/.test(contact)) { setError("Veuillez saisir un numéro de téléphone valide."); return; }
    if (!dob || isNaN(new Date(dob).getTime()) || new Date(dob) > new Date()) {
      setError("Veuillez saisir une date de naissance valide.");
      return;
    }
    if (password.length < 8) { setError("Le mot de passe doit contenir au moins 8 caractères."); return; }
    if (password !== confirm) { setError("Le mot de passe et la confirmation ne correspondent pas."); return; }
    if (!agreed) { setError("Vous devez accepter les conditions générales et la politique de confidentialité."); return; }

    // Split fullName into firstName / lastName
    const [firstName, ...rest] = fullName.split(" ");
    const lastName = rest.join(" ");

    setLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phone: contact,
          dateOfBirth: dob,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Erreur lors de l'inscription.");
        return;
      }

      // Store token and redirect
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      window.location.href = "/dashboard";
    } catch (err) {
      setError("Erreur réseau. Veuillez réessayer.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center p-4 bg-cyan-400">
      <Card className="max-w-md mx-auto my-12">

        <div className="flex items-center justify-center p-4">
          <a href="#" className="flex items-center gap-2 font-medium">
            <img src="/shared/logo-danan-500x500.png" alt="logo centre medical danan" className="w-8 h-auto" />
            Centre Medical Danan
          </a>
        </div>

        <CardHeader>
          <CardTitle>Créer un compte</CardTitle>
          <CardDescription>
            Inscrivez-vous pour accéder au portail patient. En créant un compte, vous acceptez nos conditions générales et notre politique de confidentialité.
          </CardDescription>
        </CardHeader>

        <CardContent>
          {error && (
            <div className="mb-4 rounded-md bg-red-50 border border-red-200 px-4 py-2 text-sm text-red-600">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium">Nom complet</label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                placeholder="Jane Doe"
                required
                className="mt-1 block w-full rounded-md border px-3 py-2"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                required
                className="mt-1 block w-full rounded-md border px-3 py-2"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="contact" className="block text-sm font-medium">Contact (numéro)</label>
                <input
                  id="contact"
                  name="contact"
                  type="tel"
                  placeholder="+225 01 23 45 67 89"
                  required
                  className="mt-1 block w-full rounded-md border px-3 py-2"
                />
              </div>
              <div>
                <label htmlFor="dob" className="block text-sm font-medium">Date de naissance</label>
                <input
                  id="dob"
                  name="dob"
                  type="date"
                  required
                  className="mt-1 block w-full rounded-md border px-3 py-2"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium">Mot de passe</label>
                <input
                  name="password"
                  type="password"
                  placeholder="minimum 8 caractères"
                  required
                  minLength={8}
                  className="mt-1 block w-full rounded-md border px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Confirmez le mot de passe</label>
                <input
                  name="confirm"
                  type="password"
                  placeholder="répétez le mot de passe"
                  required
                  className="mt-1 block w-full rounded-md border px-3 py-2"
                />
              </div>
            </div>

            <div className="flex items-start space-x-2">
              <input id="agree" name="agree" type="checkbox" required className="mt-1" />
              <label htmlFor="agree" className="text-sm">
                J'accepte les{" "}
                <a href="/terms" target="_blank" rel="noreferrer" className="underline">
                  Conditions d'utilisation
                </a>{" "}
                et{" "}
                <a href="/privacy" target="_blank" rel="noreferrer" className="underline">
                  la Politique de confidentialité
                </a>.
              </label>
            </div>

            <CardFooter className="pt-2 px-0">
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-md bg-blue-600 text-white px-4 py-2 hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? "Création en cours..." : "Créer un compte"}
              </button>
            </CardFooter>
          </form>

          <div className="mt-4 text-sm text-gray-600 text-center">
            Vous avez déjà un compte ?{" "}
            <a href="/login" className="text-indigo-600 hover:underline">Connectez-vous</a>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default Signup;
