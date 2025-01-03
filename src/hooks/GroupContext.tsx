import React, { createContext, useContext, useState } from 'react';

interface GroupContextProps {
  selectedGroup: any;
  setGlobalGroup: (newGroup: any) => void;
  selectedPlan: any;
  setSelectedPlan: (newGroup: any) => void;
  fetchData: any;
  setfetchData: (newGroup: any) => void;
  fetchGroup: any;
  setfetchGroup: (newGroup: any) => void
  filtros: any;
  setfiltros: (newGroup: any) => void;
}

const GroupContext = createContext<GroupContextProps | undefined>(undefined);

export const GroupProvider: React.FC = ({ children }:any) => {
  const [selectedGroup, setSelectedGroup] = useState<any>({});
  const [selectedPlan, setSelectedPlan] = useState<any>({});
  const [fetchData, setfetch] = useState<any>(false);
  const [fetchGroup, setfetchGroup] = useState<any>(false);
  const [filtros, setfiltros] = useState<any>({materia: '', profesor: '', salon: ''});

  const setGlobalGroup = (newGroup: any) => {
    setSelectedGroup(newGroup);
  };

  const setfetchData = (newGroup: any) => {
    setfetch(newGroup);
  };

  return (
    <GroupContext.Provider value={{ selectedPlan, setSelectedPlan, selectedGroup, setGlobalGroup, fetchData, setfetchData, filtros, setfiltros, fetchGroup, setfetchGroup }}>
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
