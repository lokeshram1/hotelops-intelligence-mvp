export type Month = { month: string; laborCost: number; laborBudget: number; occupancy: number; revenue: number; overtimeHours: number; overtimeCost: number; departments: Record<string, number> };
export const hotel = { id: 'grandview', name: 'Grandview Hotel', location: 'Austin, TX', rooms: 312 };
export const departments = ['Housekeeping', 'Front Office', 'Food and Beverage', 'Maintenance'];
export const demoData: Month[] = [
  {month:'May 2024',laborCost:151200,laborBudget:153000,occupancy:76,revenue:612000,overtimeHours:410,overtimeCost:11200,departments:{Housekeeping:57800,'Front Office':29800,'Food and Beverage':46300,Maintenance:17300}},
  {month:'Jun 2024',laborCost:154800,laborBudget:155000,occupancy:78,revenue:633000,overtimeHours:428,overtimeCost:11900,departments:{Housekeeping:59200,'Front Office':30100,'Food and Beverage':47200,Maintenance:18300}},
  {month:'Jul 2024',laborCost:160500,laborBudget:157000,occupancy:80,revenue:671000,overtimeHours:455,overtimeCost:12800,departments:{Housekeeping:62100,'Front Office':31200,'Food and Beverage':48000,Maintenance:19200}},
  {month:'Aug 2024',laborCost:164200,laborBudget:160000,occupancy:81,revenue:688000,overtimeHours:470,overtimeCost:13400,departments:{Housekeeping:64300,'Front Office':31800,'Food and Beverage':48600,Maintenance:19500}},
  {month:'Sep 2024',laborCost:167800,laborBudget:162000,occupancy:82,revenue:705000,overtimeHours:505,overtimeCost:14500,departments:{Housekeeping:67000,'Front Office':32400,'Food and Beverage':48500,Maintenance:19900}},
  {month:'Oct 2024',laborCost:182400,laborBudget:165000,occupancy:87,revenue:748000,overtimeHours:626,overtimeCost:18000,departments:{Housekeeping:77400,'Front Office':34200,'Food and Beverage':51800,Maintenance:19000}}
];
