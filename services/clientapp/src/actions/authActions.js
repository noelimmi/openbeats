import {
  store
} from "../store";
import {
  toastActions,
  playerActions
} from ".";
import {
  push
} from "connected-react-router";
import {
  variables
} from "../config";

export function loginHandler(email, password) {
  setAuthLoader(true);
  fetch(`${variables.baseUrl}/auth/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        password
      })
    })
    .then(async res => {
      let data = await res.json();
      if (res.status !== 400) {
        let userDetails = {
          name: data.name,
          email: data.email,
          id: data.id,
          token: data.token,
          avatar: data.avatar
        };
        localStorage.setItem("userDetails", JSON.stringify(userDetails));
        store.dispatch({
          type: "LOGIN_USER",
          payload: {
            userDetails,
            isAuthenticated: true
          }
        });
        setAuthLoader(false);
        store.dispatch(push("/"));
      } else {
        let err = data.error;
        toastActions.showMessage(err.toString());
        setAuthLoader(false);
      }
    })
    .catch(err => {
      toastActions.showMessage(
        "Internal server error!\n please try again later or\n  email to support@openbeats.live"
      );
    });
}

export function registerHandler(name, email, password) {
  setAuthLoader(true);
  fetch(`${variables.baseUrl}/auth/register`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({
        email,
        password,
        name
      })
    })
    .then(async res => {
      let data = await res.json();
      if (res.status !== 400) {
        let userDetails = {
          name: data.name,
          email: data.email,
          id: data.id,
          token: data.token,
          avatar: data.avatar
        };
        localStorage.setItem("userDetails", JSON.stringify(userDetails));
        store.dispatch({
          type: "LOGIN_USER",
          payload: {
            userDetails,
            isAuthenticated: true
          }
        });
        setAuthLoader(false);
        store.dispatch(push("/"));
      } else {
        let err = data.error;
        toastActions.showMessage(err.toString());
        setAuthLoader(false);
      }
    })
    .catch(err => {
      toastActions.showMessage(
        "Internal server error!\n please try again later or\n  email to support@openbeats.live"
      );
    });
}

function setAuthLoader(val) {
  store.dispatch({
    type: "LOADING_STATE_TOGGLER",
    payload: {
      isAuthLoading: val
    }
  });
}

export async function logoutHandler() {
  localStorage.removeItem("userDetails");
  await playerActions.resetPlayer();
  await store.dispatch({
    type: "LOGOUT_USER",
    payload: {
      isAuthenticated: false
    }
  });
  await store.dispatch({
    type: "RESET_CORE",
    payload: {
      reset: true
    }
  })
  await store.dispatch({
    type: "RESET_NOW_PLAYING",
    payload: {
      reset: true
    }
  })
  await store.dispatch({
    type: "RESET_PLAYER",
    payload: {
      reset: true
    }
  })
  await store.dispatch({
    type: "RESET_PLAYLIST_MANIPULATOR",
    payload: {
      reset: true
    }
  })
  await store.dispatch({
    type: "RESET_SEARCH",
    payload: {
      reset: true
    }
  })
  await store.dispatch(push("/"))
}