import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import { GalleryVerticalEnd } from "lucide-react";

const Signup = () => {
return (
    <section className="min-h-screen flex items-center justify-center p-4 bg-cyan-400">
      <Card className="max-w-md mx-auto my-12">
      <div className="flex items-center justify-center p-4">
          <a href="#" className="flex items-center gap-2 font-medium">
            <img src="./shared/logo-danan-500x500.png" alt="logo centre medical danan" className="w-6 h-6" />
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
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const f = e.target;
                const fullName = f.fullName?.value.trim() || "";
                const email = f.email?.value.trim() || "";
                const contact = f.contact?.value.trim() || "";
                const dob = f.dob?.value || "";
                const password = f.password?.value || "";
                const confirm = f.confirm?.value || "";
                const agreed = f.agree?.checked;

                if (!fullName) {
                    alert("Veuillez saisir votre nom complet.");
                    return;
                }
                if (!email) {
                    alert("Veuillez saisir votre adresse email.");
                    return;
                }
                // basic email check
                if (!/^\S+@\S+\.\S+$/.test(email)) {
                    alert("Veuillez saisir une adresse email valide.");
                    return;
                }

                if (!contact) {
                    alert("Veuillez saisir un numéro de téléphone de contact.");
                    return;
                }
                // basic phone check (digits, spaces, parentheses, +, -)
                if (!/^[\d\s()+-]{7,20}$/.test(contact)) {
                    alert("Veuillez saisir un numéro de téléphone valide.");
                    return;
                }
                  
                if (!dob) {
                    alert("Veuillez saisir votre date de naissance.");
                    return;
                }
                const dobDate = new Date(dob);
                if (isNaN(dobDate.getTime())) {
                    alert("Veuillez saisir une date de naissance valide.");
                    return;
                }
                if (dobDate > new Date()) {
                    alert("la date de naissance ne peut pas être dans le futur.");
                    return;
                }

                if (password.length < 8) {
                    alert("le mot de passe doit contenir au moins 8 caractères.");
                    return;
                }
                if (password !== confirm) {
                    alert("le mot de passe et la confirmation ne correspondent pas.");
                    return;
                }
                if (!agreed) {
                    alert("Vous devez accepter les conditions générales et la politique de confidentialité.");
                    return;
                }

                // Replace this with real signup call
                console.log({
                    fullName,
                    email,
                    contact,
                    dob,
                    // Do not log passwords in production
                });
                alert("Compte créé avec succès pour " + fullName + " (" + email + ")");
                f.reset();
              }}
              className="space-y-4"
            >
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
                      placeholder="minimum 8 characters"
                      required
                      className="mt-1 block w-full rounded-md border px-3 py-2"
                      minLength={8}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Confirmez le mot de passe</label>
                    <input
                      name="confirm"
                      type="password"
                      placeholder="repetez le mot de passe"
                      required
                      className="mt-1 block w-full rounded-md border px-3 py-2"
                    />
                </div>
              </div>

              <div className="flex items-start space-x-2">
                <input id="agree" name="agree" type="checkbox" required />
                <label htmlFor="agree" className="text-sm">
                    J'accepte les{" "}
                    <a href="/terms" target="_blank" rel="noreferrer" className="underline">
                      Conditions d'utilisation
                    </a>{" "}
                    et{" "}
                    <a href="/privacy" target="_blank" rel="noreferrer" className="underline">
                      la Politique de confidentialité
                    </a>
                    .
                </label>
              </div>
              
              <CardFooter className="pt-2">
                <button
                    type="submit"
                    className="w-full rounded-md bg-blue-600 text-white px-4 py-2 hover:bg-blue-700"
                >
                    Creez un compte
                </button>
              </CardFooter>
            </form>
        </CardContent>
      </Card>
    </section>
    );
}

export default Signup;
