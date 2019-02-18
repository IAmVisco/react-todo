import { toast } from 'react-toastify'

function showTextErrorToast(err) {
  toast.error(err, {
    position: toast.POSITION.BOTTOM_RIGHT,
    autoClose: 5000
  })
}

const gql = {
  GQL_ENDPOINT: 'http://localhost:4000/graphql',
  GET_CARDS: `query ($userId: String!) {
    getCards(userId: $userId) {
      _id
      name
      description
      status
      color
      createdAt
    }
  }`,
  POST_CARD: `mutation ($userId: String!, $name: String!, $description: String, $status: String!, $color: String!, $createdAt: String, $dueTo: String) {
    createCard(input: {userId: $userId, name: $name, description: $description, status: $status, color: $color, createdAt: $createdAt, dueTo: $dueTo}) {
      _id
      name
      description
      status
      color
      createdAt
      dueTo
    }
  }
  `,
  UPDATE_CARD: `mutation ($id: String!, $newStatus: String!) {
    updateCard(id: $id, newStatus: $newStatus)
  }
  `,
  DELETE_CARD: `mutation ($id: String!, $userId: String!) {
    removeCard(id: $id, userId: $userId)
  }`
}

export {
  showTextErrorToast,
  gql
}
