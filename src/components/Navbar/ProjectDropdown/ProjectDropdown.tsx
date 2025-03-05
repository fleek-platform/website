import type { Project } from '@fleekxyz/sdk/dist-types/generated/graphqlClient/schema';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { AvatarMarble } from '@components/AvatarMarble/AvatarMarble';
import { FaCheck, FaSpinner } from 'react-icons/fa6';
import { RxCaretSort } from 'react-icons/rx';
import { cn } from '@utils/cn';
import { useMemo, useState } from 'react';

type MenuItemProps = {
  project: Project;
  selectedProjectId?: string;
  onClick: () => void;
};

const MenuItem: React.FC<MenuItemProps> = ({
  project,
  selectedProjectId,
  onClick,
}) => {
  const isSelected = project.id === selectedProjectId;

  return (
    <div
      onClick={onClick}
      className={cn(
        'flex w-full flex-row gap-8 rounded-8 py-6 pl-6 pr-8',
        isSelected && 'bg-neutral-6',
        !isSelected && 'cursor-pointer hover:text-neutral-12',
      )}
    >
      <div className="flex w-full flex-row gap-8">
        {project.avatar ? (
          <img
            title={project.id}
            src={project.avatar}
            className="h-[26px] w-[26px] rounded-[50%]"
          />
        ) : (
          <AvatarMarble name={project.id} />
        )}
        <span
          className="max-w-[150px] truncate leading-[26px]"
          title={project.name}
        >
          {project.name}
        </span>

        <div className="ml-auto mr-0 w-18 self-center">
          {isSelected && <FaCheck className="mx-5" />}
        </div>
      </div>
    </div>
  );
};

export type ProjectDropdownProps = {
  selectedProjectId?: string;
  projects: Project[];
  isLoadingProject: boolean;
  onProjectChange: (projectId: string) => void;
};

export const ProjectDropdown: React.FC<ProjectDropdownProps> = ({
  projects,
  selectedProjectId,
  isLoadingProject,
  onProjectChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedProject = useMemo(
    () =>
      projects.find((project) => project.id === selectedProjectId) ?? undefined,
    [projects, selectedProjectId],
  );

  const handleProjectChange = (projectId: string): void => {
    onProjectChange(projectId);
    setIsOpen(false);
  };

  return (
    <DropdownMenu.Root open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenu.Trigger
        disabled={isLoadingProject}
        className={cn(
          'flex h-[34px] w-fit flex-row justify-center gap-8 rounded-8 bg-neutral-1 p-4',
          'font-medium text-neutral-12 hover:bg-neutral-2 focus-visible:outline-none',
          'disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-neutral-1',
        )}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {selectedProject?.avatar ? (
          <img
            title={selectedProject?.id}
            src={selectedProject?.avatar}
            className="h-[26px] w-[26px] rounded-[50%]"
          />
        ) : (
          <AvatarMarble name={selectedProject?.id} />
        )}
        <span
          className="max-w-[150px] truncate leading-[26px]"
          title="selectedProject?.name"
        >
          {selectedProject?.name}
        </span>

        {isLoadingProject ? (
          <FaSpinner className="animate-spin self-center" />
        ) : (
          <RxCaretSort className="self-center text-[14px]" />
        )}
      </DropdownMenu.Trigger>

      <DropdownMenu.Content
        align="center"
        className="flex w-full flex-col gap-5 rounded-8 border-1 border-neutral-4 bg-black px-[12px] py-[8px] pb-[10px]"
      >
        <DropdownMenu.Label className="text-[12px]">
          Projects
        </DropdownMenu.Label>

        {projects.map((project) => (
          <MenuItem
            key={project.id}
            project={project}
            selectedProjectId={selectedProjectId}
            onClick={() => handleProjectChange(project.id)}
          />
        ))}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};
