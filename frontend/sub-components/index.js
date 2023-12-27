/**
 * The folder sub-components contains sub component of all the pages,
 * so here you will find folder names which are listed in root pages.
 */

// sub components for /pages/dashboard
import ActiveProjects from "sub-components/dashboard/ActiveProjects";
import TasksPerformance from "sub-components/dashboard/TasksPerformance";
import Teams from "sub-components/dashboard/Teams";

// sub components for /pages/profile
import ActivityFeed from "sub-components/profile/ActivityFeed";
import ProfileHeader from "sub-components/profile/ProfileHeader";
import ProjectsContributions from "sub-components/profile/ProjectsContributions";
import RecentFromBlog from "sub-components/profile/RecentFromBlog";

// sub components for /pages/billing
import CurrentPlan from "sub-components/billing/CurrentPlan";
import BillingAddress from "sub-components/billing/BillingAddress";

export {
  ActiveProjects,
  TasksPerformance,
  Teams,
  ActivityFeed,
  ProfileHeader,
  ProjectsContributions,
  RecentFromBlog,
  CurrentPlan,
  BillingAddress,
};