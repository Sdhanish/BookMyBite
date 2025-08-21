import { Loader2 } from "lucide-react";

export default function Loader({ message = "Loading..." }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-gray-500">
      <Loader2 className="w-12 h-12 animate-spin mb-2 text-green-600" />
      <p className="text-lg">{message}</p>
    </div>
  );
}
