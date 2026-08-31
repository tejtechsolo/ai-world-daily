import { signIn } from "../../../auth";

export default function LoginPage() {
  return (
    <main className="login-page">
      <div className="login-card">
        <span className="eyebrow">EDITORIAL CONTROL ROOM</span>
        <h1>AI & World Daily</h1>
        <p>Sign in with your authorized Google account to manage the publication.</p>
        <form action={async () => { "use server"; await signIn("google", { redirectTo: "/admin" }); }}>
          <button type="submit" className="primary-button">Continue with Google</button>
        </form>
      </div>
    </main>
  );
}
