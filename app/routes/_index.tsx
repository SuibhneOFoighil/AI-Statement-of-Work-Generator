import { Link, useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import type { LoaderFunction } from "@remix-run/node";

// Mock data for projects
const projects = [
  { id: 1, name: "E-commerce Platform", status: "In Progress" },
  { id: 2, name: "Mobile App", status: "Completed" },
  { id: 3, name: "AI Chatbot", status: "Planning" },
];

export const loader: LoaderFunction = async () => {
  return json({ projects });
};

export default function Index() {
  const { projects } = useLoaderData<typeof loader>();

  return (
    <div className="container mx-auto max-w-4xl p-4">
      <h1 className="mb-8 text-4xl font-bold text-gray-800 dark:text-gray-100">
        Project Dashboard
      </h1>
      <div className="mb-8 flex justify-between">
        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300">Your Projects</h2>
        <Link
          to="/project/new"
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
        >
          New Project
        </Link>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <div key={project.id} className="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
            <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-100">{project.name}</h3>
            <p className="mb-4 text-gray-600 dark:text-gray-400">Status: {project.status}</p>
            <Link
              to={`/project/${project.id}`}
              className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}