import React, { createContext, useContext, useState } from 'react';

interface GroupContextProps {
  selectedGroup: any;
  setGlobalGroup: (newGroup: any) => void;
}

const GroupContext = createContext<GroupContextProps | undefined>(undefined);

export const GroupProvider: React.FC = ({ children }) => {
  const [selectedGroup, setSelectedGroup] = useState<any>({});

  const setGlobalGroup = (newGroup: any) => {
    setSelectedGroup(newGroup);
  };

  return (
    <GroupContext.Provider value={{ selectedGroup, setGlobalGroup }}>
      {children}
    </GroupContext.Provider>
  );
};

export const useGroupContext = () => {
  const context = useContext(GroupContext);

  if (!context) {
    throw new Error('useGroupContext must be used within a GroupProvider');
  }

  return context;
};
