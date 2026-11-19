export interface ControllerExaminationsStaffProfile {
  id: string;
  name: string;
  designation: string;
  phone: string;
  email: string;
  photoUrl: string | null;
  placeholder?: boolean;
}

// Temporary records keep the profile layout visible until the staff database is connected.
export const controllerExaminationsStaffPlaceholders: ControllerExaminationsStaffProfile[] = Array.from(
  { length: 8 },
  (_, index) => ({
    id: `staff-placeholder-${index + 1}`,
    name: `Staff Member ${String(index + 1).padStart(2, '0')}`,
    designation: 'Position will load from the staff database',
    phone: 'Phone will load from the staff database',
    email: 'Email will load from the staff database',
    photoUrl: null,
    placeholder: true,
  }),
);

// Replace this data source with the database query when the staff database is connected.
export async function getControllerExaminationsStaff() {
  return controllerExaminationsStaffPlaceholders;
}
