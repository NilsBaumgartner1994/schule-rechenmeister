import React from 'react';
import {MyDrawer, useRenderMyDrawerScreen} from "@/components/drawer/MyDrawer";
import {MyDrawerCustomItemProps} from "@/components/drawer/MyDrawerCustomItemCenter";

export const unstable_settings = {
    // Ensure that reloading on `/modal` keeps a back button present.
    initialRouteName: 'index'
};

export default function TabLayout() {

    const customDrawerItems: MyDrawerCustomItemProps[] = []
    
  return (
      <MyDrawer
          customDrawerItems={customDrawerItems}
      >
          {useRenderMyDrawerScreen({
              routeName: 'home/index',
              label: "Startseite",
              title: "Startseite",
              icon: 'home',
              visibleInDrawer: true
          })}
            {useRenderMyDrawerScreen({
                routeName: 'games/index',
                label: "Spiele",
                title: "Spiele",
                icon: 'gamepad',
                visibleInDrawer: false,
                showBackButton: true
            })}
          {useRenderMyDrawerScreen({
              routeName: 'gamemode/index',
              label: "Spielmodus",
              title: "Spielmodus",
              icon: 'gamepad',
              visibleInDrawer: true,
              showBackButton: true
          })}
          {useRenderMyDrawerScreen({
              routeName: 'games/additionAndSubtraction/index',
              label: "Addition und Subtraktion",
              title: "Addition und Subtraktion",
              icon: 'gamepad',
              visibleInDrawer: false,
              showBackButton: true
          })}
          {useRenderMyDrawerScreen({
              routeName: 'games/additionAndSubtraction/gameWithInput/index',
              label: "Spiel",
              title: "Spiel",
              icon: 'gamepad',
              visibleInDrawer: false,
              showBackButton: false
          })}
          {useRenderMyDrawerScreen({
              routeName: 'games/little1x1/index',
              label: "Das kleine 1x1",
              title: "Das kleine 1x1",
              icon: 'gamepad',
              visibleInDrawer: false,
              showBackButton: true
          })}
          {useRenderMyDrawerScreen({
              routeName: 'games/little1x1/gameWithInput/index',
              label: "Spiel",
              title: "Spiel",
              icon: 'gamepad',
              visibleInDrawer: false,
              showBackButton: false
          })}
          {useRenderMyDrawerScreen({
              routeName: 'playerStats/index',
              label: "Spielerstatistik",
              title: "Spielerstatistik",
              icon: 'gamepad',
              visibleInDrawer: false,
              showBackButton: true
          })}

      </MyDrawer>
  );
}
