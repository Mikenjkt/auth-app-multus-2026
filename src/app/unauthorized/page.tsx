export default function UnauthorizedPage() {
  return (
    <main className="flex min-h-screen items-center justify-center p-8 page-unauthorized">
      <div className="max-w-md rounded border border-red-200 bg-red-50 p-8 text-center">
        <h1 className="mb-4 text-3xl font-bold text-red-700">Unauthorized</h1>
        <p className="mb-6 text-base text-red-800">
          You do not have permission to access this page.
        </p>
        <a
          href="/login"
          className="rounded bg-red-700 px-4 py-2 text-sm font-semibold text-white hover:bg-red-800"
        >
          Return to login
        </a>
      </div>
    </main>
  );
}
