import { RootState } from '../../redux/store/store';

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { OrganizationChart } from 'primereact/organizationchart';
import 'primereact/resources/themes/saga-blue/theme.css'; // Выберите тему по вашему вкусу
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

const TreeSkill = () => {
  const { skillId } = useParams();
  const skill: any = useSelector((state: RootState) => state.skill.skills.find((s: any) => s.id === skillId));
  const [data, setData] = useState(null);

  useEffect(() => {
    if (skill) {
      const levels = skill.levels.map((level: any, index: any) => ({
        expanded: true,
        type: 'level',
        className: 'bg-purple-500 text-white',
        style: { borderRadius: '12px' },
        data: {
          completed: level.completed,
          description: level.description,
          icon: level.icon
        },
        label: `Level ${index + 1}`,
        children: []
      }));

      const skillData: any = {
        expanded: true,
        type: 'skill',
        className: 'bg-indigo-500 text-white',
        style: { borderRadius: '12px' },
        data: {
          name: skill.name
        },
        children: levels
      };

      setData(skillData);
    }
  }, [skill]);

  const nodeTemplate = (node: any) => {
    if (node.type === 'skill') {
      return (
        <div className="flex flex-column align-items-center">
          <span className="font-bold mb-2">{node.data.name}</span>
        </div>
      );
    }

    if (node.type === 'level') {
      return (
        <div className="flex flex-column align-items-center">
          <span className="font-bold mb-2">{node.label}</span>
          <span>{node.data.description}</span>
        </div>
      );
    }

    return node.label;
  };

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="card overflow-x-auto">
      <OrganizationChart value={data} nodeTemplate={nodeTemplate} />
    </div>
  );
};

export default TreeSkill;
