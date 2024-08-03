import { useAuthDispatch, useAuthState, getSession } from 'context/auth';
import { useEffect } from 'react';
import useStore, { State } from 'store/lists';
import useSettingsStore, { State as SettingsState } from 'store/settings';

export default function Session() {
  const authDispatch = useAuthDispatch();
  const { isLoggedIn, user } = useAuthState();
  const getLists = useStore((state: State) => state.all);
  const getSettings = useSettingsStore((state: SettingsState) => state.all);

  useEffect(() => {
    if(isLoggedIn) {
      getLists(user.username);
      getSettings(user.username);
      return
    }

    getSession(authDispatch)
  }, [isLoggedIn, authDispatch])

  return <></>

}
