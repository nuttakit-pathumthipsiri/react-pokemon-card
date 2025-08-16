import React from "react";
import { PokeballIcon } from "./icons/PokeballIcon";

interface LoadingOverlayProps {
  isLoading: boolean;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  isLoading,
}) => {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 z-50 flex items-center justify-center">
      <div className="text-center">
        <div className="mb-4">
          <div className="flex justify-center items-center">
            <PokeballIcon className="animate-spin" />
          </div>
        </div>

        <h3 className="text-white text-xl font-semibold mb-2">Loading...</h3>

        <p className="text-gray-300 text-sm">
          Please wait while we fetch your data...
        </p>
      </div>
    </div>
  );
};
