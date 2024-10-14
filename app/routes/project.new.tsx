import { useState } from "react";
import { Form, useActionData, useNavigation, Link } from "@remix-run/react";
import { json, redirect } from "@remix-run/node";
import type { ActionFunction } from "@remix-run/node";
import ProjectProgress from "~/components/ProjectProgress";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const requirements = formData.get("requirements");

  // TODO: Implement AI processing logic here
  // For now, we'll just echo back the requirements
  const aiResponse = `AI Response: You provided the following requirements: ${requirements}`;

  // In a real application, you would save the new project to the database here
  // For now, we'll just redirect to the project list
  return redirect("/");
};

export default function NewProject() {
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const [step, setStep] = useState(1);

  const isSubmitting = navigation.state === "submitting";

  const handleNextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handlePreviousStep = () => {
    setStep((prevStep) => Math.max(1, prevStep - 1));
  };

  return (
    <div className="container mx-auto max-w-3xl p-4">
      <div className="mb-4">
        <Link
          to="/"
          className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
        >
          &larr; Back to Dashboard
        </Link>
      </div>
      <h1 className="mb-8 text-3xl font-bold text-gray-800 dark:text-gray-100">
        Create New Project
      </h1>

      <ProjectProgress currentStep={step} />

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
          <div className="mt-4 flex justify-between">
            <button
              onClick={handlePreviousStep}
              className="rounded bg-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-400 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
            >
              Back
            </button>
            <button
              onClick={handleNextStep}
              className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700"
            >
              Next: Generate Statement of Work
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          <h2 className="mb-4 text-2xl font-bold text-gray-800 dark:text-gray-100">Statement of Work</h2>
          {/* TODO: Implement statement of work generation and display */}
          <p className="text-gray-600 dark:text-gray-300">
            This section will display the generated Statement of Work based on your requirements and technical decisions.
          </p>
          <div className="mt-4 flex justify-between">
            <button
              onClick={handlePreviousStep}
              className="rounded bg-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-400 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
            >
              Back
            </button>
            <Link
              to="/"
              className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
            >
              Finish
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}