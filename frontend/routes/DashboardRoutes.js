import { v4 as uuid } from "uuid";
/**
 *  All Dashboard Routes
 *
 *  Understanding name/value pairs for Dashboard routes
 *
 *  Applicable for main/root/level 1 routes
 *  icon 		: String - It's only for main menu or you can consider 1st level menu item to specify icon name.
 *
 *  Applicable for main/root/level 1 and subitems routes
 * 	id 			: Number - You can use uuid() as value to generate unique ID using uuid library, you can also assign constant unique ID for react dynamic objects.
 *  title 		: String - If menu contains childern use title to provide main menu name.
 *  badge 		: String - (Optional - Default - '') If you specify badge value it will be displayed beside the menu title or menu item.
 * 	badgecolor 	: String - (Optional - Default - 'primary' ) - Used to specify badge background color.
 *
 *  Applicable for subitems / children items routes
 *  name 		: String - If it's menu item in which you are specifiying link, use name ( don't use title for that )
 *  children	: Array - Use to specify submenu items
 *
 *  Used to segrigate menu groups
 *  grouptitle : Boolean - (Optional - Default - false ) If you want to group menu items you can use grouptitle = true,
 *  ( Use title : value to specify group title  e.g. COMPONENTS , DOCUMENTATION that we did here. )
 *
 */
// const user = localStorage.getItem("user");
// function checkRole (user) {
//   let u = JSON.parse(user);
//   if (u.role == 5) {
//     return true;
//   }
// }

export const AdminDashboardMenu = [
];
/**
 * {
      label: 'Admin',
      value: 5
    },
    {
      label: 'Transaction Point Manager',
      value: 1
    },
    {
      label: 'Transaction Point Staff',
      value: 2
    },
    {
      label: 'Transit Point Manager',
      value: 3
    },
    {
      label: 'Transit Point Staff',
      value: 4
    }
 */
export const TransactionPointManagerDashboardMenu = [
];


export const TransactionPointStaffDashboardMenu = [
];

export const TransitPointManagerDashboardMenu = [
];

export const TransitPointStaffDashboardMenu = [
];

export const DashboardMenu = [
  {
    id: uuid(),
    title: "Dashboard",
    icon: "home",
    link: "/",
  },
 {
    id: uuid(),
    title: "create new User",
    icon : "user",
    link: "/pages/createuser",
  },
  {
    id: uuid(),
    title: "create new Order",
    icon : "shopping-cart",
    link: "/pages/createorder",
  },
  {
    id: uuid(),
    title : "list branch",
    icon : "home",
    link: "/pages/brands/listbranch",
  },
  {
    id:uuid(),
    title : "create branch",
    link : "/pages/brands/createbrands",
  },
  {
    id: uuid(),
    title: "LAYOUTS & PAGES",
    grouptitle: true,
  },
  {
    id: uuid(),
    title: "list import",
    link : "/pages/import",
  },
  {
    id: uuid(),
    title: "Pages",
    icon: "layers",
    children: [
      { id: uuid(), link: "/pages/profile", name: "Profile" },
      { id: uuid(), link: "/pages/billing", name: "Billing" },
      { id: uuid(), link: "/not-found", name: "404 Error" },
    ],
  },
  {
    id: uuid(),
    title: "Authentication",
    icon: "lock",
    children: [
      { id: uuid(), link: "/authentication/sign-in", name: "Sign In" },
      { id: uuid(), link: "/authentication/sign-up", name: "Sign Up" },
      {
        id: uuid(),
        link: "/authentication/forget-password",
        name: "Forget Password",
      },
    ],
  },
];

export default DashboardMenu;
