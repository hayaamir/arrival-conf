import { FieldError } from "react-hook-form";

export default function ErrorBar({ error }: { error?: FieldError }) {
  return (
    <>
      {error && (
        <div
          className="px-4 py-1 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
          role="alert"
        >
          <span className="font-medium">{error.message}</span>
        </div>
      )}
    </>
  );
}
