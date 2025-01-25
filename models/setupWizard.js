import {
  mock_Menus,
  // mock_Roles,
  mock_Menus_Access,
} from "../constants/staticData.js";
import { UserAccessFunctions } from "./UserAccess.js";
import { MenusFunctions } from "./Menu.js";
import  roleModel from "./Roles.js";

export const InitialSetupWizard = () => {
  return new Promise(async (resolve, reject) => {
    try {
      // all menus
      await Promise.all(
        mock_Menus.map(async (menus) => {
          let existingMenus = await MenusFunctions.FindMenu({
            description: menus,
          });
          if (!existingMenus) {
            await MenusFunctions.CreateMenu({ description: menus });
            console.log(`${menus} Created`);
          } else {
            console.log(`${menus} exist`);
          }
        })
      );
      await Promise.all(
        mock_Menus_Access.map(async (menusaccess) => {
          let menu = await MenusFunctions.FindMenu({
            description: menusaccess.menu,
          });
          let role = await roleModel.findOne({
            roleName: menusaccess.role,
          });

          let existingMenuAccess = await UserAccessFunctions.FindUserAccess({
            menuId: menu._id,
            roleID: role._id,
          });
          if (!existingMenuAccess) {
            await UserAccessFunctions.saveUserAccess({
              menuId: menu._id,
              roleID: role._id,
              create: true,
              read: true,
              update: true,
              remove: true,
            });
            console.log(`${menusaccess.menu} Created`);
          } else {
            console.log(`${menusaccess.menu} exist`);
          }
        })
      );
      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
};
