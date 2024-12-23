import type { Project } from '@fleekxyz/sdk/dist-types/generated/graphqlClient/schema';
import Link from '@components/Link';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { AvatarMarble } from '@components/AvatarMarble/AvatarMarble';
import { FaCheck } from 'react-icons/fa6';
import { RxCaretSort } from 'react-icons/rx';

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
  return (
    <div onClick={onClick}>
      <div>
        {project.avatar ? (
          <img title={project.id} src={project.avatar} />
        ) : (
          <AvatarMarble name={project.id} />
        )}{' '}
        {project.name}
      </div>
      {project.id === selectedProject?.id && (
        <DropdownMenu.ItemIndicator>
          <FaCheck />
        </DropdownMenu.ItemIndicator>
      )}
    </div>
  );
};

export type ProjectDropdownProps = {
  selectedProject?: Project;
  projects: Project[];
  onProjectChange: (project: Project) => void;
};

export const ProjectDropdown: React.FC<ProjectDropdownProps> = ({
  projects = [
    {
      id: 'cm0xo2m100000j7khi77txej3',
      name: 'Open Whiteboard',
      avatar: null,
    },
    {
      id: 'cm2d9pqvv0002yl61r5jljadh',
      name: 'Testing Projects',
      avatar: null,
    },
    {
      id: 'cm0mm7v4d000077texyvhembu',
      name: 'Whiteboard',
      avatar: null,
    },
  ] as Project[],
  selectedProject,
  onProjectChange,
}) => {
  // eslint-disable-next-line fleek-custom/valid-argument-types
  const handleProjectChange = (project: Project): void => {
    onProjectChange(project);
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <div>
          <Link
            href={'dafuuq?!'}
            className="gap-2.5 flex items-center text-neutral-12"
          >
            {selectedProject?.avatar ? (
              <img title={selectedProject?.id} src={selectedProject?.avatar} />
            ) : (
              <AvatarMarble name={selectedProject?.id} />
            )}
            {selectedProject?.name}
          </Link>

          <RxCaretSort />
        </div>
      </DropdownMenu.Trigger>

      {/* <RenameBadge selectedProject={selectedProject} /> */}

      <DropdownMenu.Content align="center">
        <DropdownMenu.Label>Projects</DropdownMenu.Label>
        <div>
          <div>
            <div>
              {projects.map((project) => (
                <MenuItem
                  key={project.id}
                  project={project}
                  selectedProject={selectedProject}
                  onClick={() => handleProjectChange(project)}
                />
              ))}
            </div>
          </div>
        </div>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};
