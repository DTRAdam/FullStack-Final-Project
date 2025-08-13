import Swal, { SweetAlertResult } from "sweetalert2";

export function successMsg(msg: string,) {
    Swal.fire({
        title: "Great !",
        icon: "success",
        text: msg,
    });
}
export function errorMsg(msg: string) {
    Swal.fire({
        icon: "error",
        title: "Oops...",
        text: msg,
    });
}

export function deleteAndEditUserMsg(msg: string, confirmText: string): Promise<SweetAlertResult<any>> {
    return Swal.fire({
        title: "Are you sure?",
        text: msg,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: confirmText
    });
}
