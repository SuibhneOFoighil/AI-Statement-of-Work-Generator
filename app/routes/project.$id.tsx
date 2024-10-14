import { useParams, Link, useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import type { LoaderFunction } from "@remix-run/node";
import ProjectDetails from "~/components/ProjectDetails";

// Mock data for a single project
const projectData = {
  id: 1,
  name: "E-commerce Platform",
  status: "In Progress",
  requirements: "Build a scalable e-commerce platform with user authentication, product catalog, and payment integration.",
  technicalDecisions: [
    { id: 1, decision: "Use React for the frontend" },
    { id: 2, decision: "Implement Node.js backend with Express" },
    { id: 3, decision: "Utilize MongoDB for the database" },
  ],
  statementOfWork: "This project involves developing a full-stack e-commerce platform...",
};

export const loader: LoaderFunction = async ({ params }) => {
  // In a real application, you would fetch the project data based on the ID
  // For now, we'll just return the mock data
  return json({ project: projectData });
};

export default function ProjectPage() {
  const { id } = useParams();
  const { project } = useLoaderData<typeof loader>();
  
  return (
    <div className="container mx-auto max-w-4xl p-4">
      <div className="mb-4">
        <Link
          to="/"
          className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
        >
          &larr; Back to Dashboard
        </Link>
      </div>
      <h1 className="mb-8 text-3xl font-bold text-gray-800 dark:text-gray-100">
        Project Details: {project.name}
      </h1>
      <ProjectDetails projectId={id} />
    </div>
  );
}