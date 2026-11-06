import {useCurrentUser} from "@app/api";

export function useAuth(){
  const {data: me} = useCurrentUser()
  const isAuthorized = me?.status === 200

  return {
    isAuthorized,
    user: isAuthorized ? me?.data : null
  }
}