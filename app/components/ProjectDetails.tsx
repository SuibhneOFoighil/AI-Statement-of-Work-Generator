import { useLoaderData } from "@remix-run/react";

export default function ProjectDetails({ projectId }: { projectId: string }) {
  const { project } = useLoaderData();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">{project.name}</h2>
        <p className="text-gray-600 dark:text-gray-400">Status: {project.status}</p>
      </div>
      <div>
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Requirements</h3>
        <p className="text-gray-600 dark:text-gray-400">{project.requirements}</p>
      </div>
      <div>
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Technical Decisions</h3>
        <ul className="list-inside list-disc text-gray-600 dark:text-gray-400">
          {project.technicalDecisions.map((decision) => (
            <li key={decision.id}>{decision.decision}</li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Statement of Work</h3>
        <p className="text-gray-600 dark:text-gray-400">{project.statementOfWork}</p>
      </div>
    </div>
  );
}