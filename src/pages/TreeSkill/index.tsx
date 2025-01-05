import React, { useState, useEffect } from 'react';
import { OrganizationChart, OrganizationChartNodeData } from 'primereact/organizationchart';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const DragDropOrganizationChart = () => {
  const { skillId } = useParams<{ skillId: string }>();
  const skills = useSelector((state: RootState) => state.skill.skills);
  const [data, setData] = useState<OrganizationChartNodeData[]>([{}]);

  useEffect(() => {
    // Находим нужный навык по skillId
    const skill = skills.find((skill) => skill.id === skillId);

    if (skill && skill.levels) {
      // Преобразуем уровни в структуру для OrganizationChart
      const transformedData = transformLevelsToTree(skill.levels);
      setData(transformedData);
    }
  }, [skillId, skills]);

  const transformLevelsToTree = (levels: any[]): any[] => {
    // Создаем карту уровней для удобства
    const levelsMap = levels.reduce(
      (acc, level) => {
        acc[level.id] = { ...level, children: [] };
        return acc;
      },
      {} as Record<string, any>
    );

    const rootNodes: any[] = [];

    levels.forEach((level) => {
      if (level.parentId) {
        levelsMap[level.parentId].children.push(levelsMap[level.id]);
      } else {
        rootNodes.push(levelsMap[level.id]);
      }
    });

    return rootNodes;
  };

  const onDragStart = (event: React.DragEvent, node: any) => {
    event.dataTransfer.setData('node', JSON.stringify(node));
  };

  const onDrop = (event: React.DragEvent, targetNode: any) => {
    const draggedNode = JSON.parse(event.dataTransfer.getData('node'));

    if (draggedNode && draggedNode.id !== targetNode.id) {
      const updatedTree = moveNode(data, draggedNode, targetNode);
      setData(updatedTree);
    }
  };

  const moveNode = (nodes: any[], draggedNode: any, targetNode: any): any[] => {
    const filteredNodes = removeNode(nodes, draggedNode);
    const updatedTree = addNode(filteredNodes, draggedNode, targetNode);
    return updatedTree;
  };

  const removeNode = (nodes: any[], draggedNode: any): any[] => {
    return nodes
      .map((node) => {
        if (node.id === draggedNode.id) {
          return null;
        }
        if (node.children) {
          node.children = removeNode(node.children, draggedNode);
        }
        return node;
      })
      .filter((node) => node !== null);
  };

  const addNode = (nodes: any[], draggedNode: any, targetNode: any): any[] => {
    return nodes.map((node) => {
      if (node.id === targetNode.id) {
        if (!node.children) {
          node.children = [];
        }
        node.children.push(draggedNode);
      } else if (node.children) {
        node.children = addNode(node.children, draggedNode, targetNode);
      }
      return node;
    });
  };

  const renderNode = (node: any) => {
    return (
      <div
        draggable
        onDragStart={(e) => onDragStart(e, node)}
        onDrop={(e) => onDrop(e, node)}
        onDragOver={(e) => e.preventDefault()}
        style={{
          padding: '5px',
          border: '1px solid #ccc',
          borderRadius: '4px',
          cursor: 'move'
        }}
      >
        {node.name}
      </div>
    );
  };

  return <OrganizationChart value={data} nodeTemplate={renderNode} />;
};

export default DragDropOrganizationChart;
