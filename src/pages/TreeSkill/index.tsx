import React, { useState, useEffect } from 'react';
import { OrganizationChart, OrganizationChartNodeData } from 'primereact/organizationchart';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { addLevel, getTreeLevelsById, updateNodePosition } from '../../redux/Level';
import { useOrganizationChart } from './useOrganizationChart';

const DragDropOrganizationChart = () => {
  const { skillId } = useParams<{ skillId: string }>();
  const levelsTree = useSelector((state: RootState) => state.level.levelsTree);
  const { setData, data, onDragStart, onDrop } = useOrganizationChart<OrganizationChartNodeData>(levelsTree);

  const [nodeCounter, setNodeCounter] = useState(1); // Счетчик для новых узлов
  const dispatch = useDispatch<AppDispatch>();

  const getTreeLevels = async (skillId: string) => {
    await dispatch(getTreeLevelsById(skillId));
  };

  useEffect(() => {
    getTreeLevels(skillId || '');
  }, [skillId]);

  const addNewLevel = async () => {
    const newLevel: any = {
      name: `Уровень ${nodeCounter}`,
      skillId,
      parentId: data[0]?.data?.id || null
    };

    const updatedData = [{ ...data[0], children: [...data[0].children, { data: newLevel }] }];
    setData(updatedData);
    setNodeCounter((prev) => prev + 1); // Увеличиваем счетчик

    dispatch(addLevel(newLevel));
  };

  const handleUpdateNodePosition = (draggedNode: any, targetNode: any) => {
    dispatch(
      updateNodePosition({
        levelId: draggedNode.data.id,
        newParentId: targetNode.data.id,
        oldParentId: draggedNode.data.parentId
      })
    );
  };

  const renderNode = (node: any) => {
    return (
      <div
        draggable
        onDragStart={(e) => onDragStart(e, node)}
        onDrop={(e) => onDrop(e, node, handleUpdateNodePosition)}
        onDragOver={(e) => e.preventDefault()}
        style={{
          padding: '5px',
          border: '1px solid #ccc',
          borderRadius: '4px',
          cursor: 'move'
        }}
      >
        {node?.data?.name || 'Новый уровень'}
      </div>
    );
  };

  return (
    <div>
      <button onClick={addNewLevel} style={{ marginBottom: '10px' }}>
        Создать уровень
      </button>
      <OrganizationChart value={data} nodeTemplate={renderNode} />
    </div>
  );
};

export default DragDropOrganizationChart;
