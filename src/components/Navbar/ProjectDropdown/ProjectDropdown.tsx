import type { Project } from '@fleekxyz/sdk/dist-types/generated/graphqlClient/schema';
import Link from '@components/Link';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { AvatarMarble } from '@components/AvatarMarble/AvatarMarble';
import { FaCheck } from 'react-icons/fa6';
import { RxCaretSort } from 'react-icons/rx';
import { cn } from '@utils/cn';
import { useState } from 'react';

type MenuItemProps = {
  project: Project;
  selectedProject?: Project;
  onClick: () => void;
};

const MenuItem: React.FC<MenuItemProps> = ({
  project,
  selectedProject,
  onClick,
}) => {
  const isSelected = project.id === selectedProject?.id;
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
  selectedProject?: Project;
  projects: Project[];
  onProjectChange: (project: Project | string) => void;
};

export const ProjectDropdown: React.FC<ProjectDropdownProps> = ({
  projects,
  selectedProject,
  onProjectChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleProjectChange = (project: Project | string): void => {
    setIsOpen(false);
    onProjectChange(typeof project === 'string' ? project : project.id);
  };

  return (
    <DropdownMenu.Root open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenu.Trigger
        onClick={() => setIsOpen((prev) => !prev)} // Toggle the dropdown
        className="flex h-[34px] w-fit flex-row justify-center gap-8 rounded-8 bg-neutral-1 p-4 font-medium text-neutral-12 hover:bg-neutral-2 focus-visible:outline-none"
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

        <RxCaretSort className="self-center text-[14px]" />
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
            selectedProject={selectedProject}
            onClick={() => handleProjectChange(project)}
          />
        ))}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};
