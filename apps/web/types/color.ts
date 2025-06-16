type ColorItem = {
  background: string;
  text: string;
  status: string;
};

export type ColorConfigType = {
  vehicleStatus: Record<string, ColorItem>;
  callStatus: Record<string, ColorItem>;
  vehicleModelStatus: Record<string, ColorItem>;
  iconVehicleStatus: Record<string, ColorItem>;
};
