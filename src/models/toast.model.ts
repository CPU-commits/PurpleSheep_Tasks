import type { ToastType } from "./toastType.model"

export interface Toast {
    message: string
    type: keyof typeof ToastType
    dismissible?: boolean
    timeout?: number
}

export type ToastWritable = {
    id: number
    type: string
    dismissible: boolean
    timeout: number
    message: string
}
