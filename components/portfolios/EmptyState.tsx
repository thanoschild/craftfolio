import { FiUser, FiFolder, FiSearch } from 'react-icons/fi';

type Props = {
  icon: 'user' | 'folder' | 'search';
  title: string;
  description: string;
};

export default function EmptyState({ icon, title, description }: Props) {
  const icons = {
    user: FiUser,
    folder: FiFolder,
    search: FiSearch
  };

  const IconComponent = icons[icon];

  return (
    <div className="text-center py-16">
      <IconComponent className="w-16 h-16 text-light-text-sub dark:text-dark-text-sub mx-auto mb-4" />
      <h3 className="text-xl font-semibold text-light-text dark:text-dark-text mb-2">
        {title}
      </h3>
      <p className="text-light-text-sub dark:text-dark-text-sub">
        {description}
      </p>
    </div>
  );
}