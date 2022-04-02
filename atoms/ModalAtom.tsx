import { atom } from 'recoil'

export const showCancelModal = atom({
  key: 'cancelModal',
  default: false,
})

export const showSubmitModal = atom({
  key: 'submitModal',
  default: false,
})
