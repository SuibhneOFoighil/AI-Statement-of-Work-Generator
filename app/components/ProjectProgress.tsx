export default function ProjectProgress({ currentStep }: { currentStep: number }) {
  const steps = [
    "Project Requirements",
    "Technical Design Decisions",
    "Statement of Work",
  ];

  return (
    <div className="mb-8">
      <h2 className="mb-4 text-xl font-semibold text-gray-800 dark:text-gray-100">Project Progress</h2>
      <div className="flex justify-between">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center">
            <div
              className={`h-8 w-8 rounded-full ${
                index + 1 <= currentStep
                  ? "bg-blue-500 dark:bg-blue-600"
                  : "bg-gray-300 dark:bg-gray-700"
              } flex items-center justify-center text-white`}
            >
              {index + 1}
            </div>
            <span className="mt-2 text-sm text-gray-600 dark:text-gray-400">{step}</span>
          </div>
        ))}
      </div>
    </div>
  );
}