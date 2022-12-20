export class UserDTO {
  provider!: string;
  providerId!: string;
  name?: string;
  given_name?: string;
  family_name?: string;
  email!: string;
  picture?: string;
  linkedin?: string;
}

export class EYDAP_APN_DTO {
  timestamp!: Date;
  total_suspended_solids!: number;
  biochemical_oxygen_demand!: number;
  total_nitrogen!: number;
  ammonium!: number;
  turbidity!: number;
  total_carbon!: number;
  electric_conductivity!: number;
}
