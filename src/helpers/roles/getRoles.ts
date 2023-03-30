import {RoleAttributes} from '../../interfaces/RolesAttributes';

let roles: RoleAttributes[] = []

const _getRoles =  async (): Promise<RoleAttributes[]> => {
  let response = await fetch(`https://Kyrsa4back.ev1lg0.repl.co/api/role`, {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
  });
  return response.json()
}

// @ts-ignore
export const getRoles = async (): Promise<RolesAttributes[]> => {
  if (roles.length > 0) return roles;
  roles = await _getRoles()
  return roles;
}