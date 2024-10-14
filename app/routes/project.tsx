import { useState } from "react";
import { Form, useActionData, useNavigation } from "@remix-run/react";
import { json } from "@remix-run/node";
import type { ActionFunction } from "@remix-run/node";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const requirements = formData.get("requirements");

  // TODO: Implement AI processing logic here
  // For now, we'll just echo back the requirements
  const aiResponse = `AI Response: You provided the following requirements: ${requirements}`;

  return json({ aiResponse });
};

function Dashboard({ currentStep }: { currentStep: number }) {
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

export default function Project() {
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const [step, setStep] = useState(1);

  const isSubmitting = navigation.state === "submitting";

  const handleNextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  return (
    <div className="container mx-auto max-w-3xl p-4">
      <h1 className="mb-8 text-3xl font-bold text-gray-800 dark:text-gray-100">
        AI Statement of Work Generator
      </h1>

      <Dashboard currentStep={step} />

      {step === 1 && (
        <Form method="post" className="space-y-4">
          <div>
            <label htmlFor="requirements" className="mb-2 block text-gray-700 dark:text-gray-300">
              Describe your project requirements:
            </label>
            <textarea
              id="requirements"
              name="requirements"
              rows={5}
              className="w-full rounded border p-2 dark:bg-gray-800 dark:text-white"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:opacity-50 dark:bg-blue-600 dark:hover:bg-blue-700"
          >
            {isSubmitting ? "Processing..." : "Submit Requirements"}
          </button>
        </Form>
      )}

      {actionData?.aiResponse && step === 1 && (
        <div className="mt-8">
          <h2 className="mb-4 text-2xl font-bold text-gray-800 dark:text-gray-100">AI Response</h2>
          <p className="text-gray-600 dark:text-gray-300">{actionData.aiResponse}</p>
          <button
            onClick={handleNextStep}
            className="mt-4 rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700"
          >
            Next: Technical Design Decisions
          </button>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2 className="mb-4 text-2xl font-bold text-gray-800 dark:text-gray-100">Technical Design Decisions</h2>
          {/* TODO: Implement technical design decision interface */}
          <p className="text-gray-600 dark:text-gray-300">
            This section will guide you through technical design decisions based on your requirements.
          </p>
          <button
            onClick={handleNextStep}
            className="mt-4 rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700"
          >
            Next: Generate Statement of Work
          </button>
        </div>
      )}

      {step === 3 && (
        <div>
          <h2 className="mb-4 text-2xl font-bold text-gray-800 dark:text-gray-100">Statement of Work</h2>
          {/* TODO: Implement statement of work generation and display */}
          <p className="text-gray-600 dark:text-gray-300">
            This section will display the generated Statement of Work based on your requirements and technical decisions.
          </p>
        </div>
      )}
    </div>
  );
}