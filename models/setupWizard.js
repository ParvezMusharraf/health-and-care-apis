import {
  mock_Menus,
  // mock_Roles,
  mock_Menus_Access,
  mock_Roles,
  mock_status,
} from "../constants/staticData.js";
import { UserAccessFunctions } from "./UserAccess.js";
import { MenusFunctions } from "./Menu.js";
import roleModel from "./Roles.js";
import StatusModel from './Status.js'

export const InitialSetupWizard = () => {
  return new Promise(async (resolve, reject) => {
    try {
      // all status
      await Promise.all(
        mock_status.map(async (menus) => {
          let existingMenus = await StatusModel.findOne({
            name: menus,
          });
          if (!existingMenus) {
            const doc = new StatusModel({ name: menus });
            const saved_document = await doc.save();
            console.log(`${menus} Created`);
          } else {
            console.log(`${menus} exist`);
          }
        })
      );

      // all Roles
      await Promise.all(
        mock_Roles.map(async (menus) => {
          let existingMenus = await roleModel.findOne({
            roleName: menus,
          });
          if (!existingMenus) {
            const doc = new roleModel({ roleName: menus });
            const saved_document = await doc.save();
            console.log(`${menus} Created`);
          } else {
            console.log(`${menus} exist`);
          }
        })
      );

      // all Menus
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

      // all access
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
