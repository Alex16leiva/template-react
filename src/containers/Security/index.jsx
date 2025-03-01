import { useState } from "react";
import { NavControl } from "../../components/Controls/NavControl/NavControl";
import { MainContentControl } from "../../components/Controls";
import { Transaction } from "./Transaction";
import { Rol } from "./Rol";
import { UserScreen } from "./UserScreen";

const userView = 'userView';
const rolView = 'rolView';
const adminView = 'adminView';
export const Security = () => {

  const [currentView, setCurrentView] = useState(rolView);

  const items = [
    {
      name: rolView,
      nameShow: 'Rol',
      iconName: 'Rol'
    },
    {
      name: userView,
      nameShow: 'User',
      iconName: 'User'
    },
    {
      name: adminView,
      nameShow: 'Transactions',
      iconName: 'Grid'
    }
  ]

  const handleOnTabChange = (item) => {
    setCurrentView(item.name)
  }

  return (
    <>
      <NavControl
        items={items}
        onTabChange={handleOnTabChange}
        activeItem={currentView}
      />

      <MainContentControl withNav className=''>
        {!currentView && <Rol />}
        {currentView === rolView && (<Rol />)}
        {currentView === userView && (<UserScreen />)}
        {currentView === adminView && (<Transaction />)}
      </MainContentControl>
    </>
  )
};



