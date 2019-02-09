import {toast} from 'react-toastify'

function showErrorToast(err) {
  const res = err.response
  toast.error(`Error ${res.status} has occured! ${res.statusText}`, {
    position: toast.POSITION.BOTTOM_RIGHT,
    autoClose: 5000
  })
}

export {
  showErrorToast
}
