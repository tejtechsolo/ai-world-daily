import { auth } from "../../auth";
import { redirect } from "next/navigation";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-brand">AI & World Daily</div>
        <nav>
          <a href="/admin">Dashboard</a>
          <a href="/admin/articles">Articles</a>
          <a href="/admin/sources">Sources</a>
          <a href="/admin/categories">Categories</a>
          <a href="/admin/reviews">Reviews</a>
          <a href="/admin/automation">Automation</a>
        </nav>
      </aside>
      <main className="admin-content">{children}</main>
    </div>
  );
}
