import { ArrowLeft } from "lucide-react";

export default function BackButton({ navigate }) {
  return (
    <button
      onClick={() => navigate(-1)}
      className="flex items-center gap-2 text-gray-700 hover:text-gray-900 mb-4"
    >
      <ArrowLeft className="h-4 w-4" /> Back to Cart
    </button>
  );
}
