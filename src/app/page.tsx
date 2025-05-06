import Feed from "@/components/Feed";
import Sidebar from "@/components/Sidebar";
import Widgets from "@/components/Widgets";

export default function Home() {
  return (
    <div className="lg:max-w-6xl mx-auto max-h-screen overflow-hidden">
      <main className="grid grid-cols-9">
        {/* Sidebar */}
        <Sidebar />

        {/* Feed */}
        <Feed />

        {/* Widget */}
        <Widgets />
      </main>
    </div>
  );
}
