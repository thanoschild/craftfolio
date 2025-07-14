type Props = {
  message: string;
  onRetry?: () => void;
};

export default function ErrorMessage({ message, onRetry }: Props) {
  return (
    <div className="text-center">
      <div className="text-red-500 text-lg mb-4">{message}</div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-6 py-3 bg-light-text dark:bg-dark-text text-light-bg dark:text-dark-bg rounded-lg hover:bg-light-text-sub dark:hover:bg-dark-text-sub transition-colors"
        >
          Try Again
        </button>
      )}
    </div>
  );
}