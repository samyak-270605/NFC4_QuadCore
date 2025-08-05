import { useMutation, useQueryClient } from '@tanstack/react-query'
import { logout } from '../lib/api';

const useLogout = () => {
  const QueryClient = useQueryClient();

  const { mutate: logoutMutation,
    isPending,
    error,
   } = useMutation ({
    mutationFn: logout,
    onSuccess: () => QueryClient.invalidateQueries({queryKey: ["authUser"]}),
  });

  return { logoutMutation, isPending, error};
}

export default useLogout
