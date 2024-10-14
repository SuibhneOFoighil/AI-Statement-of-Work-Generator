import { useRouteError } from "@remix-run/react";

export default function ErrorBoundary() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="rounded-lg bg-white p-8 shadow-lg dark:bg-gray-800">
        <h1 className="mb-4 text-2xl font-bold text-red-600 dark:text-red-400">Oops! Something went wrong</h1>
        <p className="text-gray-600 dark:text-gray-300">
          We're sorry, but an unexpected error occurred. Please try refreshing the page or come back later.
        </p>
      </div>
    </div>
  );
}