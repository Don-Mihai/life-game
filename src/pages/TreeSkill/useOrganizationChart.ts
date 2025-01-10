import { useEffect, useState } from 'react';

export const useOrganizationChart = <T>(levelsTree: T) => {
  const [data, setData] = useState<T[]>([{} as T]);

  useEffect(() => {
    setData([levelsTree]);
  }, [levelsTree]);

  const onDragStart = (event: React.DragEvent, node: any) => {
    event.dataTransfer.setData('node', JSON.stringify(node));
  };

  const onDrop = (event: React.DragEvent, targetNode: any, callback: (draggedNode: any, targetNode: any) => void) => {
    const draggedNode = JSON.parse(event.dataTransfer.getData('node'));

    if (draggedNode && draggedNode.data.id !== targetNode.data.id) {
      const updatedTree = moveNode(data, draggedNode, targetNode);

      console.log(updatedTree);
      setData(updatedTree);

      callback?.(draggedNode, targetNode);
    }
  };

  const removeNode = (nodes: any[], draggedNode: any): any[] => {
    return nodes
      .map((node) => {
        if (node.data.id === draggedNode.data.id) {
          return null; // Удаляем узел, если он совпадает с draggedNode
        }

        // Если у узла есть дети, создаем новый объект и обновляем детей рекурсивно
        if (node?.children?.length) {
          return {
            ...node, // Создаем копию узла
            children: removeNode([...node.children], draggedNode) // Рекурсивно обновляем детей
          };
        }

        return { ...node }; // Возвращаем копию узла, если детей нет
      })
      .filter((node) => node !== null); // Фильтруем удаленные узлы
  };

  const addNode = (nodes: any[], draggedNode: any, targetNode: any): any[] => {
    return nodes.map((node) => {
      if (node.data.id === targetNode.data.id) {
        if (!node?.children?.length) {
          node.children = [];
        }
        node?.children.push(draggedNode);
      } else if (node?.children?.length) {
        node.children = addNode(node.children, draggedNode, targetNode);
      }
      return node;
    });
  };

  const moveNode = (nodes: any[], draggedNode: any, targetNode: any): any[] => {
    const filteredNodes = removeNode(nodes, draggedNode);
    const updatedTree = addNode(filteredNodes, draggedNode, targetNode);
    return updatedTree;
  };

  return {
    setData,
    data,
    onDragStart,
    onDrop
  };
};
