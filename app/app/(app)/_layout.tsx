import React from 'react';
import {MyDrawer, useRenderMyDrawerScreen} from "@/components/drawer/MyDrawer";
import {MyDrawerCustomItemProps} from "@/components/drawer/MyDrawerCustomItemCenter";
import {getMyCustomHeaderNavigateHome} from "@/components/customHeader/MyCustomHeaderNavigateHome";

export const unstable_settings = {
    // Ensure that reloading on `/modal` keeps a back button present.
    initialRouteName: 'index'
};

export default function TabLayout() {

    const customDrawerItems: MyDrawerCustomItemProps[] = []

    customDrawerItems.push({
        label: "Nils Baumgartner",
        onPressExternalRouteTo: "https://nilsbaumgartner.de",
        visibleInDrawer: false,
        visibleInBottomDrawer: true
    })

    customDrawerItems.push({
        label: "Projektseite",
        onPressExternalRouteTo: "https://github.com/NilsBaumgartner1994/schule-rechenmeister",
        visibleInDrawer: false,
        visibleInBottomDrawer: true
    })
    
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
              routeName: 'gamemode/selectPlayers/index',
              label: "Spieleranzahl",
              title: "Spieleranzahl",
              icon: 'gamepad',
              visibleInDrawer: false,
              showBackButton: true
          })}
          {useRenderMyDrawerScreen({
              routeName: 'gamemode/editPlayers/index',
              label: "Spielernamen",
              title: "Spielernamen",
              icon: 'gamepad',
              visibleInDrawer: false,
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
              label: "",
              title: "",
              icon: 'gamepad',
              visibleInDrawer: false,
              showBackButton: false,
              getHeader: getMyCustomHeaderNavigateHome()
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
              label: "",
              title: "",
              icon: 'gamepad',
              visibleInDrawer: false,
              showBackButton: false,
              getHeader: getMyCustomHeaderNavigateHome()
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
