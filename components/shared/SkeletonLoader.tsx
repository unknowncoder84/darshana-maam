interface SkeletonLoaderProps {
  type?: 'text' | 'card' | 'image' | 'circle';
  count?: number;
  className?: string;
}

export default function SkeletonLoader({ type = 'text', count = 1, className = '' }: SkeletonLoaderProps) {
  const skeletons = Array.from({ length: count }, (_, i) => i);

  const renderSkeleton = () => {
    switch (type) {
      case 'text':
        return <div className={`h-4 bg-gray-200 rounded animate-pulse ${className}`} />;
      case 'card':
        return (
          <div className={`bg-white rounded-lg shadow-lg p-6 ${className}`}>
            <div className="h-48 bg-gray-200 rounded mb-4 animate-pulse" />
            <div className="h-6 bg-gray-200 rounded mb-2 animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse" />
          </div>
        );
      case 'image':
        return <div className={`bg-gray-200 rounded animate-pulse ${className}`} />;
      case 'circle':
        return <div className={`bg-gray-200 rounded-full animate-pulse ${className}`} />;
      default:
        return <div className={`h-4 bg-gray-200 rounded animate-pulse ${className}`} />;
    }
  };

  return (
    <>
      {skeletons.map((i) => (
        <div key={i} className="mb-2">
          {renderSkeleton()}
        </div>
      ))}
    </>
  );
}
