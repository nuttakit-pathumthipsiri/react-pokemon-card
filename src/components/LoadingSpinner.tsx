import React from "react";

interface LoadingSpinnerProps {
  size?: "small" | "medium" | "large";
  text?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "medium",
  text = "Loading...",
}) => {
  const sizeClasses = {
    small: "w-6 h-6",
    medium: "w-12 h-12",
    large: "w-16 h-16",
  };

  return (
    <div className="bg-card rounded-xl p-12 text-center border border-accent/10">
      <div className="flex flex-col items-center justify-center">
        <div className="relative">
          <div
            className={`${sizeClasses[size]} animate-spin rounded-full border-4 border-accent/20 border-t-accent`}
          ></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-2xl">🎴</div>
          </div>
        </div>
        {text && (
          <div className="mt-6">
            <p className="text-primary font-semibold text-lg font-poppins">{text}</p>
            <p className="text-secondary text-sm mt-1 font-poppins">Please wait while we fetch your cards...</p>
          </div>
        )}
      </div>
    </div>
  );
};
