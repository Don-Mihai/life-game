import { useEffect, useState } from 'react';
type ExtendedT<T> = T & { data: any, children: ExtendedT<T>[] };

export const useOrganizationChart = <T>(levelsTree: T) => {
  const [data, setData] = useState<T[]>([{} as T]);

  useEffect(() => {
    setData([levelsTree]);
  }, [levelsTree]);

  const onDragStart = (event: React.DragEvent, node: T) => {
    event.dataTransfer.setData('node', JSON.stringify(node));
  };

  const onDrop = (event: React.DragEvent, targetNode: any, callback: (draggedNode: ExtendedT<T>, targetNode: ExtendedT<T>) => void) => {
    const draggedNode = JSON.parse(event.dataTransfer.getData('node'));

    if (draggedNode && draggedNode.data.id !== targetNode.data.id) {
      const updatedTree = moveNode(data as ExtendedT<T>[], draggedNode, targetNode);

      setData(updatedTree);

      callback?.(draggedNode, targetNode);
    }
  };

  const removeNode = (nodes: ExtendedT<T>[], draggedNode: ExtendedT<T>): any[] => {
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

  const addNode = (nodes: ExtendedT<T>[], draggedNode: ExtendedT<T>, targetNode: ExtendedT<T>): ExtendedT<T>[] => {
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

  const moveNode = (nodes: ExtendedT<T>[], draggedNode: ExtendedT<T>, targetNode: ExtendedT<T>): ExtendedT<T>[] => {
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
