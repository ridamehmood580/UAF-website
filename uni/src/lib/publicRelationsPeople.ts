export interface PublicRelationsPerson {
  id: string;
  name: string;
  designation: string;
  phone: string;
  email: string;
  photoUrl: string | null;
  placeholder?: boolean;
}

// Replace this data source with the staff database query when it is connected.
export const publicRelationsPeoplePlaceholders: PublicRelationsPerson[] = Array.from(
  { length: 8 },
  (_, index) => ({
    id: `pr-person-placeholder-${index + 1}`,
    name: `Staff Member ${String(index + 1).padStart(2, '0')}`,
    designation: 'Position will load from the staff database',
    phone: 'Phone will load from the staff database',
    email: 'Email will load from the staff database',
    photoUrl: null,
    placeholder: true,
  }),
);

export async function getPublicRelationsPeople() {
  return publicRelationsPeoplePlaceholders;
}
